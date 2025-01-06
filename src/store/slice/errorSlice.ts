// errorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  status:
    | number
    | "FETCH_ERROR"
    | "PARSING_ERROR"
    | "TIMEOUT_ERROR"
    | "CUSTOM_ERROR";
  message: string;
  redirectToErrorPage: boolean;
}

const initialState: ErrorState = {
  status: 0,
  message: "",
  redirectToErrorPage: false, // Trạng thái điều hướng đến trang lỗi
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    navigateToErrorPage: (
      state,
      action: PayloadAction<{ status: ErrorState["status"]; message: unknown }>
    ) => {
      const { status, message } = action.payload;
      state.status = status;
      state.message =
        typeof message === "string" ? message : "Đã có lỗi xảy ra!!!";
      state.redirectToErrorPage = true; // Đánh dấu là cần điều hướng tới ErrorPage
    },
    clearError: (state) => {
      state.status = 0;
      state.message = "";
      state.redirectToErrorPage = false;
    },
  },
});

export const { navigateToErrorPage, clearError } = errorSlice.actions;
export default errorSlice.reducer;
