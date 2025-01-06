import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './axiosConfig'; // Import instance từ axiosConfig
import { IApiResponse, IOrder } from '../types/types';

// Thunk để tạo order mới
export const createOrderThunk = createAsyncThunk<IApiResponse, IOrder>(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/store/order', orderData);
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to create order');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data as IApiResponse);
    }
  }
);


export const fetchOrderThunk = createAsyncThunk(
  'order/fetch',
  async (orderId: string) => {
    try {
      const res = await axiosInstance.get(`/store/order/${orderId}`);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);


export const placeOrderThunk = createAsyncThunk(
  'order/place',
  async (order: IOrder) => {
    try {
      const res = await axiosInstance.post(`/store/order`, order);

      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }
);
