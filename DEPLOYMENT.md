# SpeedCube Studio - Deployment Guide

## Complete Multiplayer Cube Timer with Real-time Competition

### 🎯 Project Overview
- **Multiplayer cube timer** with real-time competitions
- **User authentication** with personal solve history
- **Room-based system** with 6-digit join codes
- **Socket.IO** for real-time synchronization
- **PostgreSQL** database with Prisma ORM
- **Next.js** frontend with **Express** backend

---

## 📋 Prerequisites & Versions

### Development Environment
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0  
- **PostgreSQL**: >= 13.0
- **Git**: Latest version

### Production Requirements
- **Render.com** account (free tier available)
- **GitHub** repository
- **PostgreSQL** database (Render managed or external)

---

## 🔧 Package Versions

### Backend Dependencies (apps/backend/package.json)
```json
{
  "name": "backend",
  "version": "1.0.0",
  "dependencies": {
    "@prisma/client": "^5.7.1",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "socket.io": "^4.7.4",
    "body-parser": "^1.20.2",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/node": "^20.10.5",
    "typescript": "^5.3.3",
    "nodemon": "^3.0.2",
    "ts-node": "^10.9.2",
    "prisma": "^5.7.1"
  }
}
```

### Frontend Dependencies (apps/frontend/package.json)
```json
{
  "name": "frontend",
  "version": "0.1.0",
  "dependencies": {
    "next": "14.1.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "^3.4.1",
    "socket.io-client": "^4.7.4",
    "axios": "^1.6.2",
    "zustand": "^4.4.7",
    "lucide-react": "^0.263.0",
    "clsx": "^2.1.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.1.0"
  }
}
```

---

## 🛠️ Build & Development Setup

### Step 1: Project Setup
```bash
# Clone the repository
git clone https://github.com/ITFest-Projects-PISG-2025-26/SpeedCubeStudio.git
cd SpeedCubeStudio

# Install root dependencies
npm install

# Install backend dependencies
cd apps/backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### Step 2: Database Configuration
```bash
# Install PostgreSQL locally (if not installed)
# macOS: brew install postgresql
# Windows: Download from postgresql.org
# Ubuntu: sudo apt install postgresql

# Create database
createdb speedcube_db

# Setup backend environment
cd apps/backend
cp .env.example .env

# Edit .env file with your configuration:
DATABASE_URL="postgresql://username:password@localhost:5432/speedcube_db"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
NODE_ENV="development"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

### Step 3: Database Migration
```bash
cd apps/backend

# Generate Prisma client
npx prisma generate

# Push database schema  
npx prisma db push

# (Optional) View database in browser
npx prisma studio
```

### Step 4: Environment Setup
```bash
# Frontend environment
cd apps/frontend
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:5000" > .env.local
```

### Step 5: Development Servers
```bash
# Terminal 1 - Backend
cd apps/backend
npm run dev
# Server runs on http://localhost:5000

# Terminal 2 - Frontend  
cd apps/frontend
npm run dev
# Frontend runs on http://localhost:3000
```

---

## 🚀 Deployment on Render.com

### Step 1: Prepare Repository
1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify project structure**:
   ```
   speedcubestudio/
   ├── apps/
   │   ├── backend/
   │   │   ├── src/
   │   │   ├── prisma/
   │   │   ├── package.json
   │   │   └── tsconfig.json
   │   └── frontend/
   │       ├── src/
   │       ├── package.json
   │       └── next.config.js
   ├── package.json
   └── README.md
   ```

### Step 2: Create PostgreSQL Database
1. **Login to Render.com**
2. **Dashboard** → **New** → **PostgreSQL**
3. **Configure database**:
   - **Name**: `speedcube-database`
   - **Database**: `speedcube_db`  
   - **User**: `speedcube_user`
   - **Region**: Choose closest to your users
4. **Create Database**
5. **Copy the External Database URL** - you'll need this for backend

### Step 3: Deploy Backend Service
1. **Dashboard** → **New** → **Web Service**
2. **Connect GitHub** repository
3. **Configure service**:
   - **Name**: `speedcube-backend`
   - **Root Directory**: `apps/backend`
   - **Environment**: `Node`
   - **Build Command**: 
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**: 
     ```bash
     npm start
     ```

4. **Environment Variables** (click "Advanced"):
   ```
   DATABASE_URL=<paste-postgresql-url-from-step-2>
   JWT_SECRET=<generate-strong-32+-character-secret>
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=<will-update-after-frontend-deploy>
   ```

5. **Deploy** - Backend will be available at `https://speedcube-backend-xxx.onrender.com`

### Step 4: Deploy Frontend Static Site
1. **Dashboard** → **New** → **Static Site**  
2. **Connect same GitHub** repository
3. **Configure site**:
   - **Name**: `speedcube-frontend`
   - **Root Directory**: `apps/frontend`
   - **Build Command**:
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory**: `out` (or `dist` depending on Next.js config)

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_BACKEND_URL=<backend-url-from-step-3>
   ```

5. **Deploy** - Frontend will be available at `https://speedcube-frontend-xxx.onrender.com`

### Step 5: Update Backend Configuration
1. **Go to backend service** settings
2. **Update Environment Variables**:
   ```
   FRONTEND_URL=<frontend-url-from-step-4>
   ```
3. **Redeploy backend service**

### Step 6: Database Migration (Production)
1. **Go to backend service** dashboard
2. **Shell** tab (or Connect via SSH)
3. **Run migration**:
   ```bash
   npx prisma db push
   ```

---

## 🔒 Environment Variables Reference

### Backend (.env)
```bash
# Database connection
DATABASE_URL="postgresql://user:password@host:port/database"

# Security
JWT_SECRET="minimum-32-character-secret-key-for-jwt-tokens"

# Application
NODE_ENV="production"
PORT=5000

# CORS
FRONTEND_URL="https://your-frontend.onrender.com"
```

### Frontend (.env.local)
```bash
# API endpoint
NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
```

---

## 📝 Build Scripts Reference

### Backend Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev"
  }
}
```

### Frontend Scripts  
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 🎮 Application Features

### Core Functionality
- **User Registration/Login**: JWT-based authentication
- **Room Creation**: Generate 6-digit room codes
- **Real-time Racing**: Socket.IO synchronized competitions
- **Solve History**: Personal tracking and statistics
- **Responsive Design**: Mobile and desktop optimized

### Database Schema
```sql
-- Users table
Users: id, name, email, username, password, createdAt

-- Rooms table  
Rooms: id, name, code, ownerId, isActive, maxMembers, createdAt

-- Matches table
Matches: id, roomId, scramble, status, startedAt, endedAt, createdAt

-- Solves table
Solves: id, time, penalty, scramble, userId, matchId, createdAt
```

### API Endpoints
```
POST /api/auth/signup     - Register user
POST /api/auth/login      - Login user
POST /api/rooms/create    - Create room
POST /api/rooms/join      - Join room by code
GET  /api/rooms/my-rooms  - Get user's rooms
GET  /api/solve/history   - Get solve history
GET  /api/stats/personal  - Get statistics
```

---

## 🐛 Troubleshooting

### Development Issues
1. **Port conflicts**: Change PORT in backend .env
2. **Database connection**: Verify PostgreSQL is running
3. **Socket.IO CORS**: Check FRONTEND_URL configuration
4. **Prisma errors**: Run `npx prisma generate`

### Production Issues  
1. **Build failures**: Check Node.js version compatibility
2. **Database connection**: Verify DATABASE_URL format
3. **CORS errors**: Ensure FRONTEND_URL matches exactly
4. **Socket connection**: Check both URLs are HTTPS

### Debug Commands
```bash
# View database
npx prisma studio

# Reset database (development)
npx prisma db push --force-reset

# Check build locally
npm run build
npm start

# View logs (Render)
# Go to service → Logs tab
```

---

## 🔐 Security Considerations

### Development
- Use strong JWT secrets (32+ characters)
- Enable CORS for specific origins only
- Hash passwords with bcrypt
- Validate all inputs with Zod schemas

### Production
- Use environment variables for secrets
- Enable HTTPS only
- Implement rate limiting
- Monitor for unusual activity
- Regular dependency updates

---

## 📊 Performance Tips

### Backend Optimization
- **Connection Pooling**: Prisma handles automatically
- **Database Indexing**: Index frequently queried fields
- **Socket.IO Scaling**: Consider Redis adapter for high traffic

### Frontend Optimization  
- **Code Splitting**: Next.js handles automatically
- **Image Optimization**: Use Next.js Image component
- **Bundle Analysis**: Run `npm run analyze`

---

## 🚀 Going to Production

### Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] Database schema up to date
- [ ] CORS settings correct
- [ ] JWT secret is strong and unique
- [ ] Error handling implemented
- [ ] API rate limiting considered

### Post-deployment Testing
1. **User Registration**: Create test account
2. **Room Creation**: Test room creation/joining
3. **Multiplayer Race**: Test with multiple browsers
4. **Socket Connection**: Verify real-time updates
5. **Mobile Responsiveness**: Test on mobile devices

### Monitoring & Maintenance
- Monitor Render service logs
- Set up error alerting
- Regular dependency updates
- Database backup strategy
- Performance monitoring

---

## 📞 Support & Resources

### Documentation
- [Render.com Docs](https://render.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Socket.IO Documentation](https://socket.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)

### Common Commands
```bash
# Update dependencies
npm update

# Security audit
npm audit

# Database backup (production)
pg_dump $DATABASE_URL > backup.sql

# View active connections
netstat -an | grep :5000
```

---

**🎲 Your multiplayer cube timer is ready to deploy! Happy cubing!**
