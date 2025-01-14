import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a thunk for checking pet existence
export const checkPetExistsThunk = createAsyncThunk<boolean, number, { rejectValue: string }>(
    'pet/checkExists',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`https://petstore.swagger.io/v2/pet/${id}`);
        return response.status === 200;
      } catch (error) {
        return rejectWithValue('danh sach k co pet');
      }
    }
  );