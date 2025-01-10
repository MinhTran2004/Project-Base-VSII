import { createSlice } from '@reduxjs/toolkit';
import {
  createOrderThunk,
  fetchOrderThunk,
  placeOrderThunk,
  deleteOrderThunk, // Import the deleteOrderThunk
} from '../services/order.services';
import { IOrder, Status, HttpError } from '../../types/types';

export type Order = IOrder;

export interface OrdersState {
  allOrders: Order[];
  singleOrder: Order;
  isLoading: boolean;
  error?: HttpError;
}

const initialState: OrdersState = {
  allOrders: [],
  singleOrder: {
    id: 0,
    petId: 0,
    quantity: 0,
    shipDate: new Date().toISOString(),
    status: Status.PENDING,
    complete: false,
  },
  isLoading: false,
  error: undefined,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderThunk.pending, (state: OrdersState) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrderThunk.fulfilled, (state: OrdersState, action) => {
      state.singleOrder = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchOrderThunk.rejected, (state: OrdersState, action) => {
      state.isLoading = false;
      state.error = action.payload as HttpError;
    });
    builder.addCase(createOrderThunk.pending, (state: OrdersState) => {
      state.isLoading = true;
    });
    builder.addCase(createOrderThunk.fulfilled, (state: OrdersState, action) => {
      state.allOrders = [...state.allOrders, action.payload];
      state.isLoading = false;
    });
    builder.addCase(createOrderThunk.rejected, (state: OrdersState, action) => {
      state.isLoading = false;
      state.error = action.payload as HttpError;
    });
    builder.addCase(placeOrderThunk.pending, (state: OrdersState) => {
      state.isLoading = true;
    });
    builder.addCase(placeOrderThunk.fulfilled, (state: OrdersState, action) => {
      state.allOrders = [...state.allOrders, action.payload];
      state.isLoading = false;
    });
    builder.addCase(placeOrderThunk.rejected, (state: OrdersState, action) => {
      state.isLoading = false;
      state.error = action.payload as HttpError;
    });
    builder.addCase(deleteOrderThunk.pending, (state: OrdersState) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOrderThunk.fulfilled, (state: OrdersState, action) => {
      state.allOrders = state.allOrders.filter(order => order.id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(deleteOrderThunk.rejected, (state: OrdersState, action) => {
      state.isLoading = false;
      state.error = action.payload as HttpError;
    });
  },
});

export default ordersSlice.reducer;
