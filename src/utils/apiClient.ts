import axios from 'axios';
import {getToken} from './tokenStorage';
import Config from '../config';

const apiClient = axios.create({
  baseURL: Config.BASE_URL,
});

apiClient.interceptors.request.use(
  async config => {
    const token = await getToken();
    console.log('🚀 ~ token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default apiClient;
