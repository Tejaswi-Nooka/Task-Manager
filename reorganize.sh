#!/bin/bash

# Create temporary directories
mkdir -p temp/frontend temp/backend

# Move frontend files
mv frontend/* temp/frontend/

# Move backend files
mv backend/task-manager-api/app/* temp/backend/
mv backend/task-manager-api/requirements.txt temp/backend/
mv backend/task-manager-api/README.md temp/backend/ 2>/dev/null

# Clean up old directories
rm -rf frontend backend

# Move files back to proper structure
mv temp/frontend frontend
mv temp/backend backend

# Clean up temp directory
rm -rf temp

# Create .env file from example
cp backend/.env.example backend/.env 2>/dev/null

echo "Project restructured successfully!" 