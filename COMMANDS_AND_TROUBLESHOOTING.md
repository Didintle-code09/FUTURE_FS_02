# Common Commands & Troubleshooting

## 🚀 Quick Start Commands

### One-time Setup
```bash
# From project root
npm install  # Install root dependencies

# Install all backend and frontend dependencies
cd backend && npm install
cd ../frontend && npm install
```

### Development
```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm start

# OR from root (if concurrently installed)
npm run dev
```

### Production Build
```bash
cd frontend
npm run build
# Creates optimized build in frontend/build folder
```

---

## 📋 Backend Commands

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Add specific package
npm install package-name

# Remove package
npm uninstall package-name

# Clear node_modules and reinstall
rm -r node_modules
npm install
```

---

## 📋 Frontend Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test (if configured)
npm test

# Eject configuration (⚠️ irreversible!)
npm run eject
```

---

## 🔧 Environment Configuration

### Backend .env File
```bash
# backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crm-db
JWT_SECRET=your_super_secret_key_here_change_in_production
NODE_ENV=development
```

### Change Port
Edit `.env`:
```
PORT=5001
```

### Change MongoDB
Edit `.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/crm-db
```

---

## 🐛 Troubleshooting

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "MONGODB_CONNECTED_FAIL"
**Solution:**
```bash
# Check MongoDB is running
# Windows:
# MongoDB should auto-start or manually start the service

# Check connection string in backend/.env
# Verify credentials for Atlas
```

### Issue: "Port 5000 already in use"
**Solution - PowerShell:**
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port in .env
```

**Solution - Terminal:**
```bash
# Find and kill
lsof -ti:5000 | xargs kill -9

# Or use different port
```

### Issue: "CORS error in browser console"
**Solution:**
- Ensure backend is running on http://localhost:5000
- Check if process is actually running
- Clear browser cache (Ctrl+Shift+Delete)
- Try in incognito window

### Issue: "Cannot find module..."
**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### Issue: "JWT Invalid or Expired"
**Solution:**
- Clear localStorage: `localStorage.clear()`
- Login again
- Check JWT_SECRET in backend/.env matches

### Issue: "Blank page loads"
**Solution:**
- Check browser console (F12) for errors
- Check Network tab - are API calls being made?
- Ensure backend is running
- Try hard refresh (Ctrl+Shift+R)

### Issue: "Cannot POST /api/leads"
**Solution:**
- Backend isn't running
- Wrong URL in API service
- Route not defined in backend
- Middleware issue (JWT token missing)

---

## 🔍 Debugging Tips

### Check Network Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Perform action
4. Click request to see details
5. Check Status code (200=OK, 401=Unauthorized, 404=Not Found)

### Check Database
```bash
# MongoDB Compass
# Download from: https://www.mongodb.com/products/compass
# Connect to: mongodb://localhost:27017
# Browse collections
```

### Check Backend Logs
- Watch terminal where backend is running
- Look for error messages
- Check MongoDB connection logs

### Check Frontend Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Check Network tab for failed requests

---

## 📊 Test Data

### Test User
```
Email: test@example.com
Password: Test@123
```

### Test Lead
```
Name: John Doe
Email: john@example.com
Company: Acme Corp
Phone: (555) 123-4567
Source: website
Status: new
Notes: "Initial contact"
```

---

## 🔄 Reset Everything

### Clear All Data
```bash
# Delete MongoDB database (requires MongoDB CLI)
# Or use MongoDB Compass to delete collections

# Clear browser localStorage
# F12 → Application → LocalStorage → Clear All

# Clear browser cache
# Ctrl+Shift+Delete → Clear Everything
```

### Reset Node Modules
```bash
# Backend
cd backend
rm -r node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -r node_modules package-lock.json
npm install
```

---

## 📡 API Testing Tools

### Using cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'

# Get all leads (replace TOKEN)
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman
1. Download from https://www.postman.com/
2. Create collection
3. Add requests for each endpoint
4. Set Authorization header with token
5. Test each endpoint

### Using VS Code REST Client Extension
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test@123"
}
```

---

## 💾 Backup & Restore

### Backup MongoDB Compass
1. Right-click database
2. Export collection
3. Save JSON file

### Restore
1. Import JSON in MongoDB Compass
2. Or use mongorestore command

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to random string
- [ ] Use environment variables (never hardcode)
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use strong password requirements
- [ ] Add CSRF protection
- [ ] Enable security headers
- [ ] Keep dependencies updated
- [ ] Use MongoDB Atlas with authentication
- [ ] Change default ports
- [ ] Add request logging

---

## 📈 Performance Tips

- Enable gzip compression
- Implement pagination for large datasets
- Add database indexes
- Optimize images
- Minify CSS/JS (done automatically by npm run build)
- Implement caching
- Use CDN for static files
- Monitor API response times

---

## 🚀 Deployment Resources

### Backend Hosting
- Heroku (free tier available)
- AWS EC2
- DigitalOcean
- Railway
- Replit

### Frontend Hosting
- Vercel (recommended for React)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

### Database Hosting
- MongoDB Atlas (free tier)
- AWS MongoDB
- Digital Ocean Managed Database

---

## 📚 Learning Resources

- Express.js Docs: https://expressjs.com
- MongoDB Docs: https://docs.mongodb.com
- React Docs: https://react.dev
- JWT Introduction: https://jwt.io/introduction
- REST API Best Practices: https://restfulapi.net

---

## ❓ FAQ

**Q: Can I run both servers on one terminal?**  
A: Yes, use `npm run dev` from root if concurrently is installed.

**Q: How do I change the database name?**  
A: Edit MONGODB_URI in backend/.env

**Q: Can I use different port?**  
A: Yes, edit PORT in backend/.env (update frontend API URL if needed)

**Q: How do I reset a user password?**  
A: Delete user from database and have them register again.

**Q: Can I deploy without MongoDB Atlas?**  
A: Yes, you can use any MongoDB hosting or your own server.

**Q: How do I add more users?**  
A: Click Register button on login page.

**Q: How are passwords stored?**  
A: Hashed with bcryptjs in database.

**Q: Can I modify the UI?**  
A: Yes! All frontend code is in `frontend/src/` directory.

**Q: How do I add new features?**  
A: Add routes in backend, create controllers, update frontend components.

---

## 🆘 Still Having Issues?

1. **Check the error message carefully** - it usually tells you what's wrong
2. **Google the error** - others have probably had it
3. **Check file permissions** - can Node.js read your files?
4. **Check firewall** - is it blocking ports?
5. **Restart services** - MongoDB, Node servers
6. **Clear cache** - browser and npm
7. **Update Node.js** - use latest LTS version
8. **Read documentation** - links in this file

---

For more help, see README.md and SETUP.md
