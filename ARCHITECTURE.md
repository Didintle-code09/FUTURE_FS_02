# CRM Application Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         REACT FRONTEND                           │
│                   (http://localhost:3000)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Dashboard  │  │   LoginForm  │  │ RegisterForm │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│         │                 │                  │                   │
│  ┌──────────────────────────────────────────────────┐           │
│  │         LeadCard, LeadForm Components            │           │
│  └──────────────────────────────────────────────────┘           │
│         │         │         │         │                         │
│  ┌─────────────────────────────────────────┐                   │
│  │    API Service Layer (axios)            │                   │
│  │  - authAPI (register, login, getMe)     │                   │
│  │  - leadsAPI (CRUD operations)           │                   │
│  └─────────────────────────────────────────┘                   │
│         │                                                        │
│  ┌─────────────────────────────────────────┐                   │
│  │    localStorage (JWT Token)             │                   │
│  └─────────────────────────────────────────┘                   │
└──────────────┬───────────────────────────────────────────────────┘
               │ HTTP/REST with JWT Token
               │ (Authorization: Bearer <token>)
               │
┌──────────────▼───────────────────────────────────────────────────┐
│                    EXPRESS.JS BACKEND                            │
│                   (http://localhost:5000)                        │
├─────────────────────────────────────────────────────────────────┤
│
│  ┌────────────────────────────────────────────┐
│  │        Express Middleware                   │
│  │ - JSON Parser                              │
│  │ - CORS                                     │
│  │ - JWT Verification                        │
│  └────────────────────────────────────────────┘
│                    │
│  ┌────────────────▼───────────────────────────┐
│  │        Express Routes                      │
│  │ ┌──────────────────────────────────────┐   │
│  │ │ /api/auth                            │   │
│  │ │  - POST /register                    │   │
│  │ │  - POST /login                       │   │
│  │ │  - GET /me (protected)               │   │
│  │ └──────────────────────────────────────┘   │
│  │ ┌──────────────────────────────────────┐   │
│  │ │ /api/leads (all protected)           │   │
│  │ │  - GET / (all leads)                 │   │
│  │ │  - POST / (create)                   │   │
│  │ │  - GET /:id (single)                 │   │
│  │ │  - PUT /:id (update)                 │   │
│  │ │  - PUT /:id/status (update status)   │   │
│  │ │  - PUT /:id/notes (add note)         │   │
│  │ │  - DELETE /:id (delete)              │   │
│  │ └──────────────────────────────────────┘   │
│  └────────────────┬───────────────────────────┘
│                   │
│  ┌────────────────▼───────────────────────────┐
│  │        Controllers                         │
│  │ ┌──────────────────────────────────────┐   │
│  │ │ authController                       │   │
│  │ │ - register()                         │   │
│  │ │ - login()                            │   │
│  │ │ - getMe()                            │   │
│  │ └──────────────────────────────────────┘   │
│  │ ┌──────────────────────────────────────┐   │
│  │ │ leadController                       │   │
│  │ │ - getAllLeads()                      │   │
│  │ │ - getLead()                          │   │
│  │ │ - createLead()                       │   │
│  │ │ - updateLead()                       │   │
│  │ │ - updateLeadStatus()                 │   │
│  │ │ - addNote()                          │   │
│  │ │ - deleteLead()                       │   │
│  │ └──────────────────────────────────────┘   │
│  └────────────────┬───────────────────────────┘
│                   │
│  ┌────────────────▼───────────────────────────┐
│  │        Mongoose Models                     │
│  │ ┌──────────────────────────────────────┐   │
│  │ │ User                                 │   │
│  │ │ - username (unique)                  │   │
│  │ │ - email (unique)                     │   │
│  │ │ - password (hashed)                  │   │
│  │ │ - role                               │   │
│  │ └──────────────────────────────────────┘   │
│  │ ┌──────────────────────────────────────┐   │
│  │ │ Lead                                 │   │
│  │ │ - name                               │   │
│  │ │ - email (unique)                     │   │
│  │ │ - phoneNumber                        │   │
│  │ │ - company                            │   │
│  │ │ - source                             │   │
│  │ │ - status                             │   │
│  │ │ - notes (array)                      │   │
│  │ │ - lastContacted                      │   │
│  │ └──────────────────────────────────────┘   │
│  └────────────────┬───────────────────────────┘
│                   │
└───────────────────┼─────────────────────────────┘
                    │ MongoDB Queries
                    │
┌───────────────────▼─────────────────────────────┐
│              MONGODB DATABASE                   │
│          (mongodb://localhost:27017)            │
├─────────────────────────────────────────────────┤
│ ┌──────────────────┐    ┌──────────────────┐    │
│ │  users           │    │  leads           │    │
│ │ ─────────────    │    │ ─────────────    │    │
│ │ _id              │    │ _id              │    │
│ │ username         │    │ name             │    │
│ │ email            │    │ email            │    │
│ │ password         │    │ phoneNumber      │    │
│ │ role             │    │ company          │    │
│ │ createdAt        │    │ source           │    │
│ │ updatedAt        │    │ status           │    │
│ │                  │    │ notes[]          │    │
│ │                  │    │ lastContacted    │    │
│ │                  │    │ createdAt        │    │
│ │                  │    │ updatedAt        │    │
│ └──────────────────┘    └──────────────────┘    │
└─────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
USER INTERACTION
       │
       ▼
┌─────────────────────┐
│  React Component    │
│  (Dashboard, etc)   │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────┐
│  Event Handler       │
│  (onClick, onSubmit) │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  API Service Call                    │
│  axios.post/get/put/delete           │
│  + JWT Token (from localStorage)     │
└──────┬───────────────────────────────┘
       │ HTTP Request
       │
       ▼
┌──────────────────────────────────────┐
│  Express Route Handler               │
│  (GET /api/leads, POST /api/leads)   │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  JWT Verification Middleware         │
│  (Check token validity)              │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Controller Function                 │
│  (getAllLeads, createLead, etc)      │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Input Validation                    │
│  (Check required fields, formats)    │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Mongoose Model Operation            │
│  (Lead.find, Lead.create, etc)       │
└──────┬───────────────────────────────┘
       │ MongoDB Query
       │
       ▼
┌──────────────────────────────────────┐
│  MongoDB Database                    │
│  (Find, Insert, Update, Delete)      │
└──────┬───────────────────────────────┘
       │ Result Data
       │
       ▼
┌──────────────────────────────────────┐
│  Response Object                     │
│  {success, data, message}            │
└──────┬───────────────────────────────┘
       │ HTTP Response (JSON)
       │
       ▼
┌──────────────────────────────────────┐
│  Frontend receives response          │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Update State (useState)             │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Component Re-renders                │
└──────┬───────────────────────────────┘
       │
       ▼
USER SEES UPDATES
```

---

## Authentication Flow

```
REGISTRATION/LOGIN
       │
       ▼
┌──────────────────────────────────────┐
│  User Submits Form                   │
│  (email, password)                   │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  POST /api/auth/login                │
│  or /api/auth/register               │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Backend Validation                  │
└──────┬───────────────────────────────┘
       │
       ├─► Check if email exists       ◀─ FAILURE
       │                               (409 Conflict)
       ▼
┌──────────────────────────────────────┐
│  Hash Password (bcryptjs)            │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Save User to MongoDB                │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Generate JWT Token                  │
│  (expires in 7 days)                 │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Return Token + User Data            │
│  {success, token, user}              │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│  Frontend stores Token               │
│  localStorage.setItem('token', ...)  │
└──────┬───────────────────────────────┘
       │
       ▼
USER IS AUTHENTICATED
(Can now access protected routes)
```

---

## Component Hierarchy

```
App
├── navbar
│   ├── Brand
│   └── User Info + Logout
│
└── Authentication Check
    ├─► If NOT authenticated
    │   ├── LoginForm
    │   └── RegisterForm
    │
    └─► If authenticated
        └── Dashboard
            ├── Header
            │   └── + Add New Lead Button
            │
            ├── Filter Section
            │   └── Status Filter Dropdown
            │
            ├── LeadForm (conditional)
            │   ├── Name Input
            │   ├── Email Input
            │   ├── Phone Input
            │   ├── Company Input
            │   ├── Source Dropdown
            │   └── Submit Button
            │
            └── Leads Grid
                └── LeadCard (repeated for each lead)
                    ├── Lead Title + Status Badge
                    ├── Contact Info
                    │   ├── Email
                    │   ├── Phone
                    │   └── Company
                    │
                    ├── Status Controls
                    │   └── Status Dropdown
                    │
                    └── Notes Section
                        ├── Notes List
                        └── Add Note Input
```

---

## Database Schema Relationships

```
┌─────────────SELECT───────────────┐
│                                   │
├─────────────────────────────────┐ │
│         User Collection         │ │
├─────────────────────────────────┤ │
│ {                               │ │
│   _id: ObjectId                 │ │
│   username: String              │ │
│   email: String                 │ │
│   password: String (hashed)     │ │
│   role: String                  │ │
│   createdAt: Date               │ │
│   updatedAt: Date               │ │
│ }                               │ │
└─────────────────────────────────┘ │
                                    │
┌─────────────────────────────────┐ │
│         Lead Collection         │ │
├─────────────────────────────────┤ │
│ {                               │ │
│   _id: ObjectId                 │ │
│   name: String                  │ │
│   email: String (unique)        │ │
│   phoneNumber: String           │ │
│   company: String               │ │
│   source: String (enum)         │ │
│   status: String (enum)         │ │
│   notes: [{                     │ │
│     text: String,               │ │
│     createdAt: Date             │ │
│   }]                            │ │
│   lastContacted: Date           │ │
│   createdBy: ObjectId ◄────────┘ │
│   createdAt: Date               │
│   updatedAt: Date               │
│ }                               │
└─────────────────────────────────┘
```

---

## Request/Response Cycle

```
CLIENT REQUEST
│
├─ Method: GET/POST/PUT/DELETE
├─ URL: http://localhost:5000/api/leads
├─ Headers:
│  ├─ Content-Type: application/json
│  └─ Authorization: Bearer eyJhbGci...
│
└─ Body (if POST/PUT):
   └─ {name, email, status, ...}


SERVER PROCESSING
│
├─ Express receives request
├─ CORS middleware processes
├─ JSON parser parses body
├─ Auth middleware verifies JWT
├─ Route matches endpoint
├─ Controller executes logic
├─ Mongoose performs DB operation
└─ Response constructed


SERVER RESPONSE
│
├─ Status: 200/201/400/401/404/500
├─ Headers:
│  ├─ Content-Type: application/json
│  └─ ...
│
└─ Body:
   └─ {
       "success": true/false,
       "data": {...},
       "message": "...",
       "count": 0
      }


CLIENT HANDLING
│
├─ JavaScript receives response
├─ Check status code
├─ Parse JSON
├─ Update component state
└─ Re-render UI
```

---

## Technology Stack

```
FRONTEND
├── React.js (UI Library)
├── Axios (HTTP Client)
└── CSS3 (Styling)

BACKEND
├── Node.js (Runtime)
├── Express.js (Web Framework)
├── Mongoose (ODM)
├── JWT (Authentication)
└── bcryptjs (Password Hashing)

DATABASE
├── MongoDB (NoSQL Database)
└── Collections: users, leads

DEPLOYMENT OPTIONS
├── Frontend: Vercel, Netlify, AWS S3
├── Backend: Heroku, Railway, AWS EC2
└── Database: MongoDB Atlas, AWS
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Scalable structure
- ✅ Secure authentication
- ✅ RESTful API design
- ✅ Database normalization
- ✅ Component reusability
