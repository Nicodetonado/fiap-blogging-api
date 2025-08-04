import { testConfig } from './test-config.js';

// Configurações globais para testes
process.env.NODE_ENV = testConfig.NODE_ENV;
process.env.MONGODB_URI = testConfig.MONGODB_URI;
process.env.PORT = testConfig.PORT;
process.env.RATE_LIMIT_WINDOW_MS = testConfig.RATE_LIMIT_WINDOW_MS;
process.env.RATE_LIMIT_MAX_REQUESTS = testConfig.RATE_LIMIT_MAX_REQUESTS;

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