# 📚 API de Blogging para Professores - Tech Challenge

API REST completa para criação e gerenciamento de posts educacionais, desenvolvida com containerização Docker e CI/CD automatizado.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
- [Setup Inicial](#setup-inicial)
- [Guia de Uso das APIs](#guia-de-uso-das-apis)
- [Containerização com Docker](#containerização-com-docker)
- [Testes e Qualidade](#testes-e-qualidade)
- [CI/CD Pipeline](#cicd-pipeline)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## 🎯 Visão Geral

Esta API permite que professores da rede pública criem e gerenciem posts educacionais, fornecendo uma plataforma completa para compartilhamento de conhecimento.

### Funcionalidades Principais:
- ✅ **CRUD completo** de posts educacionais
- ✅ **Sistema de publicação** (rascunho/publicado)
- ✅ **Busca avançada** por título, conteúdo e tags
- ✅ **Paginação** automática
- ✅ **Validação robusta** de dados
- ✅ **Containerização** completa com Docker
- ✅ **CI/CD** automatizado
- ✅ **Testes** automatizados

## 🏗️ Arquitetura da Aplicação

### Estrutura do Projeto:
```
src/
├── config/
│   └── database.js          # Configuração MongoDB
├── controllers/
│   └── postController.js    # Lógica de negócio
├── models/
│   └── Post.js             # Schema do MongoDB
├── repositories/
│   └── PostRepository.js    # Abstração do banco de dados
├── routes/
│   └── posts.js            # Definição de rotas
├── scripts/
│   └── seedData.js         # Dados de exemplo
├── tests/
│   └── postController.test.js # Testes automatizados
└── server.js               # Servidor Express
```

### Padrão Arquitetural:
- **MVC (Model-View-Controller)** adaptado para APIs
- **Separation of Concerns** - responsabilidades bem definidas
- **Middleware Pattern** - validação e segurança
- **Repository Pattern** - abstração do banco de dados (implementado)

### Tecnologias:
- **Backend**: Node.js + Express.js
- **Banco de Dados**: MongoDB + Mongoose
- **Containerização**: Docker + Docker Compose
- **Testes**: Jest + Supertest
- **CI/CD**: GitHub Actions
- **Qualidade**: ESLint + Prettier

## 🚀 Setup Inicial

### Pré-requisitos:
- Docker e Docker Compose instalados
- Node.js 18+ (apenas para desenvolvimento local)
- Git

### Opção 1: Setup com Docker (RECOMENDADO)

```bash
# 1. Clone o repositório
git clone https://github.com/Nicodetonado/fiap-blogging-api.git
cd fiap-blogging-api

# 2. Configure as variáveis de ambiente
cp env.example .env

# 3. Suba o ambiente completo
docker-compose up --build -d

# 4. Popule o banco com dados de exemplo
docker-compose exec app npm run seed

# 5. Verifique se está funcionando
curl http://localhost:3001/health
```

### Opção 2: Setup Local (Desenvolvimento)

```bash
# 1. Clone e instale dependências
git clone https://github.com/Nicodetonado/fiap-blogging-api.git
cd fiap-blogging-api
npm install

# 2. Configure o ambiente
cp env.example .env

# 3. Inicie o MongoDB localmente
# (Instale MongoDB ou use Docker: docker run -d -p 27017:27017 mongo:6.0)

# 4. Execute a aplicação
npm run dev

# 5. Popule dados de exemplo
npm run seed
```

### Verificação do Setup:

```bash
# Teste a API
curl http://localhost:3000/health

# Deve retornar:
{
  "status": "OK",
  "message": "API de Blogging funcionando corretamente",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 📖 Guia de Uso das APIs

### Base URL
```
http://localhost:3001/api/posts
```

### Autenticação
Atualmente a API não requer autenticação (ambiente de desenvolvimento).

### Endpoints Disponíveis

#### 1. Listar Posts Publicados

```http
GET /api/posts
```

**Parâmetros de Query:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Posts por página (padrão: 10)
- `sort` (opcional): Ordenação (padrão: '-createdAt')

**Exemplo:**
```bash
curl "http://localhost:3001/api/posts?page=1&limit=5"
```

**Resposta:**
```json
{
  "success": true,
  "message": "Posts recuperados com sucesso",
  "data": {
    "posts": [...],
    "totalPosts": 6,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### 2. Buscar Posts
```http
GET /api/posts/search?q=termo
```

**Parâmetros:**
- `q` (obrigatório): Termo de busca (mínimo 2 caracteres)
- `page` (opcional): Número da página
- `limit` (opcional): Resultados por página

**Exemplo:**
```bash
curl "http://localhost:3001/api/posts/search?q=programação&page=1&limit=5"
```

**Resposta:**
```json
{
  "success": true,
  "message": "Busca realizada com sucesso",
  "searchTerm": "programação",
  "data": {
    "posts": [...],
    "totalPosts": 2,
    "totalPages": 1
  }
}
```

#### 3. Buscar Post por ID
```http
GET /api/posts/:id
```

**Exemplo:**
```bash
curl http://localhost:3001/api/posts/64f8a1b2c3d4e5f67890123
```

**Resposta:**
```json
{
  "success": true,
  "message": "Post recuperado com sucesso",
  "data": {
    "_id": "64f8a1b2c3d4e5f67890123",
    "title": "Introdução à Programação",
    "content": "A programação é uma habilidade fundamental...",
    "author": "Prof. Ana Silva",
    "tags": ["programação", "javascript"],
    "isPublished": true,
    "readTime": 3,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 4. Criar Novo Post
```http
POST /api/posts
```

**Body (JSON):**
```json
{
  "title": "Matemática Divertida",
  "content": "A matemática está presente em todos os lugares...",
  "author": "Prof. Carlos Mendes",
  "tags": ["matemática", "geometria", "educação"]
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Matemática Divertida",
    "content": "A matemática está presente em todos os lugares...",
    "author": "Prof. Carlos Mendes",
    "tags": ["matemática", "geometria", "educação"]
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Post criado com sucesso",
  "data": {
    "_id": "64f8a1b2c3d4e5f67890124",
    "title": "Matemática Divertida",
    "content": "A matemática está presente em todos os lugares...",
    "author": "Prof. Carlos Mendes",
    "tags": ["matemática", "geometria", "educação"],
    "isPublished": true,
    "readTime": 2,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
}
```

#### 5. Atualizar Post
```http
PUT /api/posts/:id
```

**Body (JSON) - campos opcionais:**
```json
{
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado...",
  "author": "Prof. João Silva",
  "tags": ["tecnologia", "educação"],
  "isPublished": false
}
```

**Exemplo:**
```bash
curl -X PUT http://localhost:3001/api/posts/64f8a1b2c3d4e5f67890123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título Atualizado",
    "isPublished": false
  }'
```

#### 6. Excluir Post
```http
DELETE /api/posts/:id
```

**Exemplo:**
```bash
curl -X DELETE http://localhost:3001/api/posts/64f8a1b2c3d4e5f67890123
```

**Resposta:**
```json
{
  "success": true,
  "message": "Post excluído com sucesso"
}
```


### Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Dados inválidos |
| 403 | Post não publicado |
| 404 | Post não encontrado |
| 500 | Erro interno do servidor |

### Validações

#### Campos Obrigatórios:
- **title**: 3-200 caracteres
- **content**: mínimo 10 caracteres
- **author**: 2-100 caracteres

#### Campos Opcionais:
- **tags**: array de strings
- **isPublished**: boolean (padrão: true)

## 🐳 Containerização com Docker

### Estrutura Docker

O projeto utiliza **containerização completa** com três serviços:

```yaml
services:
  app:           # Aplicação Node.js (porta 3001)
  mongo:         # MongoDB (porta 27017)
  mongo-express: # Interface web MongoDB (porta 8081)
```

### Comandos Docker

```bash
# Subir ambiente completo
docker-compose up --build -d

# Ver logs em tempo real
docker-compose logs -f

# Executar seed no container
docker-compose exec app npm run seed

# Parar todos os containers
docker-compose down

# Parar e remover volumes (dados)
docker-compose down -v

# Reconstruir apenas a aplicação
docker-compose up --build app
```

### Acessos

- **API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017
- **Mongo Express**: http://localhost:8081 (admin/admin123)

## 🧪 Testes e Qualidade

### Executar Testes

```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de testes
npm test -- --coverage
```

### Linting e Qualidade de Código

```bash
# Verificar código
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

### Estrutura de Testes

```
src/tests/
└── postController.test.js  # Testes dos endpoints
```

**Cobertura de Testes:**
- ✅ **GET /api/posts** - Listagem com paginação
- ✅ **GET /api/posts/search** - Busca avançada
- ✅ **GET /api/posts/:id** - Busca por ID
- ✅ **POST /api/posts** - Criação de posts
- ✅ **PUT /api/posts/:id** - Atualização
- ✅ **DELETE /api/posts/:id** - Exclusão


## 🔄 CI/CD Pipeline

### GitHub Actions

O projeto possui **CI/CD automatizado** configurado em `.github/workflows/ci-cd.yml`:

#### Jobs do Pipeline:

1. **Test** (Sempre executa):
   - Setup Node.js 18
   - Instala dependências
   - Executa linting
   - Roda testes automatizados
   - MongoDB em container

2. **Build** (Apenas na main):
   - Constrói imagem Docker
   - Cache otimizado

3. **Deploy** (Apenas na main):
   - Build finalizado (pronto para deploy quando necessário)

#### Triggers:
- Push para `main` ou `develop`
- Pull Request para `main`

### Comandos de Desenvolvimento

```bash
# Desenvolvimento local
npm run dev

# Build finalizado
npm start

# Testes
npm test

# Linting
npm run lint

# Seed dados
npm run seed
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js 18** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB

### Segurança e Performance
- **Helmet** - Headers de segurança
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Proteção contra ataques
- **Morgan** - Logging de requisições

### Validação e Testes
- **Express Validator** - Validação de dados
- **Jest** - Framework de testes
- **Supertest** - Testes de integração
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

### Containerização
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Mongo Express** - Interface web MongoDB

### CI/CD
- **GitHub Actions** - Automação
- **Node.js 18** - Ambiente de build
- **MongoDB 6.0** - Banco de testes

## 📊 Estatísticas do Projeto

- **Endpoints**: 6 endpoints REST
- **Testes**: 100% dos endpoints testados
- **Containerização**: 3 serviços Docker
- **CI/CD**: Pipeline automatizado
- **Qualidade**: ESLint + Prettier
- **Documentação**: README completo

---

**Tech Challenge PÓS-FULLSTACK 2025 - FIAP** 🚀 
