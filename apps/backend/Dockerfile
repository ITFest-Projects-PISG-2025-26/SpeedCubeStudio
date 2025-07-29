FROM node:18-alpine

WORKDIR /app

# Copy root package.json and install dependencies
COPY package.json ./
COPY turbo.json ./
RUN npm install

# Copy backend-specific files
COPY apps/backend ./apps/backend
COPY packages ./packages

# Install backend dependencies and build
WORKDIR /app/apps/backend
RUN npm install
RUN npx prisma generate
RUN npm run build

# Expose port
EXPOSE 4000

# Set environment
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
