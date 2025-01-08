import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";
import { IPet, Status } from "../../types/types";
import axios from "axios";
import { RootState } from "../store";

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
  async (status: Status, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/pet/findByStatus?status=${status}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred.");
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
