# Company Assignment - Backend REST API

## 📌 Overview

A secure Node.js backend API with Express, MySQL, and JWT authentication for product management.

## ✨ Features

- **User Authentication**
  - ✅ Register new users
  - ✅ Login with JWT tokens
  - 🔒 Protected routes
- **Product Management**
  - 🛒 Full CRUD operations
  - 📊 Fields: name, price, quantity
  - ⏱️ Automatic timestamps

## 🛠️ Technologies

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- MySQL 8.0+
- Git

### Installation

```bash
git clone https://github.com/jeyjenushan/CompanySubmissionBackend.git
cd CompanySubmissionBackend/BackEnd
npm install

Create .env file:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=company_db
JWT_SECRET=your_jwt_secret
PORT=3000

📂 Project Structure
BackEnd/
├── db/       # DB configuration
├── controllers/  # Business logic
├── middlewares/  # Auth middleware
├── models/       # Database models
├── routes/       # API endpoints
├── .env          # Environment variables
└── server.js        # Main application
```
