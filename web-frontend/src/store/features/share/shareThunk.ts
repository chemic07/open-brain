import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GenerateShareLinkResponse,
  SharedContent,
  ShareLink,
  ToggleSharePayload,
} from "./shareTypes";
import api from "../../../services/api";
import axios from "axios";

// Generate share link
export const generateShareLink = createAsyncThunk<
  GenerateShareLinkResponse,
  void,
  { rejectValue: string }
>("share/generate", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post<GenerateShareLinkResponse>("/share/generate");
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.erro);
    }
    return rejectWithValue("Failed to generate share link");
  }
});

// get shared link content this is public
export const getSharedContent = createAsyncThunk<
  SharedContent,
  string,
  { rejectValue: string }
>("share/getContent", async (hash, { rejectWithValue }) => {
  try {
    const res = await api.get<SharedContent>(`/share/${hash}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.error);
    }
    return rejectWithValue("Share link not found");
  }
});

// toggle access
export const toggleShareLink = createAsyncThunk<
  ShareLink,
  ToggleSharePayload,
  { rejectValue: string }
>("share/toggle", async (data, { rejectWithValue }) => {
  try {
    const res = await api.patch<{ shareLink: ShareLink }>(
      "/share/toggle",
      data,
    );
    return res.data.shareLink;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.error);
    }
    return rejectWithValue("Failed to toggle share link");
  }
});
