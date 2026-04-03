# Deploy no Railway

## Pré-requisitos

- Conta no Railway (railway.app)
- pnpm 8.15.0+
- Node.js 18+

## Deploy via Railway CLI

1. Instale o Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Faça login:
   ```bash
   railway login
   ```

3. Conecte ao projeto:
   ```bash
   railway link
   ```

4. Faça o deploy:
   ```bash
   railway up
   ```

## Variáveis de Ambiente no Railway

Configure as seguintes variáveis no painel do Railway:

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL do PostgreSQL (Railway provisiona automaticamente) |
| `REDIS_HOST` | Host do Redis |
| `REDIS_PORT` | Porta do Redis (padrão: 6379) |
| `JWT_SECRET` | Segredo para geração de JWT |
| `JWT_EXPIRES_IN` | Expiração do token (ex: `7d`) |
| `CORS_ORIGIN` | URL do frontend |
| `NODE_ENV` | `production` |

## Deploy via Docker

```bash
# Build e start com docker-compose
docker-compose up --build -d

# Verificar logs
docker-compose logs -f
```

## CI/CD

O CI executa em cada push/PR para `main`:
1. Lint
2. Type check
3. Build
4. Tests

Configurado em `.github/workflows/ci.yml`.
