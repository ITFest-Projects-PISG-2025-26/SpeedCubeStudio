@echo off

REM SpeedCube Studio - Environment Setup Script for Windows

echo 🚀 Setting up SpeedCube Studio for deployment...

REM Check if .env exists
if not exist "apps\backend\.env" (
    echo 📝 Creating backend .env file...
    (
        echo NODE_ENV=development
        echo PORT=4000
        echo DATABASE_URL="postgresql://username:password@localhost:5432/speedcube_db"
        echo JWT_SECRET="your-super-secure-jwt-secret-here"
        echo FRONTEND_URL="http://localhost:3000"
    ) > apps\backend\.env
    echo ✅ Backend .env created. Please update with your actual values.
)

REM Check if frontend .env.local exists
if not exist "apps\frontend\.env.local" (
    echo 📝 Creating frontend .env.local file...
    (
        echo NEXT_PUBLIC_API_URL="http://localhost:4000"
        echo NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
    ) > apps\frontend\.env.local
    echo ✅ Frontend .env.local created.
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

echo 📦 Installing backend dependencies...
cd apps\backend && call npm install && cd ..\..

echo 📦 Installing frontend dependencies...
cd apps\frontend && call npm install && cd ..\..

REM Generate Prisma client
echo 🔧 Generating Prisma client...
cd apps\backend && call npx prisma generate && cd ..\..

echo ✅ Setup complete!
echo.
echo 🔧 Next steps:
echo 1. Update apps\backend\.env with your database URL and JWT secret
echo 2. Run 'npm run dev' to start development servers
echo 3. For production deployment, follow RENDER_DEPLOYMENT.md

pause
