import { createSlice } from "@reduxjs/toolkit";
import type { ChatState } from "./chatTypes";
import { sendMessage } from "./chatThunk";

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
  sources: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.messages = [];
      state.sources = [];
      state.error = null;
    },
    addUserMessage: (state, action) => {
      state.messages.push({
        role: "user",
        content: action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    clearChatError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          role: "assistant",
          content: action.payload.message,
          timestamp: new Date().toISOString(),
        });
        state.sources = action.payload.sources;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send message";
      });
  },
});

export const { clearChat, addUserMessage, clearChatError } = chatSlice.actions;
export default chatSlice.reducer;
