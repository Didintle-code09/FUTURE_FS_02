# CRM Application - Complete File Structure

## 📂 Project Directory

```
C:\Projects\CRM\
├── README.md                          # Main project documentation
├── SETUP.md                           # Quick start guide
├── API_DOCUMENTATION.md               # Complete API reference
├── package.json                       # Root package for concurrent running
├── .gitignore                         # Git ignore rules
│
├── backend/                           # Express.js Backend
│   ├── server.js                      # Main server file
│   ├── package.json                   # Backend dependencies
│   ├── .env                           # Environment variables
│   │
│   ├── models/
│   │   ├── Lead.js                    # Lead schema
│   │   └── User.js                    # User schema
│   │
│   ├── controllers/
│   │   ├── leadController.js          # Lead CRUD operations
│   │   └── authController.js          # Authentication logic
│   │
│   ├── routes/
│   │   ├── leads.js                   # Lead API routes
│   │   └── auth.js                    # Auth API routes
│   │
│   └── middleware/
│       └── auth.js                    # JWT verification
│
└── frontend/                          # React.js Frontend
    ├── package.json                   # Frontend dependencies
    ├── public/
    │   └── index.html                 # HTML entry point
    │
    └── src/
        ├── index.js                   # React entry point
        ├── App.js                     # Main App component
        ├── App.css                    # Main styles
        │
        ├── components/
        │   ├── Dashboard.js           # Main dashboard page
        │   ├── LeadCard.js            # Individual lead display
        │   ├── LeadForm.js            # Add/Edit lead form
        │   ├── LoginForm.js           # Login component
        │   └── RegisterForm.js        # Registration component
        │
        ├── services/
        │   └── api.js                 # API service layer
        │
        └── styles/
            ├── auth.css               # Auth page styles
            ├── dashboard.css          # Dashboard styles
            ├── forms.css              # Form styles
            └── lead-card.css          # Lead card styles
```

## 📊 Features Breakdown

### Backend Features
✅ User Authentication (Register/Login)  
✅ JWT Token Generation & Validation  
✅ Password Hashing with bcryptjs  
✅ CORS Support  
✅ Error Handling  
✅ Mongoose Schema Validation  

### Lead Management
✅ Create Leads  
✅ Read All/Single Leads  
✅ Update Lead Details  
✅ Update Lead Status  
✅ Add Notes to Leads  
✅ Delete Leads  
✅ Status Tracking (new → contacted → interested → converted/lost)  

### Frontend Features
✅ User Authentication UI  
✅ Dashboard with Lead List  
✅ Lead Filtering by Status  
✅ Add/Edit Lead Forms  
✅ Status Management  
✅ Notes System  
✅ Responsive Design  
✅ Error Handling & Messages  

## 🗄️ Database Schema

### User Collection
```
{
  _id: ObjectId
  username: String (unique)
  email: String (unique)
  password: String (hashed)
  role: String (default: "user")
  createdAt: Date
  updatedAt: Date
}
```

### Lead Collection
```
{
  _id: ObjectId
  name: String (required)
  email: String (required, unique)
  phoneNumber: String
  company: String
  source: String (enum: website, referral, social-media, email, other)
  status: String (enum: new, contacted, interested, converted, lost)
  notes: [
    {
      text: String
      createdAt: Date
    }
  ]
  lastContacted: Date
  createdAt: Date
  updatedAt: Date
}
```

## 🔄 Data Flow

```
User Interface (React)
        ↓
API Service (axios)
        ↓
Express Routes
        ↓
Controllers (Business Logic)
        ↓
Mongoose Models
        ↓
MongoDB Database
```

## 📋 File Responsibilities

### Backend Files

| File | Purpose |
|------|---------|
| `server.js` | Express setup, middleware, route mounting |
| `models/User.js` | User schema, password hashing |
| `models/Lead.js` | Lead schema, validation rules |
| `controllers/authController.js` | Register, login, get user |
| `controllers/leadController.js` | CRUD operations for leads |
| `routes/auth.js` | Auth endpoint definitions |
| `routes/leads.js` | Lead endpoint definitions |
| `middleware/auth.js` | JWT verification middleware |

### Frontend Files

| File | Purpose |
|------|---------|
| `index.js` | React DOM rendering |
| `App.js` | Authentication state, routing to Dashboard |
| `components/Dashboard.js` | Main page, lead list management |
| `components/LeadCard.js` | Individual lead display and actions |
| `components/LeadForm.js` | Form for creating/editing leads |
| `components/LoginForm.js` | User login |
| `components/RegisterForm.js` | User registration |
| `services/api.js` | Axios instance, API calls |

## 🚀 How Everything Connects

1. **User Registration/Login**
   - Frontend form → Backend auth controller → User stored in MongoDB
   - JWT token returned and stored in localStorage

2. **View Leads**
   - Dashboard component calls API on mount → Backend retrieves from MongoDB

3. **Create Lead**
   - LeadForm submitted → API call → Controller validates → Mongoose saves → Frontend updates

4. **Update Status/Add Note**
   - LeadCard actions → API call → Controller modifies document → Frontend reflects changes

5. **Delete Lead**
   - Delete button → API call → Controller removes → Frontend updates list

## 🔐 Security Flow

```
HTTP Request with Token
        ↓
Express receives request
        ↓
Auth middleware verifies JWT
        ↓
If valid → Pass to route handler
If invalid → Return 401 Unauthorized
```

## 📦 Dependencies

### Backend Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: CORS middleware
- **jsonwebtoken**: JWT creation/verification
- **bcryptjs**: Password hashing
- **dotenv**: Environment variables

### Frontend Dependencies
- **react**: UI library
- **react-dom**: React rendering
- **axios**: HTTP client

## 🎨 Styling Approach

- **CSS Grid**: For responsive layouts
- **Flexbox**: For alignment and spacing
- **Gradient Colors**: Purple/blue theme
- **Mobile Responsive**: Works on all devices
- **Hover Effects**: Interactive feedback

## 📝 Code Quality Features

✅ Modular structure (separation of concerns)  
✅ Consistent naming conventions  
✅ Error handling throughout  
✅ Input validation  
✅ Async/await for promises  
✅ Reusable components  
✅ Clean code with comments  

## 🧪 Testing the Application

### Create Test Account
1. Register with test credentials
2. Create several test leads with different statuses
3. Test filtering, status changes, and note additions

### API Testing
Use Postman or cURL to test all endpoints directly

### Database Testing
Connect MongoDB Compass to view data in real-time

---

## 🎯 Next Steps After Setup

1. ✅ Install dependencies
2. ✅ Start MongoDB
3. ✅ Start backend server
4. ✅ Start frontend app
5. ✅ Register first user
6. ✅ Add test leads
7. ✅ Explore features
8. ✅ Customize styling
9. ✅ Deploy to production

---

For detailed setup instructions, see **SETUP.md**  
For API endpoints, see **API_DOCUMENTATION.md**  
For general information, see **README.md**
