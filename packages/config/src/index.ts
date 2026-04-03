export const APP_CONFIG = {
  NAME: 'ABRIL',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema SaaS para gestão de campanhas eleitorais',
  API_PREFIX: 'api/v1',
  DEFAULT_PORT: 3001,
  DEFAULT_FRONTEND_PORT: 3000,
} as const;

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    price: 199,
    currency: 'BRL',
    maxUsers: 5,
    maxLeaders: 50,
  },
  PROFESSIONAL: {
    name: 'Professional',
    price: 499,
    currency: 'BRL',
    maxUsers: 20,
    maxLeaders: 200,
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 999,
    currency: 'BRL',
    maxUsers: -1,
    maxLeaders: -1,
  },
} as const;

export const JWT_CONFIG = {
  EXPIRES_IN: '7d',
  REFRESH_EXPIRES_IN: '30d',
} as const;

export const RATE_LIMIT_CONFIG = {
  WINDOW_MS: 15 * 60 * 1000,
  MAX_REQUESTS: 100,
} as const;
