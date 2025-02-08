import { hideLoading, showLoading } from '@/components/Loading';
import envConfig from '@/config';
import axios from 'axios';

console.log('config:', envConfig);

const instance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: envConfig.baseApi,
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

    if (envConfig.mock === true) {
      config.baseURL = envConfig.mockApi;
    } else {
      config.baseURL = envConfig.baseApi;
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
