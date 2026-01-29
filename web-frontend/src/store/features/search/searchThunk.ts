import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SearchContentPayload, SearchResponse } from "./searchTypes";
import axios from "axios";
import api from "../../../services/api";

export const searchContent = createAsyncThunk<
  SearchResponse,
  SearchContentPayload,
  { rejectValue: string }
>("search/searchContent", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<SearchResponse>("/ai/search", {
      query: data.query,
      limit: data.limit,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.error);
    }
    return rejectWithValue("Failed to search content");
  }
});
