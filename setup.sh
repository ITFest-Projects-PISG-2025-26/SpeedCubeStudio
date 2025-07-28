#!/bin/bash

# SpeedCube Studio - Environment Setup Script

echo "🚀 Setting up SpeedCube Studio for deployment..."

# Check if .env exists
if [ ! -f "apps/backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cat > apps/backend/.env << EOL
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://username:password@localhost:5432/speedcube_db"
JWT_SECRET="your-super-secure-jwt-secret-here"
FRONTEND_URL="http://localhost:3000"
EOL
    echo "✅ Backend .env created. Please update with your actual values."
fi

# Check if frontend .env.local exists
if [ ! -f "apps/frontend/.env.local" ]; then
    echo "📝 Creating frontend .env.local file..."
    cat > apps/frontend/.env.local << EOL
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
EOL
    echo "✅ Frontend .env.local created."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd apps/backend && npm install && cd ../..

echo "📦 Installing frontend dependencies..."
cd apps/frontend && npm install && cd ../..

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd apps/backend && npx prisma generate && cd ../..

echo "✅ Setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Update apps/backend/.env with your database URL and JWT secret"
echo "2. Run 'npm run dev' to start development servers"
echo "3. For production deployment, follow RENDER_DEPLOYMENT.md"
