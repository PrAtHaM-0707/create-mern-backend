REST API MERN Backend
A MERN stack backend with a RESTful API for user management.
Getting Started

Install dependencies:
npm install


Copy .env.example to .env and update MONGO_URI.

Start the server:
npm start


For development:
npm run dev



Endpoints

GET /api/users: Get all users.
POST /api/users: Create a user.
PUT /api/users/:id: Update a user.
DELETE /api/users/:id: Delete a user.

Folder Structure

src/index.js: Main server file.
src/models/: Mongoose schemas.
src/controllers/: Request handlers.
src/routes/: API routes.
.env: Environment variables.
