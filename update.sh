#!/bin/bash

# Define variables
REPO_DIR="./" # Path to your project directory
GIT_REPO="https://github.com/Tantra-Technologies/s2sm-mern.git" # Your GitHub repo URL
FRONTEND_DIR="/Soul2SoulMatrimony/frontend" # Path to the frontend directory
BACKEND_DIR="/Soul2SoulMatrimony/backend" # Path to the backend directory

# Step 1: Pull the latest changes from GitHub
echo "Pulling the latest changes from GitHub..."
# cd $REPO_DIR
git reset --hard HEAD
git pull origin main || { echo "Failed to pull updates. Please check your network connection."; exit 1; }

# Step 2: Rebuild the frontend
echo "Rebuilding the frontend..."
cd $FRONTEND_DIR
npm install || { echo "Failed to install frontend dependencies."; exit 1; }
npm run build || { echo "Failed to build the frontend."; exit 1; }

# Step 3: Restart the backend server using PM2
echo "Restarting the backend server..."
cd $BACKEND_DIR
npm install || { echo "Failed to install backend dependencies."; exit 1; }
pm2 restart all || pm2 start server.js --name "my-backend" || { echo "Failed to restart the backend server."; exit 1; }

echo "Update process completed successfully!"
