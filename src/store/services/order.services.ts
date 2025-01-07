import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../configs/axiosConfig'; // Import instance từ axiosConfig
import { IOrder, HttpError } from '../../types/types';

// Thunk để tạo order mới
export const createOrderThunk = createAsyncThunk<IOrder, Omit<IOrder, 'id'>, { rejectValue: HttpError }>(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/store/order', orderData);
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to create order');
      }
      return response.data as IOrder;
    } catch (error: any) {
      const httpError: HttpError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data.message || 'An unexpected error occurred',
      };
      return rejectWithValue(httpError);
    }
  }
);

// Thunk để fetch order
export const fetchOrderThunk = createAsyncThunk<IOrder, string, { rejectValue: HttpError }>(
  'order/fetch',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/store/order/${orderId}`);
      return response.data as IOrder;
    } catch (error: any) {
      const httpError: HttpError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data.message || 'An unexpected error occurred',
      };
      return rejectWithValue(httpError);
    }
  }
);

// Thunk để place order
export const placeOrderThunk = createAsyncThunk<IOrder, Omit<IOrder, 'id'>, { rejectValue: HttpError }>(
  'order/place',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/store/order', orderData);
      return response.data as IOrder;
    } catch (error: any) {
      const httpError: HttpError = {
        statusCode: error.response?.status || 500,
        message: error.response?.data.message || 'An unexpected error occurred',
      };
      return rejectWithValue(httpError);
    }
  }
);
