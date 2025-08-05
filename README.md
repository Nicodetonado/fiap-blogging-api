# 📚 API de Blogging para Professores

API REST completa para criação e gerenciamento de posts educacionais.

## 🚀 Início Rápido

### 1. Clone e Instale
```bash
git clone https://github.com/Nicodetonado/fiap-blogging-api.git
cd fiap-blogging-api
npm install
```

### 2. Configure o Ambiente
```bash
cp env.example .env
```

### 3. Configure o MongoDB
- **Opção A**: MongoDB local (verifique se porta 27017 está LISTENING: `netstat -an | findstr 27017`)
- **Opção B**: MongoDB Compass (conecte em `mongodb://127.0.0.1:27017`)
- **Opção C**: Docker (`docker run -d -p 27017:27017 --name mongodb mongo:6.0`)

### 4. Execute
```bash
npm run dev
npm run seed  # Popular dados de exemplo
```

## 📖 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/posts` | Listar posts publicados |
| GET | `/api/posts/:id` | Buscar post por ID |
| POST | `/api/posts` | Criar novo post |
| PUT | `/api/posts/:id` | Atualizar post |
| DELETE | `/api/posts/:id` | Excluir post |
| GET | `/api/posts/search?q=termo` | Buscar posts |
| GET | `/health` | Health check |

## 🧪 Testes

```bash
npm test
npm run lint
```

## 🐳 Docker

```bash
docker-compose up -d
```

## 🗄️ MongoDB Compass

1. Abra o MongoDB Compass
2. Conecte em: `mongodb://127.0.0.1:27017`
3. Crie database: `fiap-blogging-api`
4. Crie collection: `posts`

## 📋 Tecnologias

- **Backend**: Node.js + Express
- **Banco**: MongoDB + Mongoose
- **Testes**: Jest
- **Containerização**: Docker
- **CI/CD**: GitHub Actions

## 🔧 Comandos Úteis

```bash
npm run dev      # Desenvolvimento
npm start        # Produção
npm test         # Testes
npm run seed     # Popular dados
npm run lint     # Verificar código
```

## 🎯 Exemplo de Uso

```bash
# 1. Iniciar
npm run dev

# 2. Popular dados
npm run seed

# 3. Testar API
curl http://localhost:3000/api/posts
```

---

**Desenvolvido para a comunidade educacional** ❤️ 
