import { createAsyncThunk } from "@reduxjs/toolkit";
import { IOrder } from "../../types/types";
import axiosConfig from "../../configs/axiosConfig";



export const createOrderThunk = createAsyncThunk<IOrder, Omit<IOrder, 'id'>>(
    'order/createOrder',
    async (orderData, {rejectWithValue}) =>{
        try{
            const response = await axiosConfig.post('/store/order', orderData);
            return response.data as IOrder;
        }catch (error: any){
            return rejectWithValue(error);
        }
    }
);

export const fetchOrderThunk = createAsyncThunk<IOrder, string>(
    'order/fetchOrder',
    async(id,{rejectWithValue}) =>{
        try {
            const response = await axiosConfig.get(`/store/order/${id}`);
            return response.data as IOrder;
        } catch (error:any) {
            return rejectWithValue(error);
        }
    }
)