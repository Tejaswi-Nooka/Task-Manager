#!/bin/bash

# Create main project directories
mkdir -p task-manager-monorepo
cd task-manager-monorepo

# Create frontend and backend directories
mkdir -p frontend backend

# Move current frontend files to frontend directory
mv ../src frontend/
mv ../public frontend/
mv ../package.json frontend/
mv ../package-lock.json frontend/ 2>/dev/null
mv ../node_modules frontend/ 2>/dev/null
mv ../.gitignore frontend/ 2>/dev/null
mv ../README.md frontend/README-frontend.md 2>/dev/null

# Create main README.md
echo "# Task Manager Full Stack Application

This is a full-stack task management application with a React frontend and FastAPI backend.

## Project Structure

- \`/frontend\` - React frontend application
- \`/backend\` - FastAPI backend application

## Getting Started

### Frontend
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

### Backend
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

## Features

- User authentication (register/login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter and sort tasks
- Responsive design
" > README.md

# Create .gitignore
echo "# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
ENV/

# Node
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# IDEs
.idea/
.vscode/
*.swp
*.swo

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
/frontend/build/
/frontend/dist/
/backend/dist/
" > .gitignore

echo "Setup complete! Please move your backend code to the 'backend' directory." 