# Sistema de Gerenciamento de Eventos e Workshops

![Linguagem](https://img.shields.io/badge/Backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React-61dafb)
![Database](https://img.shields.io/badge/Database-SQLite-003b57)

Este é um sistema de gerenciamento de eventos e workshops desenvolvido como projeto acadêmico para a disciplina de Projeto de Software.

## Sobre o Projeto

Este projeto implementa um sistema completo de gerenciamento de eventos e workshops, desenvolvido como trabalho acadêmico da disciplina de Projeto de Software. 

### Arquitetura em 3 Camadas:
- **Frontend**: React + Vite + Material-UI
- **Backend**: FastAPI + SQLAlchemy + Pydantic  
- **Banco de Dados**: SQLite (desenvolvimento) / SQL Server (produção)

### Funcionalidades Implementadas:
- ✅ CRUD completo de eventos
- ✅ Sistema de filtros e busca avançada
- ✅ API REST documentada automaticamente
- ✅ Validação de dados robusta
- 🔄 Interface de usuário (em desenvolvimento)
- 🔄 Sistema de autenticação (próxima entrega)

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

## API REST e Documentação

### Endpoints Disponíveis:
- `POST /api/events/` - Criar novo evento
- `GET /api/events/` - Listar eventos com filtros opcionais
- `GET /api/events/{id}` - Buscar evento específico por ID

### Filtros Implementados (AC2):
- **Título**: Busca parcial case-insensitive
- **Localização**: Busca parcial case-insensitive  
- **Período**: Filtro por data inicial e/ou final
- **Combinados**: Todos os filtros podem ser usados simultaneamente

### Acesso:
- **API Base**: `http://localhost:8000`
- **Documentação Interativa**: `http://localhost:8000/docs` (Swagger UI)
- **Documentação Alternativa**: `http://localhost:8000/redoc`

## Cronograma de Entregas

- [x] **AC1 - 14/09/2025** (Concluído)
  - Estrutura básica do projeto (Frontend/Backend/Database)
  - CRUD completo de eventos via API REST
  - Configuração do ambiente de desenvolvimento
  - Documentação inicial e repositório GitHub

- [x] **AC2 - 12/10/2025** (Concluído)
  - Sistema de filtros de busca de eventos
  - Filtros por título, localização e período de datas
  - API REST com documentação automática (Swagger UI)
  - Migração para banco SQLite para maior compatibilidade
  - Testes funcionais completos via interface web

- [ ] **AC3 - 09/11/2025** (Próxima Entrega)
  - Sistema de autenticação e autorização de usuários
  - Interface frontend completa e integrada
  - Validações avançadas de formulários

- [ ] **Entrega Final - 30/11/2025** (Projeto Completo)
  - Sistema completo integrado (Frontend + Backend + Database)
  - Deploy e documentação final
  - Apresentação do projeto concluído

## Links Importantes

- [Repositório no GitHub](https://github.com/isisgoncalves/Piloto)
- [Board do Projeto](https://github.com/users/isisgoncalves/projects/1/views/1)