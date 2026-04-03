// Shared frontend types

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';
  plan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
  createdAt: string;
}

export interface User {
  id: string;
  cpf: string;
  name: string;
  email?: string;
  role: 'ROOT' | 'ADMIN' | 'MANAGER' | 'USER';
  tenantId: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}
