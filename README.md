# Mini ERP – Inventory & Sales Management System (Backend)

A RESTful API for the **Mini ERP – Inventory & Sales Management System** built with **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, and **JWT Authentication**.

## 🔗 Live API

https://classicit-inventory-api.vercel.app/

## 📖 API Documentation (Swagger)

https://classicit-inventory-api.vercel.app/api-docs

---

# Demo Credentials

Use the following accounts to test the API.

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@erp.com | Admin123@ |
| **Manager** | manager@erp.com | Manager123@ |
| **Employee** | employee1@erp.com | Employee123@ |

### Additional Employee Accounts

- employee2@erp.com
- employee3@erp.com
- employee4@erp.com
- employee5@erp.com
- employee6@erp.com
- employee7@erp.com
- employee8@erp.com

Password for all employee accounts:

```text
Employee123@
```

---

# Features

- JWT Authentication
- Role-Based Authorization
- Product Management
- Customer Management
- Sales Management
- Dashboard Statistics
- User Profile Management
- Avatar Upload (Cloudinary)
- Global Search
- Pagination
- Input Validation
- Global Error Handling
- Consistent API Response Structure

---

# Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Cloudinary
- Multer
- Express Validator

---

# Installation

## Clone Repository

```bash
git clone <BACKEND_GITHUB_REPOSITORY_URL>
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRES=7d

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

---

# Authentication

The API uses **JWT Bearer Authentication**.

Include the access token in the request header.

```http
Authorization: Bearer <your_access_token>
```

---

# Available Modules

- Authentication
- Products
- Customers
- Sales
- Dashboard
- Search
- Users

---

# Project Structure

```text
src
├── builders
├── config
├── constants
├── interfaces
├── middlewares
├── modules
├── routes
├── seed
├── services
├── types
├── utils
├── app.ts
└── server.ts
```

---

# Deployment

Backend API

https://classicit-inventory-api.vercel.app/

Swagger Documentation

https://classicit-inventory-api.vercel.app/api-docs

---

# Author

**Tarikul Islam**