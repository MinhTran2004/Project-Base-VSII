import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import ordersReducer from '../store/slices/ordersSlice';
import authsReducer from '../store/slices/authSlice';
import petsReducer from '../store/slices/petSlice';
export const store = configureStore({
    reducer:{
        orders: ordersReducer,
        auth: authsReducer,
        pet: petsReducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;