#!/bin/bash

# TaskIt Frontend EC2 Setup Script
# Run this script on your EC2 instance: i-0c2644a00e3b7ebfe
# Public IP: 13.53.134.0

set -e

echo "🚀 Setting up TaskIt Frontend on EC2 instance..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
echo -e "${YELLOW}📦 Installing Node.js 18.x...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"
echo -e "${GREEN}✅ npm version: $(npm --version)${NC}"

# Install PM2 globally
echo -e "${YELLOW}📦 Installing PM2 globally...${NC}"
sudo npm install -g pm2

# Install serve globally (for serving the built React app)
echo -e "${YELLOW}📦 Installing serve globally...${NC}"
sudo npm install -g serve

# Install Nginx
echo -e "${YELLOW}📦 Installing Nginx...${NC}"
sudo apt install nginx -y

# Create logs directory
echo -e "${YELLOW}📁 Creating logs directory...${NC}"
mkdir -p /home/ubuntu/logs

# Clone the repository (replace with your actual repository URL)
echo -e "${YELLOW}📥 Cloning TaskIt repository...${NC}"
cd /home/ubuntu
if [ ! -d "TaskIt" ]; then
    # Replace this with your actual repository URL
    echo -e "${RED}⚠️  Please clone your repository manually first:${NC}"
    echo -e "${BLUE}git clone https://github.com/yourusername/TaskIt.git${NC}"
    echo -e "${YELLOW}Then run this script again.${NC}"
    exit 1
fi

cd TaskIt

# Install dependencies
echo -e "${YELLOW}📦 Installing project dependencies...${NC}"
npm install

# Make deploy script executable
chmod +x deploy.sh

# Set up Nginx configuration
echo -e "${YELLOW}🔧 Setting up Nginx configuration...${NC}"
sudo cp nginx.conf.example /etc/nginx/sites-available/taskit-frontend

# Enable the site
sudo ln -sf /etc/nginx/sites-available/taskit-frontend /etc/nginx/sites-enabled/

# Remove default nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Set up PM2 startup
echo -e "${YELLOW}🔧 Setting up PM2 startup...${NC}"
pm2 startup

echo -e "${GREEN}🎉 EC2 setup completed successfully!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "${BLUE}1. Set up GitHub Secrets in your repository${NC}"
echo -e "${BLUE}2. Run: ./deploy.sh (for initial deployment)${NC}"
echo -e "${BLUE}3. Push to main branch to test automation${NC}"
echo -e "${BLUE}4. Your app will be available at: http://13.53.134.0${NC}"

echo -e "${YELLOW}📊 System Status:${NC}"
echo -e "Node.js: $(node --version)"
echo -e "npm: $(npm --version)"
echo -e "PM2: $(pm2 --version)"
echo -e "Nginx: $(nginx -v 2>&1)"
