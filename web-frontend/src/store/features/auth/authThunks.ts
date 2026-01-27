import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  LoginPayload,
  UserSignUpPayload,
  AuthResponse,
  User,
} from "./authTypes";
import api from "../../../services/api";
import axios from "axios";

//login

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<AuthResponse>("/auth/signin", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        (err.response?.data as any)?.message || "Login failed",
      );
    }
    return rejectWithValue("Login failed");
  }
});

//signup
export const signupUser = createAsyncThunk<
  AuthResponse,
  UserSignUpPayload,
  { rejectValue: string }
>("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<AuthResponse>("/auth/signup", data);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        (err.response?.data as any)?.message || "Register failed",
      );
    }
    return rejectWithValue("Register failed");
  }
});

//load me
export const loadUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<User>("/auth/me");
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue("Session expired");
      }
      return rejectWithValue("Session expired");
    }
  },
);
