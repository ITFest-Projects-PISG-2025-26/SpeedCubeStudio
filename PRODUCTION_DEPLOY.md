# SpeedCube Studio - Production Deployment

## Quick Deploy on Render

### 1. Prerequisites
- Fork/Clone this repository to your GitHub account
- Create a Render account at https://render.com

### 2. One-Click Deploy (Recommended)

Click the button below to deploy both services at once:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/YOUR_USERNAME/SpeedCubeStudio)

### 3. Manual Deployment

#### Step 1: Deploy Database
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "PostgreSQL"
3. Configure:
   - **Name**: `speedcube-database`
   - **Plan**: Choose your preferred plan
4. Click "Create Database"
5. **Save the connection details** - you'll need them later

#### Step 2: Deploy Backend API
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `speedcube-backend`
   - **Environment**: `Node`
   - **Root Directory**: Leave empty (monorepo setup)
   - **Build Command**: 
     ```
     npm install && cd apps/backend && npm install && npx prisma generate && npm run build
     ```
   - **Start Command**: 
     ```
     cd apps/backend && npm start
     ```

4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=4000
   DATABASE_URL=[Your PostgreSQL External Database URL]
   JWT_SECRET=[Generate a secure random string]
   FRONTEND_URL=https://[your-frontend-service-name].onrender.com
   ```

5. Click "Create Web Service"

#### Step 3: Deploy Frontend
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `speedcube-frontend`
   - **Environment**: `Node`
   - **Root Directory**: Leave empty
   - **Build Command**: 
     ```
     npm install && cd apps/frontend && npm install && npm run build
     ```
   - **Start Command**: 
     ```
     cd apps/frontend && npm start
     ```

4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=3000
   NEXT_PUBLIC_API_URL=https://[your-backend-service-name].onrender.com
   NEXT_PUBLIC_SOCKET_URL=https://[your-backend-service-name].onrender.com
   ```

5. Click "Create Web Service"

#### Step 4: Initialize Database
1. Once backend is deployed, go to your backend service
2. Click on "Shell" tab
3. Run: `cd apps/backend && npx prisma db push`

### Alternative Build Commands (If Turbo Issues)

If you encounter "turbo: not found" errors, use these alternative build commands:

#### Backend Build Command:
```
npm install && cd apps/backend && npm install && npx prisma generate && npm run build
```

#### Frontend Build Command:
```
npm install && cd apps/frontend && npm install && npm run build
```

### Environment Variables Guide

#### Backend Environment Variables:
- `NODE_ENV`: Set to `production`
- `PORT`: Set to `4000`
- `DATABASE_URL`: Full PostgreSQL connection URL from your database service
- `JWT_SECRET`: Generate using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `FRONTEND_URL`: Your frontend service URL (for CORS)

#### Frontend Environment Variables:
- `NODE_ENV`: Set to `production`
- `PORT`: Set to `3000`
- `NEXT_PUBLIC_API_URL`: Your backend service URL
- `NEXT_PUBLIC_SOCKET_URL`: Your backend service URL (same as API URL)

### Troubleshooting

#### Common Issues:

1. **Build Fails**
   - Check that all dependencies are properly installed
   - Verify the build commands are correct
   - Check build logs for specific errors
   - **TypeScript errors**: Ensure all types are properly imported (common issue with Prisma types)
   - **Turbo not found**: If using monorepo, ensure turbo is in dependencies (not devDependencies)
   - **Alternative**: Use direct build commands instead of turbo for production

2. **Database Connection Issues**
   - Verify DATABASE_URL is correctly formatted
   - Ensure database service is running
   - Check if database migrations were applied

3. **CORS Errors**
   - Verify FRONTEND_URL is set correctly in backend
   - Ensure frontend is trying to connect to correct backend URL

4. **Socket Connection Issues**
   - Verify NEXT_PUBLIC_SOCKET_URL matches your backend URL
   - Check if WebSocket connections are allowed

5. **Dependency Issues**
   - Run `npm audit fix` to address security vulnerabilities
   - Ensure all workspace dependencies are correctly installed

#### Checking Logs:
- Go to your service in Render dashboard
- Click on "Logs" tab to see real-time logs
- Look for error messages and warnings

### Production Checklist

- [ ] Database deployed and accessible
- [ ] Backend service deployed with correct environment variables
- [ ] Frontend service deployed with correct environment variables
- [ ] Database migrations applied (`npx prisma db push`)
- [ ] Health check endpoint responding (`/api/health`)
- [ ] CORS configured correctly
- [ ] Socket.IO connections working
- [ ] JWT authentication working
- [ ] All environment variables are secure (no hardcoded secrets)

### Performance Considerations

1. **Free Tier Limitations**:
   - Services sleep after 15 minutes of inactivity
   - Database has connection limits
   - Consider upgrading for production use

2. **Optimization**:
   - Enable gzip compression
   - Implement caching strategies
   - Monitor resource usage

### Monitoring

- Use Render's built-in monitoring
- Set up health checks
- Monitor database performance
- Track API response times

### Scaling

When you're ready to scale:
- Upgrade to paid Render plans
- Consider Redis for session storage
- Implement database connection pooling
- Add load balancing if needed

### Render-Specific Tips

1. **Build Process**:
   - Render uses Node.js 22.16.0 by default
   - Build timeout is 15 minutes for free tier
   - Use `npm ci` instead of `npm install` for faster builds

2. **Environment Variables**:
   - Set all required environment variables before first deploy
   - Use Render's secret management for sensitive data
   - Environment variables are available during build and runtime

3. **Health Checks**:
   - Backend includes `/api/health` endpoint
   - Render automatically monitors service health
   - Services restart automatically if they become unresponsive

4. **Logs and Debugging**:
   - Access real-time logs in Render dashboard
   - Use `console.log` for debugging (remove in production)
   - Set up log retention for production apps

---

Need help? Check the detailed deployment guide in `RENDER_DEPLOYMENT.md` or open an issue in the repository.
