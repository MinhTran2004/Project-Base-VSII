import axios from 'axios';
import { IOrder } from '../types/types';

// Create Axios instance
const instance = axios.create({
  baseURL: 'https://petstore.swagger.io/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Create an order
export const createOrder = async (order: Omit<IOrder, 'id'>) => {
  return await instance.post(`/store/order`, order);
};

// Fetch an order by ID
export const fetchOrder = async (orderId: number) => {
  return await instance.get(`/store/order/${orderId}`);
};

export default instance;

