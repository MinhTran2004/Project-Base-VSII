import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./service/api";
import sessionReducer from "./slice/sessionSlice";
import errorReducer from "./slice/errorSlice";
const rootReducer = combineReducers({
  session: sessionReducer,
  error: errorReducer,
  [api.reducerPath]: api.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Export kiểu của store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
