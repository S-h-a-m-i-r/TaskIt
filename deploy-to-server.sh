#!/bin/bash

# TaskIt Frontend Deployment Script
# This script builds the frontend and copies it to TaskAway server

set -e  # Exit on any error

echo "🚀 Starting TaskIt Frontend Deployment to TaskAway Server..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
TASKIT_DIR="/home/ubuntu/TaskIt"
TASKAWAY_SERVER_DIR="/home/ubuntu/TaskAwayServer"

# Navigate to TaskIt directory
cd $TASKIT_DIR

echo -e "${YELLOW}📁 Current directory: $(pwd)${NC}"

# Pull latest changes from main branch
echo -e "${YELLOW}📥 Pulling latest changes from main branch...${NC}"
git fetch origin
git reset --hard origin/main

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
echo -e "${YELLOW}🔍 Node.js version: $(node --version)${NC}"
echo -e "${YELLOW}🔍 npm version: $(npm --version)${NC}"
npm ci

# Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Copy dist folder to TaskAway server
echo -e "${YELLOW}📋 Copying dist folder to TaskAway server...${NC}"
cp -r dist/ $TASKAWAY_SERVER_DIR/

# Navigate to TaskAway server directory
cd $TASKAWAY_SERVER_DIR

# Pull latest changes for TaskAway server
echo -e "${YELLOW}📥 Pulling latest changes for TaskAway server...${NC}"
git pull origin main

# Restart PM2 processes
echo -e "${YELLOW}🔄 Restarting PM2 processes...${NC}"
pm2 restart all

# Save PM2 configuration
pm2 save

# Show PM2 status
echo -e "${GREEN}📊 PM2 Status:${NC}"
pm2 status

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your application should be running on your TaskAway server${NC}"
