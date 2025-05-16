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

### Email Configuration

The contact form requires email configuration. You have two ways to configure it:

#### 1. Using .env File (Recommended)

Create a `.env` file in the backend directory using the provided `.env.example` template:

```bash
# Copy the example file
cp backend/.env.example backend/.env

# Edit the .env file with your actual credentials
nano backend/.env
```

#### 2. Using Environment Variables

Alternatively, set the following environment variables:

```bash
# Email settings
SMTP_SERVER=smtp.zoho.com   # SMTP server address
SMTP_PORT=587               # 587 for TLS, 465 for SSL
SMTP_USERNAME=contato@widia.io  # Email used to send messages
SMTP_PASSWORD=your_password     # Your Zoho email password

# Example with Docker
docker run -p 8080:8080 \
  -e MONGO_URL="mongodb://host.docker.internal:27017" \
  -e DB_NAME="test_database" \
  -e SMTP_SERVER="smtp.zoho.com" \
  -e SMTP_PORT=587 \
  -e SMTP_USERNAME="contato@widia.io" \
  -e SMTP_PASSWORD="your_password" \
  widia-website

# Example with Docker Compose (add to docker-compose.yml environment section)
# environment:
#   - MONGO_URL=mongodb://mongodb:27017
#   - DB_NAME=widia_db
#   - SMTP_SERVER=smtp.zoho.com
#   - SMTP_PORT=587
#   - SMTP_USERNAME=contato@widia.io
#   - SMTP_PASSWORD=your_password
```

**Note:** 
- When using port 465, the code will automatically use SSL instead of TLS
- The .env file is gitignored so your credentials won't be committed to the repository

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