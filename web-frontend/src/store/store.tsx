import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth";
import { contentReducer } from "./features/content";
import { shareRedcuer } from "./features/share";
import { searchReducer } from "./features/search";
import { userReducer } from "./features/user";
import { chatReducer } from "./features/chat";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    share: shareRedcuer,
    search: searchReducer,
    user: userReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
