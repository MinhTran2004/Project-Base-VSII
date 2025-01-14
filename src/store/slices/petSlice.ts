import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkPetExistsThunk } from '../services/pet.service';
import { IApiResponse } from '../../types/types';

// Define a type for the slice state
interface PetState {
  exists: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: PetState = {
  exists: false,
  isLoading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkPetExistsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkPetExistsThunk.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.isLoading = false;
        state.exists = action.payload;
      })
      .addCase(checkPetExistsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.exists = false;
        state.error = action.payload ?? 'Unknown error occurred';
      });
  },
});

export default petSlice.reducer;
