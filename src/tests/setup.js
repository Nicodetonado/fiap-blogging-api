// Configurações globais para testes
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/blogging-api-test';

// Aumentar timeout para testes de integração
jest.setTimeout(30000);

// Suprimir logs durante testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}; 