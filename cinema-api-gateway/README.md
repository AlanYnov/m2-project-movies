# API Gateway - Node.js Version 20

This Node.js API Gateway manages routing to backend services via defined API endpoints and pipelines.

## Configuration

- **Default Ports:**
  - HTTP Port: `5000`
  - Admin Port: `9876` (localhost)

## API Endpoints

- **Endpoints:**
  - Reservation API: `http://localhost:5000/api-reservation/<endpoint>`
  - User API: `http://localhost:5000/api-auth/<endpoint>`
  - Movies API: `http://localhost:5000/api-movie/<endpoint>`

## Installation & Usage

1. **Dependencies:**

   Install dependencies using npm:

   ```bash
   npm install
   ```

2. **Usage:**
   Starting the API Gateway (default port : 5000):
   
   ```bash
   npm start
   ```
