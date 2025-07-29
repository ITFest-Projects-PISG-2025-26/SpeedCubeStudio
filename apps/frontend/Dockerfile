FROM node:18-alpine

WORKDIR /app

# Copy root package.json and install dependencies
COPY package.json ./
COPY turbo.json ./
RUN npm install

# Copy frontend-specific files
COPY apps/frontend ./apps/frontend
COPY packages ./packages

# Install frontend dependencies and build
WORKDIR /app/apps/frontend
RUN npm install
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
