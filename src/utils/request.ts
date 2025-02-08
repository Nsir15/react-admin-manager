import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
  timeoutErrorMessage: '请求超时，请待会儿再试',
  withCredentials: true
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Promise.reject(error);
  }
);

const get = (url: string, params: Record<string, any>) => {
  return instance.get(url, { params });
};
const post = (url: string, params: Record<string, any>) => {
  return instance.post(url, params);
};

export default {
  get,
  post
};
