import { createAsyncThunk } from "@reduxjs/toolkit";
import { IApiResponse, IUser } from "../../types/types";
import axios from "axios";

const baseUrl = "https://petstore.swagger.io/v2/user"

export const addUser = createAsyncThunk<IApiResponse, IUser>(
    "user/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}`, userData);
            if (response.status !== 200) {
                throw new Error(response.data.message || "Failed to add user");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data as IApiResponse);
        }
    }
);


export const updateUser = createAsyncThunk<IApiResponse, Partial<IUser>>(
    "user/updateUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${baseUrl}/${userData.username}`, userData);

            if (response.status !== 200) {
                throw new Error(response.data.message || "Failed to add user");
            }
            return response.data as IApiResponse;
        } catch (error: any) {
            return rejectWithValue(error.response?.data as IApiResponse);
        }
    }
);

export const getUserByUserName = createAsyncThunk<IUser, string>(
    "user/getUserByUsername",
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}/${username}`)
            if (response.status !== 200) {
                throw new Error(response.data.message || "Failed to add user");
            }
            return response.data as IUser
        } catch (error: any) {
            return rejectWithValue(error.response?.data as IApiResponse);
        }
    }
)