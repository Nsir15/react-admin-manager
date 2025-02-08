import { hideLoading, showLoading } from '@/components/Loading';
import axios from 'axios';

console.log(import.meta.env);

const env = import.meta.env;

const instance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: env.BASE_URL || 'http://localhost:3000',
  timeout: 3000,
  timeoutErrorMessage: '请求超时，请待会儿再试',
  withCredentials: true
});

instance.interceptors.request.use(
  config => {
    showLoading();
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (env.VITE_MOCK === 'true') {
      config.baseURL = env.VITE_MOCK_API;
    } else {
      config.baseURL = env.BASE_URL;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    hideLoading();
    return response;
  },
  error => {
    hideLoading();
    Promise.reject(error);
  }
);

const get = <T>(url: string, params: Record<string, any>): Promise<T> => {
  return instance.get(url, { params });
};
const post = <T>(url: string, params: Record<string, any>): Promise<T> => {
  return instance.post(url, params);
};

export default {
  get,
  post
};
