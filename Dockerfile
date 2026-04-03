# Builder stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.0

# Copy package files for all workspaces
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
COPY packages/config/package.json ./packages/config/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build all applications
RUN pnpm build

# Remove dev dependencies
RUN pnpm prune --prod

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.0

# Copy built application
COPY --from=builder /app .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S abril -u 1001

# Change ownership
RUN chown -R abril:nodejs /app

USER abril

EXPOSE 3000 3001

CMD ["pnpm", "start"]
