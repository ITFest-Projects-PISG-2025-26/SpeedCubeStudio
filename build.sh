#!/bin/bash

# Build script for Render deployment
echo "🔧 Building SpeedCube Studio..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Build backend
echo "🔨 Building backend..."
cd apps/backend
npm install
npx prisma generate
npm run build
cd ../..

echo "✅ Backend build complete!"

# Build frontend
echo "🔨 Building frontend..."
cd apps/frontend
npm install
npm run build
cd ../..

echo "✅ Frontend build complete!"
echo "🚀 Build process finished successfully!"
