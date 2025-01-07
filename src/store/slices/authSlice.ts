import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk } from '../services/auth.service';

interface AuthState {
  token: string | null;
  session: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken'),
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
        localStorage.setItem('authToken', action.payload);
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.session = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userSession');
    },
    setSession: (state, action: PayloadAction<string>) => {
      state.session = action.payload;
      if (action.payload) {
        localStorage.setItem('userSession', action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem('authToken', state.token);
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? 'Unknown error occurred';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.session = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('userSession');
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? 'Failed to logout';
      });
  },
});

export const { setToken, clearToken, setSession } = authSlice.actions;
export default authSlice.reducer;
