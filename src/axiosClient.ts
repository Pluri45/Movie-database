import axios from 'axios';

// Create a new instance of axios with a custom config
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  // Base URL for all requests made using this instance
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
  }
});

export default axiosClient;
