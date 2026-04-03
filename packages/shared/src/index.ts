// Shared types and utilities for ABRIL

export interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  isActive: boolean;
  isSuspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
  STANDARD = 'STANDARD',
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
