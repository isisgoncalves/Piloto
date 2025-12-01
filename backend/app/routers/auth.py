from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import get_db
from app.schemas.user import User, UserCreate, UserUpdate, Token
from app.models.user import User as UserModel
from app.auth import (
    authenticate_user,
    create_access_token,
    get_current_active_user,
)

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Define o tempo de expiração do token em minutos


def get_password_hash(password: str) -> str:
    """Gera o hash da senha usando bcrypt"""
    return pwd_context.hash(password)


@router.post("/register", response_model=User)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """Registrar novo usuário"""
    # Verificar se email já existe
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    # Criar novo usuário
    hashed_password = get_password_hash(user.password)
    db_user = UserModel(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@router.post("/login", response_model=Token)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login de usuário"""
    user = authenticate_user(db, form_data.username, form_data.password)  # Alterado para 'username'
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=User)
def read_users_me(current_user: UserModel = Depends(get_current_active_user)):
    """Obter dados do usuário atual"""
    return current_user


@router.put("/profile", response_model=User)
def update_user_profile(
    user_update: UserUpdate, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Atualizar perfil do usuário atual"""
    # Atualizar apenas o campo full_name
    current_user.full_name = user_update.full_name
    
    db.commit()
    db.refresh(current_user)
    
    return current_user


@router.delete("/user/{email}")
def delete_user_by_email(email: str, db: Session = Depends(get_db)):
    """Deletar usuário por email (apenas para desenvolvimento)"""
    user = db.query(UserModel).filter(UserModel.email == email).first()
    if user:
        db.delete(user)
        db.commit()
        return {"message": f"Usuário {email} removido com sucesso"}
    return {"message": "Usuário não encontrado"}