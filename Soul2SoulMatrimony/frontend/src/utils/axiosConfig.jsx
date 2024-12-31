// src/utils/axiosConfig.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken"); // Retrieve token from localStorage
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Export the Axios instance
export default axiosInstance;
