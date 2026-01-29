import { createSlice } from "@reduxjs/toolkit";
import type { SearchContentState } from "./searchTypes";
import { searchContent } from "./searchThunk";

const initialState: SearchContentState = {
  results: [],
  query: "",
  loading: false,
  error: null,
  total: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.query = "";
      state.error = null;
      state.total = 0;
    },
    clearSearchError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search content
      .addCase(searchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.finalResult;
        state.query = action.payload.query;
        state.total = action.payload.total;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!;
        state.results = [];
        state.total = 0;
      });
  },
});

export const { clearSearch, clearSearchError } = searchSlice.actions;
export default searchSlice.reducer;
