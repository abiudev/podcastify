import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'An unexpected error occurred';
    toast.error(`API Error: ${message}`);
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
