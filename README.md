# Election SaaS

Sistema SaaS multi-tenant para gestão de campanhas eleitorais.

## 🚀 Stack

- **Backend**: NestJS + Express + Prisma + PostgreSQL
- **Frontend**: Next.js 14 (App Router) + PWA
- **Monorepo**: Turborepo + pnpm workspaces
- **Auth**: JWT + CPF-based login
- **Multi-tenancy**: PostgreSQL Row Level Security (RLS)
- **Deploy**: Docker + Railway

## 📁 Estrutura

```
election-saas/
├── apps/
│   ├── backend/          # NestJS API (porta 3001)
│   └── web/              # Next.js 14 (porta 3000)
├── packages/
│   ├── shared/           # Tipos e DTOs compartilhados
│   └── config/           # Configurações ESLint/TypeScript
├── scripts/              # SQL de RLS + scripts de migração
├── docs/                 # Documentação
├── docker-compose.yml    # Dev local
└── Dockerfile            # Build de produção
```

## ⚡ Início Rápido

### Pré-requisitos
- Node.js 18+
- pnpm 8+
- Docker + Docker Compose

### 1. Instalar dependências

```bash
corepack enable
pnpm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Edite .env com seus valores
```

### 3. Subir serviços locais

```bash
docker-compose up -d
```

### 4. Executar migrações do banco

```bash
pnpm db:generate
pnpm db:migrate
```

### 5. Rodar em desenvolvimento

```bash
# Backend (terminal 1)
pnpm dev:backend

# Frontend (terminal 2)
pnpm dev:web
```

## 🧪 Testes

```bash
pnpm test        # Testes unitários
pnpm test:e2e    # Testes E2E (requer banco rodando)
```

## 🏗️ Build

```bash
pnpm build
```

## 🚢 Deploy no Railway

1. Conecte seu repositório no [Railway](https://railway.app)
2. Adicione um serviço PostgreSQL
3. Configure as variáveis de ambiente (veja `.env.example`)
4. O `railway.json` já configura o deploy automático

## 🔐 Autenticação

Login com CPF (apenas dígitos) + senha:

```json
POST /auth/login
{
  "cpf": "12345678901",
  "password": "suasenha"
}
```

Retorna JWT com `sub` (userId), `tenantId` e `role`.

## 🏢 Multi-tenancy

Cada request autenticado carrega `tenantId` no JWT. O `PrismaService.withTenant()` garante isolamento via PostgreSQL `SET LOCAL app.current_tenant_id`.

## 📚 API Docs

Após subir o backend: http://localhost:3001/api/docs (Swagger UI)
