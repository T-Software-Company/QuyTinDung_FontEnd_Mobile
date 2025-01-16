import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tsoftware.store/api/v1', // URL gốc của API
  timeout: 1000, // Thời gian chờ (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động xử lý lỗi
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(
      error.response?.data?.message || error.message || 'API Error',
    );
  },
);

export default axiosInstance;
