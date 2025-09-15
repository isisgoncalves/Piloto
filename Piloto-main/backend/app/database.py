from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import pyodbc

load_dotenv()

# Configurações do SQL Server
SERVER = os.getenv("SQL_SERVER", "localhost\\SQLEXPRESS")
DATABASE = os.getenv("SQL_DATABASE", "eventos_db")

# String de conexão para SQL Server usando Windows Authentication
SQLALCHEMY_DATABASE_URL = f"mssql+pyodbc://{SERVER}/{DATABASE}?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    fast_executemany=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()