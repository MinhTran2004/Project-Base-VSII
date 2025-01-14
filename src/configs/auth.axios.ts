import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://petstore.swagger.io/v2/user';

interface AuthResponse {
    message: any;
    data: {
        token: string | null;
        code: number;
        message: string;
    };
    status: number;
}

interface AuthError {
    message: string;
    status: number;
}

export const loginThunk = createAsyncThunk<AuthResponse, { username: string; password: string }, { rejectValue: AuthError }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/login`, {
                params: {
                    username: credentials.username,
                    password: credentials.password
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue({
                    message: response.data.message,
                    status: response.status,
                });
            }
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message,
                status: error.response?.status || 500,
            });
        }
    }
);

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: AuthError }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/logout`);

            if (response.status === 200) {
                return;
            } else {
                return rejectWithValue({
                    message: response.data.message,
                    status: response.status,
                });
            }
        } catch (error: any) {
            return rejectWithValue({
                message: error.response?.data?.message ,
                status: error.response?.status || 500,
            });
        }
    }
);
