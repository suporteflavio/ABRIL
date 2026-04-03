export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend-production-2ee38.up.railway.app/api/v1',
  TIMEOUT: 10000,
} as const;

export const APP_CONFIG = {
  NAME: 'ABRIL',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema de gestão de campanhas eleitorais',
  URL: 'https://web-production-26206.up.railway.app',
} as const;