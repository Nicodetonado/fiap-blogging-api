import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import postsRoutes from './routes/posts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados (apenas se não estiver em teste)
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}


// Middleware de segurança
app.use(helmet());

// Configuração do CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://provisorio.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limite por IP
  message: {
    error: 'Muitas requisições deste IP, tente novamente mais tarde.'
  }
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rotas
app.use('/api/posts', postsRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API de Blogging funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe`
  });
});
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log('📚 API de Blogging para professores');
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV}`);
  });
}


export default app; 