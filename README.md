# Task-Mangment-System
a task management system where users can organize and track their daily tasks Nodejs ITI Project
# 📝 Task Management System API

This project is a **Task Management System** built with **Express.js** and **MongoDB**. It allows users to manage daily tasks with features like categorization, prioritization, and reminders. Authentication is powered by JWT and supports Google login.

---

## 🚀 Features

- **User Authentication**
  - JWT-based secure login and registration
  - Google Login (Bonus)
- **Task Management**
  - Create, update, delete, and fetch tasks
  - Assign tasks to categories
  - Set task priorities: Low, Medium, High
  - Task status tracking: Pending, In Progress, Completed
  - Set due dates and reminders
- **Filtering & Searching**
  - Filter tasks by category, status, or priority
  - Search by title, description, or category
- **Activity Logs** (Bonus)
  - Tracks task changes per user
- **Server-Side Pagination**
- **Role-Based Access**
  - Admin and regular users
- **Code Quality**
  - Linted with ESLint
- **Documentation**
  - Swagger API docs available

---

## 🧱 Tech Stack

| Category    | Tech Used              |
|-------------|------------------------|
| Backend     | Node.js, Express.js    |
| Database    | MongoDB, Mongoose      |
| Auth        | JWT, bcrypt, Google OAuth |
| Tools       | dotenv, ESLint, Swagger |
| Docs        | Swagger UI, Postman    |

---

## 📁 Folder Structure

```bash
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── taskController.js     # Task CRUD logic
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT protection middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
├── index.js                      # App entry point
```
 API Endpoints Overview
Base URL: http://localhost:5000/api

🔐 Auth
POST /auth/register – Register new user

POST /auth/login – User login

GET /auth/google – Google OAuth login (bonus)

✅ Tasks
GET /tasks – Get paginated tasks (supports filters/search)

POST /tasks – Create new task

GET /tasks/:id – Get single task

PUT /tasks/:id – Update task

DELETE /tasks/:id – Delete task

🔍 Filters and Search
You can filter/search tasks using query parameters:
  GET /tasks?status=Pending&priority=High&category=Work&search=meeting&page=1&limit=10

🔐 Auth & Roles
JWT is required for accessing all /tasks routes.

Token must be passed in the Authorization: Bearer <token> header.

Role-based access is implemented (e.g., admin users can manage all users/tasks).

📑 API Documentation
Swagger UI
Visit: http://localhost:5000/api-docs
Implemented using swagger-ui-express.

Postman Collection
Find the collection in the docs/TaskManager.postman_collection.json file.

🔧 Setup Instructions
# 1. Clone the repo
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api/backend

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env
# Fill in .env with MongoDB URI, JWT secret, Google Client ID/Secret, etc.

# 4. Run the server
npm run dev
🔑 .env Example
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
✅ Todo & Bonus
 CRUD for Tasks

 User Auth with JWT

 Server-side pagination

 Filtering & searching

 Task activity logs (bonus)

 Google login integration (bonus)

 Swagger documentation

 ESLint for code quality
