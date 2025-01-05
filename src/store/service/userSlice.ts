import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiResponse, IUser } from "../../types/types";
import { addUser, getUserByUserName, updateUser } from "../axios/user.axios";

interface UserState {
    user: IApiResponse | IUser | null
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserByUserName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserByUserName.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(getUserByUserName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action: PayloadAction<IApiResponse>) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<IApiResponse>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})

export default userSlice.reducer