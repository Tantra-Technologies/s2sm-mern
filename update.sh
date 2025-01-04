#!/bin/bash

# Define variables
REPO_DIR="./" # Path to your project directory
GIT_REPO="https://github.com/Tantra-Technologies/s2sm-mern.git" # Your GitHub repo URL
FRONTEND_DIR="/Soul2SoulMatrimony/frontend" # Path to the frontend directory
BACKEND_DIR="/Soul2SoulMatrimony/backend" # Path to the backend directory

# Step 1: Install PM2
echo "Installing PM2 globally..."
npm install -g pm2 || { echo "Failed to install PM2 globally."; exit 1; }

# Step 2: Pull the latest changes from GitHub
echo "Pulling the latest changes from GitHub..."
git reset --hard HEAD
git pull origin main || { echo "Failed to pull updates. Please check your network connection."; exit 1; }

# Step 3: Install dependencies and rebuild the frontend
echo "Installing frontend dependencies and rebuilding..."
cd $FRONTEND_DIR
npm install || { echo "Failed to install frontend dependencies."; exit 1; }
npm run build || { echo "Failed to build the frontend."; exit 1; }

# Step 4: Install dependencies and restart the backend server
echo "Installing backend dependencies and restarting the server..."
cd $BACKEND_DIR
npm install || { echo "Failed to install backend dependencies."; exit 1; }
pm2 restart all || pm2 start server.js --name "my-backend" || { echo "Failed to restart the backend server."; exit 1; }
pm2 startup || { echo "Failed to startup the backend server."; exit 1; }

echo "Update process completed successfully!"
