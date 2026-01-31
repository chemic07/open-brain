import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateCheckoutPayload, CheckoutResponse } from "./paymentTypes";
import api from "../../../services/api";
import axios from "axios";

export const createCheckout = createAsyncThunk<
  CheckoutResponse,
  CreateCheckoutPayload,
  { rejectValue: string }
>("payment/createCheckout", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<CheckoutResponse>(
      "/payment/create-checkout",
      data,
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to create checkout",
      );
    }
    return rejectWithValue("Failed to create checkout");
  }
});

export const cancelSubscription = createAsyncThunk<
  { message: string; cancelAt: Date },
  void,
  { rejectValue: string }
>("payment/cancel", async (_, { rejectWithValue }) => {
  try {
    const response = await api.post("/payment/cancel");
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to cancel subscription",
      );
    }
    return rejectWithValue("Failed to cancel subscription");
  }
});
