import axios from 'axios';

// Create a base Axios instance
const api = axios.create({
  // Base URL for the Express backend
  // When running locally, the backend is on port 5000
  baseURL: 'https://iqscaler.azurewebsites.net/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor to include the JWT token in every request automatically
api.interceptors.request.use(
  (config) => {
    // Get user info from Redux store/localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
    const token = userInfo?.token;

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;