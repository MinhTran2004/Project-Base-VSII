// IPet
import { createSlice } from "@reduxjs/toolkit";
import { IPet } from "../../types/types";
// import { RootState } from "../store";

export interface PetsState {
  pets: IPet[];
}

const initialState: PetsState = {
  pets: [],
};

export const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    //logic here
  },
});
// export const selectCount = (state: RootState) => state.reducer.pets;
export default petSlice.reducer;
