import { createSlice } from "@reduxjs/toolkit";
import type { PaymentState } from "./paymentTypes";
import { createCheckout, cancelSubscription } from "./paymentThunk";

const initialState: PaymentState = {
  loading: false,
  error: null,
  subscription: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create checkout
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create checkout";
      })

      // Cancel subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.loading = false;
        if (state.subscription?.subscription) {
          state.subscription.subscription.cancelAtPeriodEnd = true;
        }
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to cancel subscription";
      });
  },
});

export const { clearPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;
