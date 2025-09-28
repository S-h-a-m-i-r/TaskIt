#!/bin/bash

# TaskIt Frontend Deployment Script
# This script should be run on your EC2 instance

set -e  # Exit on any error

echo "🚀 Starting TaskIt Frontend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/home/ubuntu/TaskIt"
LOG_DIR="/home/ubuntu/logs"
PM2_APP_NAME="taskit-frontend"

# Create logs directory if it doesn't exist
mkdir -p $LOG_DIR

# Navigate to project directory
cd $PROJECT_DIR

echo -e "${YELLOW}📁 Current directory: $(pwd)${NC}"

# Pull latest changes from main branch
echo -e "${YELLOW}📥 Pulling latest changes from main branch...${NC}"
git fetch origin
git reset --hard origin/main

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production=false

# Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Install serve globally if not already installed
if ! command -v serve &> /dev/null; then
    echo -e "${YELLOW}📦 Installing serve globally...${NC}"
    npm install -g serve
fi

# Stop existing PM2 process if running
echo -e "${YELLOW}🛑 Stopping existing PM2 process...${NC}"
pm2 stop $PM2_APP_NAME 2>/dev/null || echo "No existing process to stop"

# Start/restart the application with PM2
echo -e "${YELLOW}🚀 Starting application with PM2...${NC}"
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Show PM2 status
echo -e "${GREEN}📊 PM2 Status:${NC}"
pm2 status

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your application should be running on port 3000${NC}"
