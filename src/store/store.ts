import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query"
// import { userApi } from "./service/user.service"


// export const store = configureStore({
//   reducer: {
//     [userApi.reducerPath]: userApi.reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(userApi.middleware),
// })

// setupListeners(store.dispatch)

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

import userReducer from "./service/userSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
