# Eventos Workshop System

Este é um sistema de gerenciamento de eventos e workshops desenvolvido como projeto acadêmico.

## Estrutura do Projeto

```
.
├── backend/
│   ├── app/
│   │   ├── models/         # Modelos do SQLAlchemy
│   │   ├── routers/        # Rotas da API
│   │   ├── schemas/        # Schemas do Pydantic
│   │   ├── database.py     # Configuração do banco de dados
│   │   └── main.py        # Aplicação FastAPI
│   └── requirements.txt    # Dependências Python
└── frontend/              # (Em desenvolvimento)
```

## Configuração do Ambiente de Desenvolvimento

### Backend

1. Criar ambiente virtual Python:
```bash
python -m venv venv
```

2. Ativar ambiente virtual:
```bash
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. Instalar dependências:
```bash
cd backend
pip install -r requirements.txt
```

4. Configurar variáveis de ambiente:
Crie um arquivo `.env` na pasta backend com:
```
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_SERVER=localhost
POSTGRES_PORT=5432
POSTGRES_DB=eventos_db
```

5. Iniciar o servidor de desenvolvimento:
```bash
uvicorn app.main:app --reload
```

A API estará disponível em `http://localhost:8000`
Documentação Swagger UI: `http://localhost:8000/docs`
