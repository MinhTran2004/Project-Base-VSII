import axios from 'axios';
import { IOrder } from '../types/types';

const instance = axios.create({
  baseURL: 'https://petstore.swagger.io/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createOrder = async (order: IOrder) => {
  return await instance.post(`/store/order`, order);
};

export default instance;
