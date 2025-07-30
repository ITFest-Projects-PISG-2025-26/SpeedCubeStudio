#!/bin/bash
set -e

echo "Starting backend build process..."

# Navigate to backend directory
cd apps/backend

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Build TypeScript
echo "Building TypeScript..."
npm run build

echo "Backend build completed successfully!"
