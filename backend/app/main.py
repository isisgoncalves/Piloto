from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import events, auth
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Eventos API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas as origens temporariamente para teste
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(events.router, prefix="/api")
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])

@app.get("/")
def read_root():
    return {"message": "Sistema de Eventos - API v1.0.0", "docs": "/docs"}