// lib/features/summarySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching quiz
export const fetchFlash = createAsyncThunk(
  "flashCard/fetchFlash",
  async (reqBody) => {
    const response = await axios.post("https://doubt-solver-tgsr.onrender.com/doubt", reqBody);

    return response.data;
  }
);

const flashSlice = createSlice({
  name: "flashCard",
  initialState: {
    flashcardData: null,
    flashcardStatus: "idle",
    flashcardError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlash.pending, (state) => {
        state.flashcardStatus = "loading";
      })
      .addCase(fetchFlash.fulfilled, (state, action) => {
        state.flashcardStatus = "success";
        state.flashcardData = action.payload;
      })
      .addCase(fetchFlash.rejected, (state, action) => {
        state.flashcardStatus = "failed";
        state.flashcardError = action.error;
      });
  },
});

// export const {  } = flashSlice.actions;
export default flashSlice.reducer;
