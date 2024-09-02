// lib/features/summarySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching quiz
export const fetchQuiz = createAsyncThunk("quiz/fetchQuiz", async (reqBody) => {
  const response = await axios.post(
    "https://doubt-solver-tgsr.onrender.com/doubt",
    reqBody
  );
  return response.data;
});
export const fetchFeedback = createAsyncThunk(
  "quiz/fetchFeedback",
  async (reqBody) => {
    const response = await axios.post(
      "https://doubt-solver-tgsr.onrender.com/feedback",
      reqBody
    );
    return response.data;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizData: null,
    quizStatus: "idle",
    quizScore: 0,
    totalQuiz: 0,
    attemptQuiz: 0,
    quizError: null,
    wrongSelectedQue: [],
    feedbackData: null,
    feedbackStatus: "idle",
    feedbackError: null,
  },
  reducers: {
    incScore: (state) => {
      state.quizScore += 1;
    },
    reset: (state) => {
      state.quizScore = 0;
      state.attemptQuiz = 0;
      state.wrongSelectedQue = [];
      state.quizData = null;
      state.feedbackData = null;
    },
    wrongSelection: (state, { payload }) => {
      state.wrongSelectedQue.push(payload);
    },
    attempted: (state) => {
      state.attemptQuiz += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.quizStatus = "loading";
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.quizStatus = "success";
        state.quizData = action.payload;
        state.totalQuiz = action?.payload?.quiz?.length;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.quizStatus = "failed";
        state.quizError = action.error.message;
      })
      .addCase(fetchFeedback.pending, (state) => {
        state.feedbackStatus = "loading";
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.feedbackStatus = "success";
        state.feedbackData = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.feedbackStatus = "failed";
        state.feedbackError = action.error.message;
      });
  },
});

export const { incScore, reset, wrongSelection, attempted } = quizSlice.actions;
export default quizSlice.reducer;
