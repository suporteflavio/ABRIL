FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-workspace.yaml package.json turbo.json ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/config/package.json ./packages/config/
COPY apps/backend/package.json ./apps/backend/
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY packages/ ./packages/
COPY apps/backend/ ./apps/backend/
RUN pnpm --filter=backend exec prisma generate
RUN pnpm --filter=backend run build

FROM node:18-alpine AS production
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/pnpm-workspace.yaml /app/package.json /app/turbo.json ./
COPY --from=build /app/packages/ ./packages/
COPY --from=build /app/apps/backend/dist ./apps/backend/dist
COPY --from=build /app/apps/backend/package.json ./apps/backend/
COPY --from=build /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=build /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

EXPOSE 3001
CMD ["sh", "-c", "cd apps/backend && npx prisma migrate deploy && node dist/main.js"]
