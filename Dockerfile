# ---- Base: install deps ---------------------------------------------------
FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
WORKDIR /app
COPY pnpm-workspace.yaml package.json turbo.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/config/package.json ./packages/config/
COPY apps/backend/package.json ./apps/backend/
COPY apps/web/package.json ./apps/web/

# ---- Deps -----------------------------------------------------------------
FROM base AS deps
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Backend build --------------------------------------------------------
FROM deps AS backend-build
COPY packages/ ./packages/
COPY apps/backend/ ./apps/backend/
RUN pnpm --filter=backend run build

# ---- Backend production image --------------------------------------------
FROM node:18-alpine AS backend
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
WORKDIR /app
ENV NODE_ENV=production
COPY --from=backend-build /app/pnpm-workspace.yaml /app/package.json /app/turbo.json ./
COPY --from=backend-build /app/packages/ ./packages/
COPY --from=backend-build /app/apps/backend/dist ./apps/backend/dist
COPY --from=backend-build /app/apps/backend/package.json ./apps/backend/
COPY --from=backend-build /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=backend-build /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
EXPOSE 3001
CMD ["node", "apps/backend/dist/main.js"]

# ---- Web build ------------------------------------------------------------
FROM deps AS web-build
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/
RUN pnpm --filter=web run build

# ---- Web production image ------------------------------------------------
FROM node:18-alpine AS web
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
WORKDIR /app
ENV NODE_ENV=production
COPY --from=web-build /app/pnpm-workspace.yaml /app/package.json /app/turbo.json ./
COPY --from=web-build /app/packages/ ./packages/
COPY --from=web-build /app/apps/web/.next/standalone ./apps/web/
COPY --from=web-build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=web-build /app/apps/web/public ./apps/web/public
COPY --from=web-build /app/apps/web/package.json ./apps/web/
COPY --from=web-build /app/pnpm-lock.yaml ./
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
