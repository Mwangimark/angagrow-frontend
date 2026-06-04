// utils/api.js
import axios from "axios";

// utils/apis.js
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    // Redirect to login if no token
    window.location.href = '/login';
    throw new Error('No authentication token found');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  // Remove Content-Type if it's FormData (browser sets it automatically)
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired
    localStorage.clear();
    window.location.href = '/login';
    throw new Error('Authentication expired');
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  return response.json();
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
});

// ✅ REQUEST INTERCEPTOR - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ ADD THIS RESPONSE INTERCEPTOR - Handles 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if error is 401 Unauthorized
    if (error.response?.status === 401) {
      console.log('🔐 Token expired or invalid. Redirecting to login...');
      
      // Clear all auth data
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('remember_me');
      
      // Redirect to login page
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;