import axios from "axios";

// utils/api.js
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
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api', // adjust if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
