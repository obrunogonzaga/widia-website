# Widia Website

Full-stack website for Widia consultancy.

## Running with Docker Compose

The easiest way to run the application is using Docker Compose:

```bash
# Start the application with MongoDB
docker-compose up

# Start in detached mode
docker-compose up -d

# Specify environment variables
MONGO_URL=mongodb://custom-host:27017 DB_NAME=custom_db docker-compose up

# Stop the application
docker-compose down

# Stop the application and remove volumes
docker-compose down -v
```

## Manual Setup

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

### Docker (Manual)

```bash
# Build and run with Docker
docker build -t widia-website .
docker run -p 8080:8080 widia-website

# Running with environment variables
docker run -p 8080:8080 \
  -e MONGO_URL="mongodb://host.docker.internal:27017" \
  -e DB_NAME="test_database" \
  widia-website
```