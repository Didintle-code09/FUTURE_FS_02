# CRM (Customer Relationship Management) Application

A full-stack web application for managing customer leads and contacts. Built with React.js, Node.js/Express, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based login and registration system
- **Lead Management**: Create, read, update, and delete leads
- **Status Tracking**: Track lead status through the sales pipeline (new → contacted → interested → converted/lost)
- **Notes System**: Add and track notes for each lead
- **Lead Filtering**: Filter leads by status
- **Responsive Design**: Clean, modern UI that works on all devices
- **Secure API**: Protected routes with JWT authentication

## 📋 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud database)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crm-db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
If you have MongoDB installed locally, make sure it's running:
```bash
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crm-db?retryWrites=true&w=majority
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Get current user (protected)

### Leads (All protected with JWT)
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `GET /api/leads/:id` - Get a single lead
- `PUT /api/leads/:id` - Update lead details
- `PUT /api/leads/:id/status` - Update lead status
- `PUT /api/leads/:id/notes` - Add a note to a lead
- `DELETE /api/leads/:id` - Delete a lead

## 🎯 Using the Application

### 1. Register or Login
- Start by registering a new account or logging in with existing credentials
- Your session is maintained using JWT tokens stored in localStorage

### 2. Dashboard
- View all your leads in a grid layout
- Filter leads by status using the filter dropdown

### 3. Add a New Lead
- Click "+ Add New Lead" button
- Fill in the lead information (name, email, phone, company, source)
- Click "Add Lead" to save

### 4. Update Lead Status
- Each lead card has a status dropdown
- Change status as you progress through your sales pipeline
- Last contacted date is automatically updated

### 5. Add Notes
- Click "+ Add Note" on any lead card
- Type your note and click "Save Note"
- Notes are displayed with timestamps

### 6. Edit or Delete Leads
- Use the ✏️ button to edit lead details
- Use the 🗑️ button to delete a lead

### 7. Logout
- Click "Logout" from the top-right navbar to sign out

## 🏗️ Project Structure

```
CRM/
├── backend/
│   ├── models/
│   │   ├── Lead.js        # Lead schema
│   │   └── User.js        # User schema
│   ├── controllers/
│   │   ├── leadController.js    # Lead CRUD logic
│   │   └── authController.js    # Auth logic
│   ├── routes/
│   │   ├── leads.js       # Lead endpoints
│   │   └── auth.js        # Auth endpoints
│   ├── middleware/
│   │   └── auth.js        # JWT verification
│   ├── server.js          # Express app setup
│   ├── package.json
│   └── .env               # Environment variables
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── App.js              # Main app component
    │   │   ├── Dashboard.js        # Dashboard page
    │   │   ├── LeadForm.js         # Add/Edit form
    │   │   ├── LeadCard.js         # Lead display card
    │   │   ├── LoginForm.js        # Login form
    │   │   └── RegisterForm.js     # Register form
    │   ├── services/
    │   │   └── api.js              # API calls
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── dashboard.css
    │   │   ├── forms.css
    │   │   ├── lead-card.css
    │   │   └── auth.css
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## 🔐 Security Notes

- Change the `JWT_SECRET` in `.env` to a strong random string in production
- Never commit `.env` files to version control
- Use HTTPS in production
- Passwords are hashed using bcryptjs before storage
- All lead endpoints are protected with JWT authentication

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check your connection string in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### CORS Errors
- The backend has CORS enabled for `localhost:3000`
- In production, update the CORS settings in `server.js`

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux) or `netstat -ano | findstr :5000` (Windows)

### Frontend Not Loading Data
- Check if the backend server is running on `http://localhost:5000`
- Check browser console for errors
- Ensure your token is valid (check localStorage)

## 💡 Future Enhancements

- Email notifications for lead updates
- Lead assignment to team members
- Pipeline analytics and reporting
- Lead import/export functionality
- Email integration for contact history
- Mobile app with React Native
- Real-time updates with WebSockets
- Advanced search and filtering

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📧 Support

For issues or questions, please open an issue on the repository.

---

Happy lead managing! 🚀
