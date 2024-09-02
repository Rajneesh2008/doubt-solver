// lib/features/summarySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching summary
export const fetchSummary = createAsyncThunk(
  "summary/fetchSummary",
  async (reqBody) => {
    const response = await axios.post(
      "https://doubt-solver-tgsr.onrender.com/doubt",
      reqBody
    );
    return response.data;
  }
);

const summarySlice = createSlice({
  name: "summary",
  initialState: {
    summaryData: null,
    summaryStatus: "idle",
    summaryError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.summaryStatus = "loading";
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summaryStatus = "success";
        state.summaryData = action.payload;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.summaryStatus = "failed";
        state.summaryError = action.error.message;
      });
  },
});

export default summarySlice.reducer;
