import { createSlice } from "@reduxjs/toolkit";
import type { ContentState } from "./contentTypes";
import {
  fetchAllContent,
  addContent,
  deleteContent,
  searchContent,
} from "./contentThunks";

const initialState: ContentState = {
  contents: [],
  loading: false,
  error: null,
  currentContent: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    clearContentError: (state) => {
      state.error = null;
    },
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
    },
    clearCurrentContent: (state) => {
      state.currentContent = null;
    },

    clearSearch: (state) => {
      state.contents = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all content
      .addCase(fetchAllContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContent.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = action.payload;
      })
      .addCase(fetchAllContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch content";
      })

      // Add content
      .addCase(addContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContent.fulfilled, (state, action) => {
        state.loading = false;
        state.contents.unshift(action.payload); // makes it push to the start
      })
      .addCase(addContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add content";
      })

      .addCase(searchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.contents = action.payload;
      })

      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to search content";
      })

      // Delete content
      .addCase(deleteContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = state.contents.filter(
          (content) => content._id !== action.payload,
        );
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete content";
      });
  },
});

export const { clearContentError, setCurrentContent, clearCurrentContent } =
  contentSlice.actions;
export default contentSlice.reducer;
