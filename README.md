# Sistema de Gerenciamento de Eventos e Workshops

![Linguagem](https://img.shields.io/badge/Backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React-61dafb)
![Database](https://img.shields.io/badge/Database-SQL%20Server-CC2927)
![Status](https://img.shields.io/badge/Status-Completo-success)

## Sobre o Projeto

Este projeto implementa um sistema completo de gerenciamento de eventos e workshops, desenvolvido como trabalho acadêmico da disciplina de Projeto de Software. 

### Arquitetura em 3 Camadas:
- **Frontend**: React + Vite + Material-UI
- **Backend**: FastAPI + SQLAlchemy + Pydantic  
- **Banco de Dados**: SQL Server

### Funcionalidades Implementadas:
- ✅ **CRUD Completo de Eventos** - Criar, visualizar, editar e excluir eventos
- ✅ **Sistema de Filtros e Busca Avançada** - Filtros por título, local e período
- ✅ **Autenticação JWT Completa** - Login, registro, perfil e proteção de rotas
- ✅ **Dashboard com Estatísticas** - Métricas em tempo real (ativos, passados, este mês)
- ✅ **Modal de Visualização/Edição** - Interface intuitiva para gerenciar eventos
- ✅ **Validações em Tempo Real** - Formulários com feedback imediato
- ✅ **Interface Responsiva** - Design adaptativo para desktop e mobile
- ✅ **API REST Documentada** - Swagger UI e ReDoc integrados
- ✅ **Documentação Técnica** - Diagramas UML (Caso de Uso e Classes)

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
```env
SQL_SERVER=localhost\\SQLEXPRESS
SQL_DATABASE=eventos_db
SQL_USERNAME=seu_usuario
SQL_PASSWORD=sua_senha
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
- `PUT /api/events/{id}` - Atualizar evento (requer autenticação)
- `DELETE /api/events/{id}` - Excluir evento (requer autenticação)

**Autenticação:**
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário (retorna JWT token)
- `GET /api/auth/me` - Obter dados do usuário atual (requer autenticação)
- `PUT /api/auth/profile` - Atualizar perfil do usuário (requer autenticação)

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
   - Persistência no banco SQL Server
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
- **SQL Server** para banco de dados

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

#### ** Entrega Final (Interface Completa e Documentação):**

**✅ Funcionalidades Implementadas:**
1. **Interface Frontend Completa**
   - Dashboard com estatísticas em tempo real
   - Modal de visualização/edição de eventos
   - Sistema de filtros integrado

2. **Validações Avançadas**
   - Validação de formulários em tempo real
   - Feedback visual de erros
   - Mensagens personalizadas em português
   - Validação de datas (início antes do fim)

3. **Gerenciamento Completo de Eventos**
   - Criação de eventos com validação
   - Edição inline via modal
   - Exclusão com confirmação

4. **Sistema de Perfil**
   - Visualização de dados do usuário
   - Edição de perfil
   - Menu dropdown no header
   - Exibição de iniciais do usuário

5. **Documentação Técnica**
   - Diagrama de Caso de Uso completo (12 UCs)
   - Diagrama de Classes detalhado (11 classes)

**🔧 Tecnologias AC4:**
- **React 19** para interface moderna
- **Material-UI** para componentes
- **TailwindCSS** para estilização
- **Axios** com interceptors para API
- **React Router** para navegação
- **Mermaid** para diagramas UML

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
  - Integração completa com SQL Server
  - Testes funcionais completos via interface web
  - **Status**: Sistema de busca robusto e otimizado

- [x] **AC3 - 09/11/2025** (Concluído) ✅
  - **Sistema de Autenticação JWT**
  - Registro e login de usuários funcionais
  - Proteção de rotas sensíveis (criação de eventos)
  - Hash seguro de senhas com bcrypt
  - Middleware de autenticação integrado
  - **Status**: Sistema seguro com controle de acesso

- [x] **Entrega Final - 30/11/2025** (Concluído) ✅
  - **Sistema Completo Finalizado**
  - Interface frontend totalmente integrada com backend
  - Dashboard com estatísticas em tempo real
  - Modal de visualização/edição de eventos
  - Validações completas em todos os formulários
  - Diagramas UML (Caso de Uso e Classes)
  - Roteiro de demonstração documentado
  - Sistema 100% funcional end-to-end
  - **Status**: Projeto concluído e pronto para apresentação

## Documentação Técnica

### Diagramas UML
- 📊 [Diagrama de Caso de Uso](docs/diagrama-caso-de-uso.md) - 12 casos de uso documentados
- 🏗️ [Diagrama de Classes](docs/diagrama-classes.md) - Arquitetura completa do sistema

### Gerenciamento do Projeto
- 📋 [Board do Projeto](https://github.com/users/isisgoncalves/projects/1/views/1) - Kanban com todas as issues
- 🔗 [Repositório no GitHub](https://github.com/isisgoncalves/Piloto)

## Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validação de dados
- **JWT (PyJWT)** - Autenticação stateless
- **bcrypt** - Hash seguro de senhas
- **uvicorn** - Servidor ASGI
- **pyodbc** - Conexão com SQL Server

### Frontend
- **React 19** - Biblioteca JavaScript
- **Vite** - Build tool ultra-rápido
- **Material-UI** - Componentes React
- **React Router** - Roteamento SPA
- **Axios** - Cliente HTTP
- **TailwindCSS** - Estilização utility-first

### Banco de Dados
- **SQL Server** - Banco de dados relacional
- **SQLAlchemy ORM** - Abstração de banco

## Padrões de Projeto Utilizados

- **MVC (Model-View-Controller)** - Separação de responsabilidades
- **Service Layer** - Lógica de negócio isolada
- **Repository Pattern** - Abstração de acesso a dados
- **Dependency Injection** - Inversão de controle
- **JWT Authentication** - Autenticação stateless

## Autoria

**Aluna**: Isis Gonçalves Soares
**Disciplina**: Projeto de Software  
**Instituição**: Faculdade Impacta  
**Período**: 2025

## Licença

Este projeto foi desenvolvido para fins acadêmicos na disciplina de Projeto de Software.