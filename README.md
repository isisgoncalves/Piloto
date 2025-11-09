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
- ✅ Sistema de autenticação JWT
- ✅ Registro e login de usuários
- ✅ Proteção de rotas com autenticação
- ✅ API REST documentada automaticamente
- ✅ Validação de dados robusta
- 🔄 Interface de usuário (em desenvolvimento)
- 🔄 Validações avançadas de formulários

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
# Ativar ambiente virtual
venv\Scripts\activate

# Navegar para pasta backend
cd backend

# Iniciar servidor (IMPORTANTE: usar Python 3.12+)
uvicorn app.main:app --reload
```

**⚠️ Requisitos Importantes:**
- **Python 3.12+**
- **SQL Server**
- **Todas as dependências do requirements.txt instaladas**

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

**Eventos:**
- `GET /api/events/` - Listar eventos com filtros opcionais
- `POST /api/events/` - Criar novo evento (requer autenticação)
- `GET /api/events/{id}` - Buscar evento específico por ID

**Autenticação:**
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário (retorna JWT token)
- `GET /api/auth/me` - Obter dados do usuário atual (requer autenticação)

### Filtros Implementados:
- **Título**: Busca parcial case-insensitive
- **Localização**: Busca parcial case-insensitive  
- **Período**: Filtro por data inicial e/ou final
- **Combinados**: Todos os filtros podem ser usados simultaneamente

### Acesso:
- **API Base**: `http://127.0.0.1:8000`
- **Documentação Interativa**: `http://127.0.0.1:8000/docs` (Swagger UI)
- **Documentação Alternativa**: `http://127.0.0.1:8000/redoc`

### Detalhamento das Entregas:

#### **AC1 - CRUD Completo de Eventos:**

**✅ Funcionalidades Implementadas:**
1. **Criar Evento** - `POST /api/events/`
   - Validação de dados com Pydantic
   - Persistência no banco SQLite/SQL Server
   - Retorno do evento criado com ID

2. **Listar Eventos** - `GET /api/events/`
   - Paginação com skip/limit
   - Listagem completa de eventos
   - Formato JSON padronizado

3. **Buscar Evento** - `GET /api/events/{id}`
   - Busca por ID específico
   - Tratamento de erro 404
   - Retorno de dados completos

**🔧 Tecnologias AC1:**
- **FastAPI** para API REST
- **SQLAlchemy** para ORM
- **Pydantic** para validação
- **SQLite** para desenvolvimento

#### **AC2 - Sistema de Filtros e Busca:**

**✅ Filtros Implementados:**
1. **Filtro por Título** - `?title=texto`
   - Busca parcial case-insensitive
   - Operador ILIKE do SQL
   - Combinável com outros filtros

2. **Filtro por Localização** - `?location=local`
   - Busca parcial case-insensitive
   - Localização em qualquer parte do texto
   - Flexibilidade de busca

3. **Filtro por Período** - `?start_date=2025-01-01&end_date=2025-12-31`
   - Filtro por data inicial e/ou final
   - Formato ISO de datas
   - Consultas otimizadas

4. **Filtros Combinados**
   - Todos os filtros funcionam simultaneamente
   - Lógica AND entre condições
   - Performance otimizada

**🔧 Tecnologias AC2:**
- **SQLAlchemy Query Builder** para filtros
- **Swagger UI** para documentação interativa
- **Validação automática** de parâmetros
- **Testes funcionais** via interface web

#### **AC3 - Sistema de Autenticação JWT:**

**✅ Cenários Validados:**
1. **Registro de Usuário** - `POST /api/auth/register`
   - Criação de usuários com validação de email
   - Hash seguro de senhas com bcrypt
   - Retorno de dados do usuário criado

2. **Login JWT** - `POST /api/auth/login`
   - Autenticação com email e senha
   - Geração de token JWT válido
   - Token com expiração configurável (30 minutos)

3. **Proteção de Rotas** - Middleware de Segurança
   - Rotas protegidas retornam 401 sem token
   - Verificação automática de autenticação
   - Sistema de autorização funcionando

**🔧 Tecnologias AC3:**
- **JWT (JSON Web Tokens)** para autenticação stateless
- **bcrypt** para hash seguro de senhas
- **OAuth2PasswordBearer** para padrão de autenticação
- **Middleware FastAPI** para proteção automática de rotas

## Cronograma de Entregas

- [x] **AC1 - 14/09/2025** (Concluído) ✅
  - **CRUD Completo de Eventos**
  - Estrutura básica do projeto (Frontend/Backend/Database)
  - API REST com 3 endpoints principais
  - Configuração do ambiente de desenvolvimento
  - Documentação inicial e repositório GitHub
  - **Status**: Sistema básico funcionando com persistência

- [x] **AC2 - 12/10/2025** (Concluído) ✅
  - **Sistema de Filtros e Busca Avançada**
  - Filtros por título, localização e período de datas
  - API REST com documentação automática (Swagger UI)
  - Migração para banco SQLite para maior compatibilidade
  - Testes funcionais completos via interface web
  - **Status**: Sistema de busca robusto e otimizado

- [x] **AC3 - 09/11/2025** (Concluído) ✅
  - **Sistema de Autenticação JWT**
  - Registro e login de usuários funcionais
  - Proteção de rotas sensíveis (criação de eventos)
  - Hash seguro de senhas com bcrypt
  - Middleware de autenticação integrado
  - **Status**: Sistema seguro com controle de acesso

- [ ] **Entrega Final - 30/11/2025** (Próxima Entrega) 🚀
  - **Interface Frontend Completa**
  - Interface de usuário integrada com backend
  - Validações avançadas de formulários
  - Sistema completo funcionando end-to-end
  - Deploy e documentação final
  - Apresentação do projeto concluído
  - **Meta**: Sistema completo pronto para produção

## Links Importantes

- [Repositório no GitHub](https://github.com/isisgoncalves/Piloto)
- [Board do Projeto](https://github.com/users/isisgoncalves/projects/1/views/1)