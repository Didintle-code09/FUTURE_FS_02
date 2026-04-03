# Quick Start Guide - CRM Application

## Prerequisites
Before starting, ensure you have:
- **Node.js** (v14+) - Download from https://nodejs.org/
- **MongoDB** - Either:
  - Local: Download from https://www.mongodb.com/try/download/community
  - Cloud: Free tier at https://www.mongodb.com/cloud/atlas

## Step-by-Step Setup (Windows)

### 1. Verify Installations
```bash
node --version
npm --version
```

### 2. Clone/Extract Project
Navigate to your project directory:
```bash
cd C:\Projects\CRM
```

### 3. Install All Dependencies
Run this from the project root:
```bash
npm install && cd backend && npm install && cd ../frontend && npm install
```

OR manually in each directory:

**Install Backend Dependencies:**
```bash
cd C:\Projects\CRM\backend
npm install
```

**Install Frontend Dependencies:**
```bash
cd C:\Projects\CRM\frontend
npm install
```

### 4. Configure MongoDB

**Option A: Using Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service (it should auto-start on Windows)
3. The default connection string `mongodb://localhost:27017/crm-db` should work

**Option B: Using MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update backend/.env with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/crm-db?retryWrites=true&w=majority
```

### 5. Start Backend Server

Open PowerShell/Command Prompt and run:
```bash
cd C:\Projects\CRM\backend
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

### 6. Start Frontend (in a NEW terminal)

```bash
cd C:\Projects\CRM\frontend
npm start
```

The app will automatically open at http://localhost:3000

### 7. Create First User

- Click "Register" on the login page
- Fill in your details (username, email, password)
- Click Register
- You'll be logged in automatically

### 8. Start Using!

You're ready to manage leads!

## Running Both Servers Together (Windows)

From the project root directory, if you installed `concurrently`:

```bash
npm run dev
```

This will start both backend and frontend in the same terminal.

## Default Test User (if you create one)
- Email: test@example.com
- Password: password123

## Common Issues

### "MongoDB connection error"
- Ensure MongoDB is running
- Check connection string in backend/.env
- For Atlas, check IP whitelist

### "Port 5000 already in use"
1. Find and kill the process using PowerShell:
```bash
Get-Process node | Stop-Process
```

Or change PORT in backend/.env to 5001

### "Cannot find module..."
- Delete node_modules folder
- Run: `npm install` again in both backend and frontend

### "CORS error in console"
- Backend wasn't started
- Backend isn't on localhost:5000
- Check if port 5000 is accessible

## Verify Everything Works

1. **Backend Check:**
   - Open browser and go to http://localhost:5000/api/health
   - Should see: `{"success":true,"message":"Server is running"}`

2. **Frontend Check:**
   - Should see login page at http://localhost:3000

3. **Database Check:**
   - Create an account and add a lead
   - Check MongoDB to see the data

## Next Steps

- Read the main README.md for feature details
- Explore the API endpoints in `backend/routes/`
- Customize styling in `frontend/src/styles/`
- Review the database models in `backend/models/`

## Stopping Servers

- **Backend:** Press `Ctrl + C` in the backend terminal
- **Frontend:** Press `Ctrl + C` in the frontend terminal

## Need Help?

- Check browser console for errors (F12)
- Check terminal output for error messages
- Ensure all services (MongoDB, Node servers) are running
- Review .env file for correct configuration

---

Happy building! 🚀
