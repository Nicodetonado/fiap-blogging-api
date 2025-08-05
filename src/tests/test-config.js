// Configurações específicas para testes
export const testConfig = {
  NODE_ENV: 'test',
  MONGODB_URI: 'mongodb://localhost:27017/fiap-blogging-api-test',
  PORT: 3001,
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX_REQUESTS: 100
}; 