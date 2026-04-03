#!/usr/bin/env sh
# Setup script for ABRIL monorepo

set -e

echo "Setting up ABRIL monorepo..."

# Check Node version
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
  echo "Error: Node.js 18 or higher is required (current: $(node -v))"
  exit 1
fi

# Copy env example if .env doesn't exist
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

# Install dependencies
echo "Installing dependencies..."
npm install

echo "Setup complete! Run 'npm run dev' to start development."
