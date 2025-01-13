import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient, { handleApiError } from "../../utils/apiClient";
import { IPet, Status } from "../../types/types";
import { RootState } from "../store";

interface PetState {
  pets: IPet[];
  status: "Idle" | "loading" | "success" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: PetState = {
  pets: [],
  status: "Idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchPetsByStatus = createAsyncThunk(
  "pets/fetchByStatus",
  async ({ status }: { status: Status }, { rejectWithValue }) => {
    if (!navigator.onLine) {
      return rejectWithValue("Network error: Please check your connection.");
    }
    try {
      const response = await apiClient.get(
        `/pet/findByStatus?status=${status}`
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return rejectWithValue(errorMessage);
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
        state.status = "success";
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
