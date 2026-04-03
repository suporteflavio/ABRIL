FROM node:18-alpine AS base

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install turbo globally
RUN npm install -g turbo

# ---- Builder stage ----
FROM base AS builder

COPY . .
RUN turbo prune --scope=backend --scope=web --docker

# ---- Backend installer ----
FROM base AS backend-installer

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json

RUN npm ci

# ---- Backend runner ----
FROM base AS backend

WORKDIR /app
COPY --from=backend-installer /app/node_modules ./node_modules
COPY --from=builder /app/out/full/ .

RUN npm run build --workspace=apps/backend

EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "apps/backend/dist/index.js"]

# ---- Web installer ----
FROM base AS web-installer

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json

RUN npm ci

# ---- Web runner ----
FROM base AS web

WORKDIR /app
COPY --from=web-installer /app/node_modules ./node_modules
COPY --from=builder /app/out/full/ .

RUN npm run build --workspace=apps/web

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "apps/web/server.js"]
