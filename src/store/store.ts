import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { apiCaller } from "./api/apiCaller";
import petReducer from "./features/petSlice";
import { persistReducer, persistStore } from "redux-persist";
import { petPersistConfig } from "./persist.config";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rtkQueryMiddware = [apiCaller.middleware];
const rootReducer = combineReducers({
  reducer: persistReducer(petPersistConfig, petReducer),
  apiCaller: apiCaller.reducer,
});

const store = configureStore({
  reducer: rootReducer as Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(rtkQueryMiddware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
export default store;
