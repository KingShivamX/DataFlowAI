# DataFlowAI Backend

This is the backend API for the DataFlowAI application, providing endpoints for data management, machine learning model training, and predictions.

## Setup

### Prerequisites

-   Node.js (v16+ recommended)
-   MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

-   Copy `env.example` to `.env`
-   Update MongoDB connection string with your cluster token

```bash
cp env.example .env
```

3. Start the development server:

```bash
npm run dev
```

## API Structure

The API is organized into the following directories:

-   `/api` - API server code
    -   `/config` - Configuration files
    -   `/middleware` - Express middleware
    -   `/models` - MongoDB schemas
    -   `/routes` - API route definitions
    -   `/utils` - Utility functions

## API Endpoints

### Data Management

-   `GET /api/data` - Get all datasets
-   `POST /api/data/upload` - Upload a new dataset
-   `GET /api/data/:id` - Get dataset by ID

### Model Management

-   `GET /api/models` - Get all models
-   `POST /api/models/create` - Create a new model
-   `GET /api/models/:id` - Get model by ID
-   `PUT /api/models/:id/train` - Train a model

### Predictions

-   `GET /api/predictions` - Get all predictions
-   `POST /api/predictions/create` - Make a new prediction
-   `GET /api/predictions/:id` - Get prediction by ID

## Environment Variables

-   `PORT` - Server port (default: 3001)
-   `NODE_ENV` - Environment (development, production)
-   `MONGODB_URI` - MongoDB connection string
-   `JWT_SECRET` - Secret for JWT authentication (when implemented)
-   `JWT_EXPIRE` - JWT token expiration time

## License

MIT
