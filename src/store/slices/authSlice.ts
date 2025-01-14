import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk } from '../../configs/auth.axios';

// Define the FetchTokenResponse interface
interface FetchTokenResponse {
  data: {
    token: string | null;
    code: number;
    message: string;
  };
  status: number;
}

interface AuthState {
  token: string | null;
  session: string | null;
  isLoading: boolean;
  error: string | null;
}

const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_SESSION: 'userSession',
};

const initialState: AuthState = {
  token: localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
  session: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, action.payload);
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.session = null;
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_SESSION);
    },
    setSession: (state, action: PayloadAction<string>) => {
      state.session = action.payload;
      if (action.payload) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_SESSION, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<FetchTokenResponse>) => {
        state.isLoading = false;
        console.log('loginThunk fulfilled:', action.payload);
        if (action.payload && action.payload.data && action.payload.data.token) {
          state.token = action.payload.data.token ?? null;
          if (state.token) {
            localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, state.token);
          }
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? 'Unknown error occurred';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null;
        state.session = null;
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_SESSION);
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.payload?.message ?? 'Unknown error occurred';
      });
  },
});

export const { setToken, clearToken, setSession } = authSlice.actions;
export default authSlice.reducer;
