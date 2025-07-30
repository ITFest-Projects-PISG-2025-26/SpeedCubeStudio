#!/bin/bash

# Install root dependencies
npm install

# Install backend dependencies
cd apps/backend
npm install

# Generate Prisma client
npx prisma generate

# Build backend
npm run build

echo "Build completed successfully!"
