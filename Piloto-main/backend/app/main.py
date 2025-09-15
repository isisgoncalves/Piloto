from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import events
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Eventos API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(events.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API de Eventos!"}