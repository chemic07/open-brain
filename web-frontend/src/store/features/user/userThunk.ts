import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  UserProfile,
  UserStats,
  UpdateUserProfilePayload,
  UserChangePasswordPayload,
} from "./userTypes";
import api from "../../../services/api";
import axios from "axios";

// me
export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>("user/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<UserProfile>("/user/profile");
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch profile",
      );
    }
    return rejectWithValue("Failed to fetch profile");
  }
});

// stats
export const fetchUserStats = createAsyncThunk<
  UserStats,
  void,
  { rejectValue: string }
>("user/fetchStats", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<UserStats>("/user/stats");
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch stats",
      );
    }
    return rejectWithValue("Failed to fetch stats");
  }
});

// Update  profile
export const updateUserProfile = createAsyncThunk<
  UserProfile, //returned
  UpdateUserProfilePayload, // passed
  { rejectValue: string }
>("user/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const res = await api.patch<UserProfile>("/user/profile", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update profile",
      );
    }
    return rejectWithValue("Failed to update profile");
  }
});

// change password
export const changePassword = createAsyncThunk<
  { message: string },
  UserChangePasswordPayload,
  { rejectValue: string }
>("user/changePassword", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<{ message: string }>(
      "/user/change-password",
      data,
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to change password",
      );
    }
    return rejectWithValue("Failed to change password");
  }
});

// Delete  account
export const deleteUserAccount = createAsyncThunk<
  void,
  string, // password passing
  { rejectValue: string }
>("user/deleteAccount", async (password, { rejectWithValue }) => {
  try {
    await api.delete("/user/account", { data: { password } });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to delete account",
      );
    }
    return rejectWithValue("Failed to delete account");
  }
});
