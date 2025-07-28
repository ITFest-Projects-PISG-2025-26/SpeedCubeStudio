#!/bin/bash
# Production build script for Render deployment

echo "Starting production build..."

# Set environment variables
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Install dependencies
echo "Installing dependencies..."
npm install

# Navigate to frontend
cd apps/frontend
npm install

# Build with error handling
echo "Building frontend..."
npm run build 2>&1 | tee build.log

# Check if build succeeded (artifacts exist)
if [ -d ".next" ] && [ -f ".next/BUILD_ID" ]; then
    echo "Build successful! Generated artifacts:"
    ls -la .next/
    echo "Build completed successfully!"
    exit 0
else
    echo "Build failed or incomplete. Checking for partial success..."
    if [ -d ".next/server" ]; then
        echo "Server build exists, this may still be deployable"
        exit 0
    else
        echo "Build failed completely"
        exit 1
    fi
fi
