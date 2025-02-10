import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import {getAccessToken} from '../../tokenStorage';
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T = unknown> {
  result: T;
  message: string;
  status: number;
}

export type ApiRequestConfig<T = unknown> = InternalAxiosRequestConfig & {
  data?: T;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://tsoftware.store/api/v1',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  httpAgent: {
    sslPinning: {
      certs: ['your_cert.pem'], // Chỉ định file chứng chỉ
    },
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T>>) => response,
  (error: AxiosError<ApiError>) => {
    const errorMessage =
      error.response?.data?.message || error.message || 'API Error';
    return Promise.reject(new Error(errorMessage));
  },
);

export default axiosInstance;
