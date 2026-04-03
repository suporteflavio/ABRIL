export enum UserRole {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  STANDARD = 'STANDARD',
}

export interface User {
  id: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  isActive: boolean;
  isSuspended: boolean;
}
