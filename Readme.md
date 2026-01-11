# 📝 Memo App – BackendDeveloper Intern Assignment

## 📌 Project Overview

This project is a **secure, role-based Memo Application**built as part of a **Backend Developer Intern assignment**.

The goal of the assignment was to design and implement**custom backend APIs** with authentication, role-based access control, CRUDfunctionality, and API documentation, along with a **basic frontend UI** todemonstrate API usage.

The application allows:

- Users to register, log in, and manage their own memos

- Admins to view all users and memos in a read-only manner

The project focuses on **security, scalability, and cleanbackend architecture** rather than UI complexity.

---

## 🛠️ Tech Stack

### Backend

- **Node.js**

- **Express.js**

- **MongoDB**

- **Mongoose**

- **JWT (JSON Web Tokens)** – Authentication

- **bcrypt** – Password hashing

- **Swagger (swagger-jsdoc, swagger-ui-express)** – APIdocumentation

- **cors** – Cross-origin request handling

### Frontend

- **HTML**

- **CSS**

- **Vanilla JavaScript**

### Tools

- **Swagger UI** – API testing & documentation

- **Thunder Client / Browser Fetch API** – API testing

- **MongoDB Compass / Atlas** – Database management

---

## ✨ Features

### 👤 User Features

- User signup & login

- Secure password hashing using bcrypt

- JWT-based authentication

- Create memos

- View only own memos

- Delete own memos

- Protected API routes

### 👮 Admin Features

- Admin login (role assigned at database level)

- View all registered users (username, email, role only)

- View all memos across the system (read-only)

- Strict role-based access control (RBAC)

> ⚠️ Admin accounts **cannot becreated via frontend signup** for security reasons.

---

## 🔐 Authentication &Authorization

- Passwords are hashed using **bcrypt**

- JWT tokens are generated on login

- All protected routes require a valid JWT

- User role (`user` or `admin`) is embedded in the JWT

- Role-based access is enforced using middleware

---

## ▶️ How to Run the Project

### 1️⃣ Clone the Repository

git clone

cd backend

**2️⃣ Install Dependencies**

npm install

**3️⃣ Configure EnvironmentVariables**

Create a .env file in the backend root:

PORT=3000

MONGO_URI=mongodb://127.0.0.1:27017/memo_app

JWT_ACCESS_SECRET=your_secret_key

NODE_ENV=development

**4️⃣ Start the Backend**

npm run dev

Backend runs at:

http://localhost:3000

**📄 API Documentation(Swagger)**

Swagger UI is available at:

http://localhost:3000/docs

Swagger provides:

*   Complete API documentation
    

*   Interactive API testing
    

*   JWT authorization support
    

All authentication, memo, and admin APIs are documented andtestable.

**🌐 Frontend Usage**

2.  Open the frontend/ folder in VS Code
    

4.  Right-click index.html
    

6.  Select **Open with Live Server**
    

The frontend communicates with the backend APIs using fetch.

**👮 Admin Setup**

Admins are **not created via frontend signup**.

**To create an admin:**

2.  Sign up a normal user
    

4.  Open MongoDB (Compass / Atlas)
    

6.  Update the user document:
    

{

  "role":"admin"

}

2.  Login using admin credentials
    

4.  Access admin functionality via:
    

**🧪 API Testing**

All APIs were tested using **Swagger UI**.

**Tested scenarios include:**

*   User signup and login
    

*   JWT token generation
    

*   Access to protected routes
    

*   Memo CRUD operations
    

*   Ownership enforcement
    

*   Admin-only route protection
    

**🔐 Security Considerations**

*   Password hashing using bcrypt
    

*   JWT-based stateless authentication
    

*   Role-based access control enforced on backend
    

*   Admin privileges cannot be escalated from frontend
    

*   Centralized error handling middleware
    

**🚀 Scalability Notes**

The application is designed with scalability in mind:

*   Modular architecture allows easy separation into microservices
    

*   Stateless JWT authentication supports horizontal scaling
    

*   MongoDB supports large-scale data storage
    

*   Middleware-based authorization simplifies future extensions
    

*   Can be extended with caching (Redis) and load balancing
    

*   Docker-ready backend structure
    

**📌 Assignment DeliverablesCoverage**

*   ✔ Backend project hosted on GitHub with README
    

*   ✔ Custom authentication & CRUD APIs
    

*   ✔ Basic frontend UI connected to APIs
    

*   ✔ API documentation using Swagger
    

*   ✔ Scalability considerations documented
    

**📬 Submission Notes**

This project was completed as part of a **Backend DeveloperIntern assignment** and demonstrates practical backend development skills,secure API design, and role-based access control.

**👨‍💻 Author**

**Prashant Choudhary**
