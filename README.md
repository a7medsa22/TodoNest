# 📝 Task Manager API (NestJS + Prisma + JWT)

## 📖 Overview
A complete **Task Management System** built with **NestJS**, **Prisma ORM**, and **PostgreSQL**.  
It includes full authentication, role-based access control, and advanced task management features.

---

## ✨ Features
### 🔐 Authentication & Authorization
- User signup & login with JWT authentication
- Password hashing (bcrypt)
- Role-based system: `USER`, `ADMIN`, `MODERATOR`
- Secure guards & custom decorators

### 📋 Task Management
- CRUD operations on personal tasks
- Task filtering by status & priority
- Due date management
- Task statistics (`/tasks/stats`)

### 👑 Admin Panel
- View all users’ tasks
- View tasks of a specific user
- Delete any task
- Analytics endpoint for overall insights

### 💎 Advanced
- Task priorities: `LOW`, `MEDIUM`, `HIGH`, `URGENT`
- Task statuses: `PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`
- Strong validation & TypeScript type-safety
- Clean architecture with NestJS best practices

---

## 🛠️ Tech Stack
- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Language**: TypeScript

---

## 📡 API Endpoints

**🚀 Auth

POST /auth/signup → Register new user

POST /auth/login → Login & get JWT

**🚀 Tasks

GET /tasks → Get my tasks

POST /tasks → Create new task

GET /tasks/stats → Get my tasks stats

GET /tasks/:id → Get single task

PATCH /tasks/:id → Update task

DELETE /tasks/:id → Delete task

**🚀 Admin

GET /tasks/admin/all-tasks → Get all users’ tasks

GET /tasks/admin/user/:id/tasks → Get specific user’s tasks

DELETE /tasks/admin/:taskId → Delete any task

GET /tasks/admin/analytics → General analytics
