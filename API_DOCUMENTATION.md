# CRM API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Pass the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  },
  "message": "User registered successfully"
}
```

---

### Login
Authenticate with email and password.

**Endpoint:** `POST /auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  },
  "message": "Logged in successfully"
}
```

---

### Get Current User
Get authenticated user details. **PROTECTED**

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2023-01-15T10:30:00Z"
  }
}
```

---

## Leads Endpoints

All leads endpoints are **PROTECTED** - require JWT token.

### Get All Leads
Retrieve all leads.

**Endpoint:** `GET /leads`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phoneNumber": "+1-555-123-4567",
      "source": "website",
      "status": "new",
      "company": "Tech Corp",
      "notes": [],
      "lastContacted": null,
      "createdAt": "2023-01-15T10:30:00Z",
      "updatedAt": "2023-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Lead
Create a new lead (duplicate emails are not allowed).

**Endpoint:** `POST /leads`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phoneNumber": "+1-555-123-4567",
  "company": "Tech Corp",
  "source": "website"
}
```

**Valid Sources:** website, referral, social-media, email, other

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phoneNumber": "+1-555-123-4567",
    "source": "website",
    "status": "new",
    "company": "Tech Corp",
    "notes": [],
    "lastContacted": null,
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2023-01-15T10:30:00Z"
  },
  "message": "Lead created successfully"
}
```

---

### Get Single Lead
Retrieve a specific lead by ID.

**Endpoint:** `GET /leads/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phoneNumber": "+1-555-123-4567",
    "source": "website",
    "status": "new",
    "company": "Tech Corp",
    "notes": [],
    "lastContacted": null,
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2023-01-15T10:30:00Z"
  }
}
```

---

### Update Lead
Update lead information.

**Endpoint:** `PUT /leads/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:** (all fields optional)
```json
{
  "name": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "phoneNumber": "+1-555-987-6543",
  "company": "New Company",
  "source": "referral"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith Updated",
    "email": "jane.updated@example.com",
    "phoneNumber": "+1-555-987-6543",
    "source": "referral",
    "status": "new",
    "company": "New Company",
    "notes": [],
    "lastContacted": null,
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2023-01-15T11:00:00Z"
  },
  "message": "Lead updated successfully"
}
```

---

### Update Lead Status
Change the status of a lead.

**Endpoint:** `PUT /leads/:id/status`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "status": "contacted"
}
```

**Valid Statuses:** new, contacted, interested, converted, lost

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "contacted",
    "lastContacted": "2023-01-15T11:05:00Z",
    ...
  },
  "message": "Lead status updated successfully"
}
```

---

### Add Note to Lead
Add a note to a lead.

**Endpoint:** `PUT /leads/:id/notes`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "text": "Called client, very interested in our service."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "notes": [
      {
        "text": "Called client, very interested in our service.",
        "createdAt": "2023-01-15T11:10:00Z"
      }
    ],
    ...
  },
  "message": "Note added successfully"
}
```

---

### Delete Lead
Delete a lead permanently.

**Endpoint:** `DELETE /leads/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {},
  "message": "Lead deleted successfully"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Name and email are required"
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Lead not found"
}
```

### 409 - Conflict (Duplicate Email)
```json
{
  "success": false,
  "message": "Lead with this email already exists"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Lead
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Smith",
    "email":"jane@example.com",
    "company":"Tech Corp",
    "source":"website"
  }'
```

### Get All Leads
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Testing with Postman

1. Create a new collection
2. Add requests for each endpoint
3. After login, copy the token
4. Create an environment variable `token` with your JWT
5. Use `{{token}}` in Authorization header for all protected routes

---

## Response Format

All responses follow this format:
```json
{
  "success": true/false,
  "data": {...},
  "message": "...",
  "count": 0
}
```

---

## Rate Limiting
Currently not implemented. Consider adding for production use.

## Pagination
Currently not implemented. All leads are returned. Consider adding for large datasets.

---

For more information, see the main README.md file.
