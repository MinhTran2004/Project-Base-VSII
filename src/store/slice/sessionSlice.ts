import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu dữ liệu cho state
interface SessionState {
  sessionId: string | null;
  isSessionExpired: boolean;
}

// Giá trị khởi tạo (initial state)
const initialState: SessionState = {
  sessionId: null,
  isSessionExpired: false,
};

// Tạo slice
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<{ sessionId: string }>) => {
      state.sessionId = action.payload.sessionId;
      state.isSessionExpired = false;
    },
    expireSession: (state) => {
      state.sessionId = null;
      state.isSessionExpired = true;
    },
  },
});

// Export actions
export const { setSession, expireSession } = sessionSlice.actions;

// Export reducer
export default sessionSlice.reducer;
