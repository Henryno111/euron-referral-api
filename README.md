# Referral API Server

A RESTful API server for storing and managing referral codes for the Euron platform.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## Features

- Create and store user referral codes
- Create and store manager referral codes
- Limit of 10 referrals per code
- Prevent duplicate referral codes
- REST API with proper status codes
- MongoDB database integration

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containers**: Docker, Docker Compose
- **Testing**: Postman

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Docker and Docker Compose (optional, for containerization)
- MongoDB (v4.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/euron-referral-api.git
   cd euron-referral-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/referrals
   NODE_ENV=development
   ```

2. If you're using a different MongoDB setup, update the `MONGODB_URI` accordingly.

## Usage

### Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### API Endpoints

#### Health Check
- `GET /health` - Check if the server is running

#### Referral Endpoints
- `POST /` - Create a new referral code
  - Body: `{ "address": "0x123...", "ref_code": "Code123", "is_manager_code": false }`
- `GET /address/:address` - Get referral by wallet address
- `GET /code/:code` - Get referral by code (also increments referral count)

#### Manager Endpoints
- `POST /manager` - Create a new manager code
  - Body: `{ "address": "0x123...", "ref_code": "Mgr123" }`
- `GET /manager/address/:address` - Get manager by wallet address
- `GET /manager/code/:code` - Get manager by code (also increments referral count)

## Docker Setup

### Using Docker Compose

1. Start MongoDB container:
   ```bash
   docker-compose up -d mongo
   ```

2. Run the application with local Node:
   ```bash
   npm run dev
   ```

### Running Everything in Docker

```bash
docker-compose up -d
```

This will start both the API server and MongoDB.

## Testing with Postman

1. Import the provided Postman collection or create new requests
2. Test each endpoint:
   - Health check: `GET http://localhost:3001/health`
   - Create referral: `POST http://localhost:3001/`
   - Get referral by address: `GET http://localhost:3001/address/0x123...`
   - Get referral by code: `GET http://localhost:3001/code/Test123`

## Deployment

### Deploying to Render

1. Push your code to GitHub
2. Set up a new Web Service on Render:
   - Connect to your repository
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables

### Setting Up MongoDB Atlas for Production

1. Create a MongoDB Atlas account
2. Set up a free cluster
3. Configure network access
4. Update your MONGODB_URI in Render's environment variables

## Project Structure

```
euron-referral-api/
├── src/
│   ├── models/
│   │   └── referral.js
│   ├── routes/
│   │   ├── referrals.js
│   │   └── managers.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
