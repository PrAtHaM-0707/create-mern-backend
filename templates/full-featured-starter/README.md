Full-Featured MERN Backend
A production-ready MERN stack backend with REST API, authentication, logging, and testing.
Getting Started

Install dependencies:
npm install


Copy .env.example to .env and update MONGO_URI and JWT_SECRET.

Start the server:
npm start


For development:
npm run dev


Run tests:
npm test



Endpoints

POST /api/auth/register: Register a user (email, password, name).
POST /api/auth/login: Login and get JWT token.
GET /api/users: Get all users (requires token).
POST /api/users: Create a user (requires token).

Folder Structure

src/index.js: Main server file.
src/models/: Mongoose schemas.
src/controllers/: Request handlers.
src/routes/: API routes.
src/middleware/: Authentication middleware.
src/utils/: Logger utility.
src/__tests__/: Test files.
.env: Environment variables.
logs/: Log files.
