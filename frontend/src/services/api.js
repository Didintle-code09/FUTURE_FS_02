import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (username, email, password, passwordConfirm) =>
    api.post('/auth/register', { username, email, password, passwordConfirm }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () =>
    api.get('/auth/me'),
};

// Leads endpoints
export const leadsAPI = {
  getAllLeads: () =>
    api.get('/leads'),
  getLead: (id) =>
    api.get(`/leads/${id}`),
  createLead: (leadData) =>
    api.post('/leads', leadData),
  updateLead: (id, leadData) =>
    api.put(`/leads/${id}`, leadData),
  updateLeadStatus: (id, status) =>
    api.put(`/leads/${id}/status`, { status }),
  addNote: (id, text) =>
    api.put(`/leads/${id}/notes`, { text }),
  deleteLead: (id) =>
    api.delete(`/leads/${id}`),
};

export default api;
