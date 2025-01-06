import { createAsyncThunk } from "@reduxjs/toolkit";
import { IApiResponse, IUser } from "../../types/types";
import { api } from "./config.axios";

export const addUser = createAsyncThunk<IApiResponse, IUser, { rejectValue: IApiResponse }>(
    "user/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post(`user`, userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data as IApiResponse);
        }
    }
);


export const updateUser = createAsyncThunk<IApiResponse, Partial<IUser>, { rejectValue: IApiResponse }>(
    "user/updateUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.put(`user/${userData.username}`, userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data as IApiResponse);
        }
    }
);

export const getUserByUserName = createAsyncThunk<IUser, string, { rejectValue: IApiResponse }>(
    "user/getUserByUsername",
    async (username, { rejectWithValue }) => {
        try {
            const response = await api.get(`user/${username}`)
            return response.data as IUser
        } catch (error: any) {
            return rejectWithValue(error.response?.data as IApiResponse);
        }
    }
)