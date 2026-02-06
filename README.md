# 🎨 The Messy Brush

A full-stack art marketplace where users can browse and purchase artwork, and administrators can manage art listings. Built with **React + TypeScript** on the frontend and **Node.js, Express, Sequelize, and JWT authentication** on the backend.

---

## 📌 Project Overview

**The Messy Brush** is a lightweight art marketplace inspired by platforms like Etsy. The application allows:

* Visitors to browse art items for sale
* Users to create an account and log in
* Authenticated users to purchase art items
* Admin users to create, edit, and delete art listings

The project demonstrates full-stack development concepts including authentication, authorization, relational data modeling, protected API routes, and client–server integration.

This project was built as part of **Project 1 — Full-Stack Application**.

---

## 🧠 Learning Goals

* Build a RESTful API using **Express + TypeScript**
* Define relational data models using **Sequelize ORM**
* Implement **JWT-based authentication and authorization**
* Create a **React + TypeScript** frontend using Vite
* Manage authenticated state with a client-side Auth Context
* Collaborate effectively using **Git and GitHub** (feature branches, pull requests, reviews)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express
* TypeScript
* Sequelize ORM
* SQLite (local development)
* bcrypt (password hashing)
* jsonwebtoken (JWT authentication)

### Frontend

* React
* TypeScript
* Vite
* React Router
* Fetch API

---

## 🗂️ Data Models

### User

Represents registered users and administrators.

Fields:

* `id`
* `username`
* `email`
* `password` (hashed)
* `role` (`user` or `admin`)
* `createdAt`
* `updatedAt`

---

### ArtItem (Primary Content)

Represents an artwork available for sale.

Fields:

* `id`
* `title`
* `description`
* `price`
* `imageUrl`
* `userId` (admin who created the item)
* `createdAt`
* `updatedAt`

---

### Purchase (Secondary Content)

Represents a user purchasing an art item.

Fields:

* `id`
* `userId`
* `artItemId`
* `createdAt`

> ⚠️ Note: No real payment processing is implemented. A purchase simply records the relationship between a user and an art item.

---

## 🔗 Model Associations

* User hasMany ArtItems
* ArtItem belongsTo User
* User hasMany Purchases
* Purchase belongsTo User
* ArtItem hasMany Purchases
* Purchase belongsTo ArtItem

---

## 🔐 Authentication & Authorization

* Users can register and log in using email and password
* Passwords are securely hashed with **bcrypt**
* Upon login, a **JWT token** is returned
* JWT tokens are stored on the client and sent with protected requests
* Protected routes verify the token and attach user information to the request

### Authorization Rules

| Action           | Permission          |
| ---------------- | ------------------- |
| View art items   | Public              |
| Register / Login | Public              |
| Purchase art     | Authenticated users |
| Create art       | Admin only          |
| Edit/Delete art  | Admin only          |

---

## 📡 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

---

### Art Items

```
GET    /api/art
GET    /api/art/:id
POST   /api/art            (admin only)
PUT    /api/art/:id        (admin only)
DELETE /api/art/:id        (admin only)
```

---

### Purchases

```
POST /api/purchases/:artItemId    (authenticated)
GET  /api/users/me/purchases      (authenticated)
```

---

## 🖥️ Frontend Pages

* `/` — Home page displaying all art items
* `/login` — User login page
* `/register` — User registration page
* `/art/:id` — Art detail page
* `/my-purchases` — Logged-in user’s purchases

### UI Behavior

* Login/Register buttons shown when logged out
* Logout button shown when logged in
* Purchase buttons require authentication
* Admin users see options to add/edit/delete art

---

## 🧪 Demo Flow

1. Visit the home page and browse art (logged out)
2. Attempt to purchase art → redirected to login
3. Register a new user and log in
4. Purchase an art item
5. Log out
6. Log in as admin
7. Create, edit, and delete art items
8. Log in as a normal user and verify admin-only actions are blocked

---

## 🏃‍♂️ Running the Project Locally

### Prerequisites

* Node.js (v18+ recommended)
* npm

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend uses SQLite and `sequelize.sync()` so no database setup is required.

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
TheMessyBrush/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── index.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── auth/
│   │   └── main.tsx
│   └── package.json
└── README.md
```

---

## 👥 Team Members & Contributions

* **Member 1** — Authentication, User model, JWT middleware
* **Member 2** — ArtItem model, CRUD routes, admin authorization
* **Member 3** — Purchase model, frontend auth context, documentation

All features were developed using feature branches and merged via pull requests.

---

## 🌱 Stretch Features Implemented

* Admin role-based authorization
* Purchase history for users

---

## 🚀 Future Improvements

* Add search and filtering for art items
* Add categories or tags
* Pagination for large art lists
* User profiles
* Deploy with PostgreSQL

---

## 📜 License

This project is for educational purposes only.
