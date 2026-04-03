# Setup Guide

## Local Development

### Prerequisites
- Node.js 18+
- pnpm 8+ (`corepack enable`)
- Docker + Docker Compose

### Environment Variables
Copy `.env.example` to `.env` and fill in your values.

### Database Setup
The `docker-compose.yml` will automatically run the RLS setup script from `scripts/setup-rls.sql`.

### Turborepo Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm dev` | Start all services in dev mode |
| `pnpm lint` | Lint all packages |
| `pnpm test` | Run unit tests |
| `pnpm db:generate` | Run `prisma generate` |
| `pnpm db:migrate` | Run migrations in production |

## Railway Deploy

1. Create a new project on Railway
2. Add a PostgreSQL plugin
3. Set all variables from `.env.example` as Railway environment variables
4. Push to `main` – Railway will build using `Dockerfile` and run `railway.json`

## Architecture

### Multi-tenant RLS

Each tenant's data is isolated using PostgreSQL Row Level Security.
The `PrismaService.withTenant(tenantId, fn)` wraps operations in a transaction
that sets `SET LOCAL app.current_tenant_id = <tenantId>` before executing queries.

The RLS policies check `current_setting('app.current_tenant_id')` to filter rows automatically.

### JWT Auth Flow

1. `POST /auth/login` with `{ cpf, password }` → returns `access_token` (JWT)
2. JWT payload: `{ sub: userId, cpf, tenantId, role }`
3. All protected routes use `JwtAuthGuard` + `TenantGuard`
4. Frontend stores token in `localStorage` and sends as `Authorization: Bearer <token>`
