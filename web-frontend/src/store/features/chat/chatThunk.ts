import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ChatResponse, SendMessagePayload } from "./chatTypes";
import api from "../../../services/api";
import axios from "axios";

export const sendMessage = createAsyncThunk<
  ChatResponse,
  SendMessagePayload,
  { rejectValue: string }
>("chat/sendMessage", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<ChatResponse>("/ai/chat", data);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to send message",
      );
    }
    return rejectWithValue("Failed to send message");
  }
});
