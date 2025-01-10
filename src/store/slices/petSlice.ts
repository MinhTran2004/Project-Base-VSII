import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";
import { IPet, Status } from "../../types/types";
import axios from "axios";
import { RootState } from "../store";
import HTTP_CODE from "../../configs/httpCode";

interface PetState {
  pets: IPet[];
  status: "idle" | "loading" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: PetState = {
  pets: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchPetsByStatus = createAsyncThunk(
  "pets/fetchByStatus",
  async ({ status }: { status: Status }, { rejectWithValue }) => {
    if (!navigator.onLine) {
      console.error("No internet connection.");
      return rejectWithValue(
        "No internet connection. Please check your network."
      );
    }
    try {
      const response = await apiClient.get(
        `/pet/findByStatus?status=${status}`
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error caught in fetchPetsByStatus:", error);

      if (axios.isAxiosError(error)) {
        if (!error.response) {
          console.error(
            "No response from server, possible network issue:",
            error
          );
          return rejectWithValue(
            "Network error: Please check your connection."
          );
        }

        const errorMessage =
          HTTP_CODE[error.response.status] ||
          `Unexpected server error: ${error.response.status}`;

        console.error("Error from server:", {
          status: error.response.status,
          message: errorMessage,
          data: error.response.data,
        });
        return rejectWithValue(errorMessage);
      }
      console.error("Unexpected error:", error);
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetsByStatus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPetsByStatus.fulfilled, (state, action) => {
        state.status = "idle";
        state.pets = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 10);
      })
      .addCase(fetchPetsByStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = petSlice.actions;
export const selectPets = (state: RootState) => state.pets.pets;
export const selectStatus = (state: RootState) => state.pets.status;
export const selectError = (state: RootState) => state.pets.error;
export const selectCurrentPage = (state: RootState) => state.pets.currentPage;
export const selectTotalPages = (state: RootState) => state.pets.totalPages;
export default petSlice.reducer;
