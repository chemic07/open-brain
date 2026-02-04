import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Content, AddContentPayload } from "./contentTypes";
import api from "../../../services/api";
import axios from "axios";

// all content
export const fetchAllContent = createAsyncThunk<
  Content[],
  void,
  { rejectValue: string }
>("content/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<Content[]>("/content");
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch content",
      );
    }
    return rejectWithValue("Failed to fetch content");
  }
});

//add content
export const addContent = createAsyncThunk<
  Content,
  AddContentPayload,
  { rejectValue: string }
>("content/add", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<Content>("/content", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to add content",
      );
    }
    return rejectWithValue("Failed to add content");
  }
});

//search content

export const searchContent = createAsyncThunk<
  Content[],
  string,
  { rejectValue: string }
>("/content/search", async (query, { rejectWithValue }) => {
  try {
    const res = await api.get<Content[]>("/content/search", {
      headers: {
        q: query,
      },
    });

    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.error || "Failed to search content",
      );
    }
    return rejectWithValue("Failed to search content");
  }
});

// del content by id
export const deleteContent = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("content/delete", async (contentId, { rejectWithValue }) => {
  try {
    await api.delete(`/content/${contentId}`);
    return contentId;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to delete content",
      );
    }
    return rejectWithValue("Failed to delete content");
  }
});

export const fetchContentByType = createAsyncThunk<
  Content[],
  string,
  { rejectValue: string }
>("content/fetchByType", async (type, { rejectWithValue }) => {
  try {
    const res = await api.get<Content[]>(`/content/type/${type}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch content by type",
      );
    }
    return rejectWithValue("Failed to fetch content by type");
  }
});
