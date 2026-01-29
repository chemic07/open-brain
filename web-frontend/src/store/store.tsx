import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth";
import { contentReducer } from "./features/content";
import { shareRedcuer } from "./features/share";
import { searchReducer } from "./features/search";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    share: shareRedcuer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
