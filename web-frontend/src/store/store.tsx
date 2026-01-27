import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // content:
    // share:
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
