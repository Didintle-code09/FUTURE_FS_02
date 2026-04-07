import React, { useState } from 'react';
import { authAPI } from '../services/api';
import '../styles/auth.css';

function RegisterForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordChecks = [
    { label: 'Use at least 8 characters for a stronger password', met: password.length >= 8 },
    { label: 'Add an uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Add a number', met: /\d/.test(password) },
    { label: 'Add a special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register(username, email, password, passwordConfirm);
      const { token, user } = response.data;
      onSuccess(token, user);
    } catch (err) {
      if (!err.response) {
        setError('Sign up is unavailable right now.');
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            minLength="6"
          />
          <button
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="password-toggle"
            onClick={() => setShowPassword((current) => !current)}
            type="button"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="password-guidance">
          <p>Password recommendations</p>
          <div className="password-checklist">
            {passwordChecks.map((check) => (
              <span className={`password-check ${check.met ? 'met' : ''}`} key={check.label}>
                {check.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <div className="password-field">
          <input
            id="passwordConfirm"
            type={showPasswordConfirm ? 'text' : 'password'}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm your password"
            required
            minLength="6"
          />
          <button
            aria-label={showPasswordConfirm ? 'Hide confirm password' : 'Show confirm password'}
            className="password-toggle"
            onClick={() => setShowPasswordConfirm((current) => !current)}
            type="button"
          >
            {showPasswordConfirm ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

export default RegisterForm;
