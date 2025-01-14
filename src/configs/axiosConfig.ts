import axios from 'axios';
import { IOrder } from '../types/types';

// Create Axios instance
const axiosConfig = axios.create({
  baseURL: 'https://petstore.swagger.io/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Create an order
export const createOrder = async (order: Omit<IOrder, 'id'>) => {
  try {
    const response = await axiosConfig.post(`/store/order`, order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Fetch an order by ID
export const fetchOrder = async (id: number) => {
  try {
    const response = await axiosConfig.get(`/store/order/${id}`);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
};

// Fetch a pet by ID
export const fetchPet = async (id: number) => {
  try {
    const response = await axiosConfig.get(`/pet/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default axiosConfig;