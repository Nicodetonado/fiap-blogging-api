# 📚 API de Blogging para Professores

Uma API REST completa para criação e gerenciamento de posts educacionais, desenvolvida para professores da rede pública de educação.

## 🎯 Objetivo

Esta aplicação resolve o problema da falta de plataformas centralizadas onde professores podem compartilhar conhecimento de forma prática e tecnológica com seus alunos.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **Banco de Dados**: MongoDB com Mongoose
- **Containerização**: Docker
- **CI/CD**: GitHub Actions
- **Testes**: Jest
- **Validação**: Express Validator
- **Segurança**: Helmet, CORS, Rate Limiting

## 📋 Requisitos Funcionais Implementados

### ✅ Endpoints Públicos (para alunos)
- `GET /api/posts` - Lista de posts publicados
- `GET /api/posts/:id` - Leitura de post específico
- `GET /api/posts/search?q=termo` - Busca de posts por palavra-chave

### ✅ Endpoints Administrativos (para professores)
- `POST /api/posts` - Criação de novas postagens
- `PUT /api/posts/:id` - Edição de postagens existentes
- `DELETE /api/posts/:id` - Exclusão de postagens
- `GET /api/posts/admin/all` - Listagem de todas as postagens (incluindo rascunhos)

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- MongoDB 6.0+
- Docker (opcional)

### Instalação Local

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd blogging-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Inicie o MongoDB**
```bash
# Se usando MongoDB local
mongod
```

5. **Execute a aplicação**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

### Usando Docker

1. **Clone e navegue para o diretório**
```bash
git clone <url-do-repositorio>
cd blogging-api
```

2. **Execute com Docker Compose**
```bash
docker-compose up -d
```

A aplicação estará disponível em:
- **API**: http://localhost:3000
- **MongoDB**: localhost:27017
- **Mongo Express**: http://localhost:8081 (admin/admin123)

## 📖 Documentação da API

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Listar Posts (Público)
```http
GET /posts
```

**Query Parameters:**
- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Posts por página (padrão: 10)
- `sort` (opcional): Ordenação (padrão: '-createdAt')

**Exemplo de Resposta:**
```json
{
  "success": true,
  "message": "Posts recuperados com sucesso",
  "data": {
    "posts": [...],
    "totalPosts": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### 2. Buscar Post por ID (Público)
```http
GET /posts/:id
```

**Exemplo de Resposta:**
```json
{
  "success": true,
  "message": "Post recuperado com sucesso",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "title": "Introdução à Programação",
    "content": "Conteúdo do post...",
    "author": "Prof. Silva",
    "tags": ["programação", "educação"],
    "readTime": 5,
    "isPublished": true,
    "createdAt": "2023-09-01T10:00:00.000Z",
    "updatedAt": "2023-09-01T10:00:00.000Z"
  }
}
```

#### 3. Criar Post (Administrativo)
```http
POST /posts
```

**Body:**
```json
{
  "title": "Título do Post",
  "content": "Conteúdo do post...",
  "author": "Nome do Professor",
  "tags": ["tag1", "tag2"]
}
```

#### 4. Atualizar Post (Administrativo)
```http
PUT /posts/:id
```

**Body:**
```json
{
  "title": "Novo Título",
  "content": "Novo conteúdo...",
  "isPublished": false
}
```

#### 5. Excluir Post (Administrativo)
```http
DELETE /posts/:id
```

#### 6. Buscar Posts (Público)
```http
GET /posts/search?q=javascript
```

**Query Parameters:**
- `q` (obrigatório): Termo de busca (mínimo 2 caracteres)
- `page` (opcional): Número da página
- `limit` (opcional): Resultados por página

#### 7. Listar Todos os Posts (Administrativo)
```http
GET /posts/admin/all
```

## 🧪 Testes

### Executar Testes
```bash
# Todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Verificar cobertura
npm test -- --coverage
```

### Cobertura de Testes
O projeto mantém uma cobertura mínima de 20% conforme requisito, incluindo testes para:
- ✅ Criação de posts
- ✅ Edição de posts
- ✅ Exclusão de posts
- ✅ Busca de posts
- ✅ Validações de entrada
- ✅ Tratamento de erros

## 🔧 Configuração de Desenvolvimento

### Scripts Disponíveis
```bash
npm start          # Inicia em produção
npm run dev        # Inicia em desenvolvimento com nodemon
npm test           # Executa testes
npm run test:watch # Executa testes em modo watch
npm run lint       # Executa linting
npm run lint:fix   # Corrige problemas de linting
```

### Estrutura do Projeto
```
src/
├── config/
│   └── database.js      # Configuração do MongoDB
├── controllers/
│   └── postController.js # Lógica de negócio
├── models/
│   └── Post.js          # Modelo de dados
├── routes/
│   └── posts.js         # Definição de rotas
├── tests/
│   ├── setup.js         # Configuração de testes
│   └── postController.test.js # Testes unitários
└── server.js            # Servidor principal
```

## 🐳 Docker

### Build da Imagem
```bash
docker build -t blogging-api .
```

### Executar Container
```bash
docker run -p 3000:3000 blogging-api
```

### Docker Compose
```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f app
```

## 🔄 CI/CD

O projeto utiliza GitHub Actions para automação de:
- ✅ Execução de testes
- ✅ Verificação de linting
- ✅ Build de imagem Docker
- ✅ Deploy automático (configurável)

### Workflow
1. **Push/Pull Request** → Dispara pipeline
2. **Test** → Executa testes e linting
3. **Build** → Cria imagem Docker (apenas na main)
4. **Deploy** → Deploy para produção (apenas na main)

## 🔒 Segurança

### Implementações de Segurança
- ✅ **Helmet**: Headers de segurança
- ✅ **CORS**: Controle de acesso cross-origin
- ✅ **Rate Limiting**: Proteção contra spam
- ✅ **Validação de Entrada**: Sanitização de dados
- ✅ **Usuário não-root**: Container Docker seguro

### Variáveis de Ambiente
```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/blogging-api

# Segurança
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📊 Monitoramento

### Health Check
```http
GET /health
```

**Resposta:**
```json
{
  "status": "OK",
  "message": "API de Blogging funcionando corretamente",
  "timestamp": "2023-09-01T10:00:00.000Z"
}
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: Tech Challenge Team
- **Tecnologias**: Node.js, MongoDB, Docker
- **Objetivo**: Plataforma de blogging para professores

## 🎯 Próximos Passos

- [ ] Implementar autenticação JWT
- [ ] Adicionar upload de imagens
- [ ] Implementar sistema de comentários
- [ ] Criar interface web
- [ ] Adicionar notificações em tempo real

---

**Desenvolvido com ❤️ para a comunidade educacional** 