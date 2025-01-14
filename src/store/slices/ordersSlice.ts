import { createSlice } from '@reduxjs/toolkit';
import { IApiResponse, IOrder, Status } from '../../types/types';
import { createOrderThunk, fetchOrderThunk } from '../services/order.service';

export type Order = IOrder;

export interface OrdersState {
  allOrders: Order[];
  singleOrder: Order | null; // Changed to null for better state management
  isLoading: boolean;
  error: IApiResponse | null; // Changed to string for actual error messages
}

const initialState: OrdersState = {
  allOrders: [],
  singleOrder: null, // Changed to null
  isLoading: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null; // Reset error on new request
    });
    builder.addCase(fetchOrderThunk.fulfilled, (state, action) => {
      state.singleOrder = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOrderThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as IApiResponse; // Ensure payload is a string
    });
    builder.addCase(createOrderThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null; // Reset error on new request
    });
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.allOrders.push(action.payload); // Use push for better performance
      state.isLoading = false;
    });
    builder.addCase(createOrderThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as IApiResponse; // Ensure payload is a string
    });
  },
});

export default ordersSlice.reducer;