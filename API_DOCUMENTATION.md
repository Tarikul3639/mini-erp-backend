# API Documentation

This document describes the available REST API endpoints for the **Mini ERP – Inventory & Sales Management System**.

## Base URLs

### Development

```text
http://localhost:5000/api/v1
```

### Production

```text
https://classicit-inventory-api.vercel.app/api/v1
```

---

# Authentication

The API uses **JWT Bearer Authentication**.

## Login

**POST**

```http
/auth/login
```

### Request

```json
{
  "email": "admin@erp.com",
  "password": "Admin123@"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "<JWT_TOKEN>",
    "user": {
      "id": "...",
      "name": "System Admin",
      "email": "admin@erp.com",
      "role": "ADMIN"
    }
  }
}
```

Use the returned token:

```text
Authorization: Bearer <token>
```

---

## Get Current User

**GET**

```http
/auth/me
```

Authentication Required.

---

## Change Password

**PATCH**

```http
/auth/change-password
```

Authentication Required.

Request

```json
{
  "currentPassword": "Admin123@",
  "newPassword": "NewPassword123@"
}
```

---

# Products

Authentication Required.

---

## Create Product

**POST**

```http
/products
```

Content-Type

```text
multipart/form-data
```

Fields

| Field | Type |
|--------|------|
| name | string |
| sku | string |
| category | string |
| purchasePrice | number |
| sellingPrice | number |
| stockQuantity | number |
| image | file |

---

## Get Products

**GET**

```http
/products
```

Query Parameters

| Parameter | Description |
|------------|-------------|
| page | Page number |
| limit | Items per page |
| search | Search by name or SKU |

Example

```http
/products?page=1&limit=10&search=laptop
```

---

## Get Product

**GET**

```http
/products/:id
```

Returns a single product.

---

## Update Product

**PATCH**

```http
/products/:id
```

multipart/form-data

Image upload is optional.

---

## Delete Product

**DELETE**

```http
/products/:id
```

Admin only.

---

# Customers

Authentication Required.

---

## Create Customer

**POST**

```http
/customers
```

Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01710000000",
  "address": "Dhaka"
}
```

---

## Get Customers

**GET**

```http
/customers
```

Query Parameters

| Parameter | Description |
|------------|-------------|
| page | Page number |
| limit | Items per page |
| search | Search by name, email or phone |

---

## Get Customer

**GET**

```http
/customers/:id
```

Returns a single customer.

---

## Update Customer

**PATCH**

```http
/customers/:id
```

Request

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "01710000000",
  "address": "Dhaka"
}
```

---

# Sales

Authentication Required.

---

## Create Sale

**POST**

```http
/sales
```

Request

```json
{
  "customer": "<customerId>",
  "products": [
    {
      "product": "<productId>",
      "quantity": 2
    }
  ]
}
```

### Business Rules

- Automatically reduces product stock.
- Prevents insufficient stock sales.
- Calculates grand total automatically.
- Stores sale history.

---

## Get Sales

**GET**

```http
/sales
```

Supports

- Pagination
- Search

---

## Get Sale Details

**GET**

```http
/sales/:id
```

---

## Delete Sale

**DELETE**

```http
/sales/:id
```

---

# Dashboard

Authentication Required.

## Get Dashboard Statistics

**GET**

```http
/dashboard
```

Returns

- Total Products
- Total Sales
- Low Stock Products
- Revenue Statistics
- Recent Sales
- Top Selling Products

---

# Search

Authentication Required.

## Global Search

**GET**

```http
/search?search=laptop
```

Searches across

- Products
- Customers
- Sales

---

# Users

Authentication Required.

---

## Get Profile

**GET**

```http
/users/profile
```

Returns current logged-in user's profile.

---

## Update Profile

**PATCH**

```http
/users/profile
```

Content-Type

```text
multipart/form-data
```

Fields

| Field | Type |
|--------|------|
| name | string |
| avatar | image |

---

# Roles & Permissions

| Module | Admin | Manager | Employee |
|---------|:----:|:------:|:--------:|
| Dashboard | ✅ | ✅ | ✅ |
| Products View | ✅ | ✅ | ✅ |
| Create Product | ✅ | ✅ | ❌ |
| Update Product | ✅ | ✅ | ❌ |
| Delete Product | ✅ | ❌ | ❌ |
| Customers View | ✅ | ✅ | ✅ |
| Create Customer | ✅ | ✅ | ❌ |
| Update Customer | ✅ | ✅ | ❌ |
| Sales | ✅ | ✅ | ✅ |
| Profile | ✅ | ✅ | ✅ |

---

# Standard API Response

## Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## Success with Pagination

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPage": 5
  },
  "data": []
}
```

---

## Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errorSources": []
}
```

---

# Swagger

Interactive Swagger documentation is available only in development mode.

Swagger UI

```text
http://localhost:5000/api-docs
```

OpenAPI JSON

```text
http://localhost:5000/api-docs.json
```