# Sistema de Gerenciamento de Eventos e Workshops

Este é um sistema de gerenciamento de eventos e workshops desenvolvido como projeto acadêmico para a disciplina de Projeto de Software.

## Sobre o Projeto

O sistema está sendo desenvolvido com uma arquitetura em 3 camadas:
- Frontend (React + Vite)
- Backend (FastAPI)
- Banco de Dados (SQL Server)

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
└── frontend/              
    ├── src/
    │   ├── components/    # Componentes React
    │   ├── pages/        # Páginas da aplicação
    │   └── services/     # Serviços e integrações
    └── package.json      # Dependências JavaScript
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
```

3. Instalar dependências:
```bash
cd backend
pip install -r requirements.txt
```

4. Configurar variáveis de ambiente:
Crie um arquivo `.env` na pasta backend com:
```
SQL_SERVER=localhost\\SQLEXPRESS
SQL_DATABASE=eventos_db
```

5. Iniciar o servidor de desenvolvimento:
```bash
uvicorn app.main:app --reload
```

### Frontend

1. Instalar dependências:
```bash
cd frontend
npm install
```

2. Iniciar servidor de desenvolvimento:
```bash
npm run dev
```

## Endpoints da API

A API estará disponível em `http://localhost:8000`
Documentação Swagger UI: `http://localhost:8000/docs`

## Cronograma de Entregas

- [x] AC1 - 14/09/2025 (Concluído)
  - Implementação do CRUD básico de eventos
  - Estruturação inicial do projeto

- [ ] AC2 - 12/10/2025 (Em andamento)
  - Implementação de filtros de busca de eventos
  - Interface de pesquisa e filtros no frontend

- [ ] AC3 - 09/11/2025 (Planejado)
  - Sistema de autenticação de usuários
  - Configuração final do banco de dados

- [ ] Entrega Final - 30/11/2025 (Planejado)
  - Validações de formulários
  - Melhorias gerais e polimentos

## Links Importantes

- [Repositório no GitHub](https://github.com/isisgoncalves/Piloto)
- [Board do Projeto](https://github.com/users/isisgoncalves/projects/1/views/1)