import { createSlice } from "@reduxjs/toolkit";
import type { ShareState } from "./shareTypes";
import {
  generateShareLink,
  getSharedContent,
  toggleShareLink,
} from "./shareThunk";

const initialState: ShareState = {
  shareLink: null,
  sharedContent: null,
  loading: false,
  error: null,
};

const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    clearShareError: (state) => {
      state.error = null;
    },
    clearSharedContent: (state) => {
      state.sharedContent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // share link
      .addCase(generateShareLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateShareLink.fulfilled, (state, action) => {
        state.loading = false;
        state.shareLink = {
          hash: action.payload.hash,
          userId: "", // Will be populated by backend
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      })
      .addCase(generateShareLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to generate share link";
      })

      // get shared content
      .addCase(getSharedContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSharedContent.fulfilled, (state, action) => {
        state.loading = false;
        state.sharedContent = action.payload;
      })
      .addCase(getSharedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Share link not found";
      })

      // toggle share link
      .addCase(toggleShareLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleShareLink.fulfilled, (state, action) => {
        state.loading = false;
        state.shareLink = action.payload;
      })
      .addCase(toggleShareLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to toggle share link";
      });
  },
});

export const { clearShareError, clearSharedContent } = shareSlice.actions;
export default shareSlice.reducer;
