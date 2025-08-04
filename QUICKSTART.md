# 🚀 Guia de Início Rápido

## ⚡ Iniciar em 5 minutos

### 1. Clone e Instale
```bash
git clone <seu-repositorio>
cd blogging-api
npm install
```

### 2. Configure o Ambiente
```bash
cp env.example .env
# Edite o arquivo .env se necessário
```

### 3. Inicie o MongoDB
```bash
# Opção 1: MongoDB local
mongod

# Opção 2: Docker
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

### 4. Execute a Aplicação
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

### 5. Popule com Dados de Exemplo
```bash
npm run seed
```

## 🧪 Teste a API

### Health Check
```bash
curl http://localhost:3000/health
```

### Listar Posts
```bash
curl http://localhost:3000/api/posts
```

### Criar Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Primeiro Post",
    "content": "Conteúdo do post...",
    "author": "Prof. Silva",
    "tags": ["educação", "tecnologia"]
  }'
```

### Buscar Posts
```bash
curl "http://localhost:3000/api/posts/search?q=javascript"
```

## 🐳 Usando Docker

### Iniciar tudo com Docker Compose
```bash
docker-compose up -d
```

### Acessos:
- **API**: http://localhost:3000
- **MongoDB**: localhost:27017
- **Mongo Express**: http://localhost:8081 (admin/admin123)

## 🧪 Executar Testes

```bash
# Todos os testes
npm test

# Testes com cobertura
npm test -- --coverage

# Testes em modo watch
npm run test:watch
```

## 📚 Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/posts` | Listar posts publicados |
| GET | `/api/posts/:id` | Buscar post por ID |
| POST | `/api/posts` | Criar novo post |
| PUT | `/api/posts/:id` | Atualizar post |
| DELETE | `/api/posts/:id` | Excluir post |
| GET | `/api/posts/search?q=termo` | Buscar posts |
| GET | `/health` | Health check |

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Linting
npm run lint
npm run lint:fix

# Testes
npm test
npm run test:watch

# Seed data
npm run seed

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f app
```

## 🆘 Solução de Problemas

### Erro de Conexão com MongoDB
```bash
# Verifique se o MongoDB está rodando
mongod --version

# Ou use Docker
docker run -d -p 27017:27017 mongo:6.0
```

### Porta 3000 em uso
```bash
# Mude a porta no .env
PORT=3001
```

### Erro de Dependências
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

## 📖 Próximos Passos

1. **Explore a API**: Use o Postman ou curl para testar os endpoints
2. **Leia a Documentação**: Veja o README.md completo
3. **Execute os Testes**: Verifique a cobertura de testes
4. **Personalize**: Adapte para suas necessidades

## 🎯 Exemplo Completo

```bash
# 1. Iniciar
npm run dev

# 2. Popular dados
npm run seed

# 3. Testar endpoints
curl http://localhost:3000/api/posts
curl http://localhost:3000/api/posts/search?q=programação
```

**🎉 Pronto! Sua API de blogging está funcionando!** 