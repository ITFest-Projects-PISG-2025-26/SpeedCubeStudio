# SpeedCube Studio - Render Deployment Guide

## Prerequisites
1. A Render account (https://render.com)
2. GitHub repository with your code
3. PostgreSQL database (will be created on Render)

## Deployment Steps

### 1. Database Setup
1. Go to Render Dashboard → New → PostgreSQL
2. Name: `speedcube-database`
3. Choose your plan (Free tier available)
4. Note down the connection details

### 2. Backend API Deployment
1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configuration:
   - **Name**: `speedcube-backend`
   - **Environment**: `Node`
   - **Build Command**:  
     `npm install && cd apps/backend && npm install && \  
     npm run build && npx prisma generate`
   - **Start Command**: `cd apps/backend && npm start`

#### Environment Variables for Backend:
```
NODE_ENV=production
PORT=4000
DATABASE_URL=[Your PostgreSQL connection string from step 1]
JWT_SECRET=[Generate a secure random string]
FRONTEND_URL=https://[your-frontend-url].onrender.com
```

### 3. Frontend Deployment
1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configuration:
   - **Name**: `speedcube-frontend`
   - **Environment**: `Node`
   - **Build Command**:  
     `npm install && cd apps/frontend && npm install && \  
     npm run build`
   - **Start Command**: `cd apps/frontend && npm start`

#### Environment Variables for Frontend:
```
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://[your-backend-url].onrender.com
NEXT_PUBLIC_SOCKET_URL=https://[your-backend-url].onrender.com
```

### 4. Database Migration
After backend deployment, you'll need to run the database migrations:
1. Go to your backend service on Render
2. Go to Shell tab
3. Run: `cd apps/backend && npx prisma db push`

## Important Notes

### Environment Variables
- Replace `[your-backend-url]` and `[your-frontend-url]` with actual Render URLs
- Generate a secure JWT_SECRET (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- The DATABASE_URL should be the External Database URL from your PostgreSQL service

### Auto-Deploy
- Render will automatically redeploy when you push to your main branch
- Make sure to update environment variables if you change service URLs

### Health Checks
- Backend includes a health check endpoint at `/api/health`
- Frontend will be monitored automatically by Render

## Troubleshooting

### Common Issues:
1. **Build failures**: Check that all dependencies are in package.json
2. **Database connection**: Ensure DATABASE_URL is correct and database is running
3. **CORS errors**: Verify FRONTEND_URL is set correctly in backend environment

### Logs:
- Check service logs in Render dashboard for debugging
- Use `console.log` statements for additional debugging (remove in production)

## Production Checklist
- [ ] Database created and accessible
- [ ] Backend service deployed and healthy
- [ ] Frontend service deployed and accessible
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] CORS configuration updated
- [ ] JWT secret is secure and not exposed
- [ ] All services are using HTTPS URLs

## Scaling
- Render free tier has limitations (service sleeps after 15 minutes of inactivity)
- Consider upgrading to paid plans for production use
- Monitor resource usage and optimize as needed
