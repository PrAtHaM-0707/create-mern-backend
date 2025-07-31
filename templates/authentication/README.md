Authentication MERN Backend
A MERN stack backend with JWT-based authentication.
Getting Started

Install dependencies:
npm install


Copy .env.example to .env and update MONGO_URI and JWT_SECRET.

Start the server:
npm start


For development:
npm run dev



Endpoints

POST /api/auth/register: Register a user (email, password).
POST /api/auth/login: Login and get JWT token.
GET /api/auth/me: Get authenticated user (requires Authorization: Bearer <token>).

Folder Structure

src/index.js: Main server file.
src/models/: Mongoose schemas.
src/controllers/: Request handlers.
src/routes/: API routes.
src/middleware/: Authentication middleware.
.env: Environment variables.
