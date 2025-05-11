# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack website for Widia consultancy with:
- React frontend with Tailwind CSS for styling and motion animations
- FastAPI backend with MongoDB database
- Nginx for serving static content and API proxying
- Docker for containerization and deployment

## Development Commands

### Frontend (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# Start development server
yarn start

# Run tests
yarn test

# Build for production
yarn build
```

### Backend (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn server:app --reload

# Run linting
flake8 .
black .
isort .

# Run type checking
mypy .

# Run tests
pytest
```

### Docker

```bash
# Build and run with Docker
docker build -t widia-website .
docker run -p 8080:8080 widia-website

# Running with environment variables
docker run -p 8080:8080 \
  -e MONGO_URL="mongodb://host.docker.internal:27017" \
  -e DB_NAME="test_database" \
  widia-website

# Note: host.docker.internal allows Docker to connect to MongoDB running on your host machine
```

## Architecture Overview

### Frontend Structure

- React application (v19) with React Router (v7)
- Animation libraries: Framer Motion, GSAP
- UI components in `frontend/src/components/`:
  - `ui/`: Reusable UI components (Button, GlassCard, etc.)
  - `layout/`: Layout-related components (Header, Footer, Layout)
  - `sections/`: Homepage sections (Hero, Services, etc.)
  - `animations/`: Animation components

### Backend Structure

- FastAPI with async endpoints
- MongoDB connection via Motor (async MongoDB driver)
- API endpoints under `/api` prefix
- Models defined using Pydantic

### Docker Setup

The project uses a multi-stage Docker build:
1. Stage 1: Build React frontend
2. Stage 2: Install Python backend
3. Stage 3: Final image with Nginx and Python

### Deployment Architecture

- Nginx serves static frontend files
- Nginx proxies API requests to the backend
- Backend runs with Uvicorn on port 8001
- Public-facing port is 8080