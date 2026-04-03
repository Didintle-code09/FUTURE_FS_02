import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import { authAPI } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleRegisterSuccess = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setShowRegister(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        {showRegister ? (
          <RegisterForm onSuccess={handleRegisterSuccess} />
        ) : (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}
        <p className="auth-toggle">
          {showRegister ? "Already have an account? " : "Don't have an account? "}
          <button
            className="toggle-btn"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>CRM System</h1>
        </div>
        <div className="navbar-content">
          <span className="user-info">Welcome, {user?.username}!</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <Dashboard />
    </div>
  );
}

export default App;
