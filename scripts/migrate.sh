#!/usr/bin/env bash
# Run Prisma migrations for the backend
set -e

echo "Running Prisma migrations..."
cd "$(dirname "$0")/../apps/backend"
npx prisma migrate deploy
echo "Migrations complete."
