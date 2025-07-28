# Multi-stage build for the monorepo
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy root package files
COPY package.json ./
COPY turbo.json ./

# Copy workspace package files
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN npm install

# Backend Build
FROM base AS backend-builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and build backend
WORKDIR /app/apps/backend
RUN npx prisma generate
RUN npm run build

# Frontend Build
FROM base AS frontend-builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build frontend
WORKDIR /app/apps/frontend
RUN npm run build

# Backend Production
FROM base AS backend
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

COPY --from=backend-builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=backend-builder /app/apps/backend/package.json ./apps/backend/
COPY --from=backend-builder /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=deps /app/node_modules ./node_modules

USER backend
EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "apps/backend/dist/server.js"]

# Frontend Production
FROM base AS frontend
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=frontend-builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=frontend-builder /app/apps/frontend/package.json ./apps/frontend/
COPY --from=frontend-builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=deps /app/node_modules ./node_modules

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start", "--prefix", "apps/frontend"]
