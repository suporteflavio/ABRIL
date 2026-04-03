export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';
export type UserRole = 'ROOT' | 'ADMIN' | 'MANAGER' | 'USER';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'TRIALING';
export type SubscriptionPlan = 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';

export interface TenantDto {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;
  plan: SubscriptionPlan;
  createdAt: string;
}

export interface UserDto {
  id: string;
  cpf: string;
  name: string;
  email?: string;
  role: UserRole;
  tenantId: string;
}

export interface JwtPayload {
  sub: string;
  cpf: string;
  tenantId: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface LoginRequestDto {
  cpf: string;
  password: string;
  tenantId?: string;
}

export interface LoginResponseDto {
  access_token: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
