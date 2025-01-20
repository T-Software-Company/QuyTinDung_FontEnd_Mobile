import axios from 'axios';
import {getAccessToken} from '../../tokenStorage';

const axiosInstance = axios.create({
  baseURL: 'https://tsoftware.store/api/v1', // URL gốc của API
  timeout: 1000, // Thời gian chờ (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm request interceptor để tự động thêm token
axiosInstance.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

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
