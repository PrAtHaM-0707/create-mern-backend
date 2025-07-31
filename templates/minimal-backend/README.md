Minimal MERN Backend
A simple MERN stack backend with Express and MongoDB.
Getting Started

Install dependencies:
npm install


Copy .env.example to .env and update MONGO_URI with your MongoDB connection string.

Start the server:
npm start


For development with hot reloading:
npm run dev



Endpoints

GET /api/health: Check if the server is running.

Folder Structure

src/index.js: Main server file with Express and MongoDB setup.
.env: Environment variables (copy from .env.example).
