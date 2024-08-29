import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "../features/summarySlice";
import quizReducer from "../features/quizSlice";
import flashCardReducer from "../features/flashCardSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      summary: summaryReducer,
      quiz: quizReducer,
      flashCard: flashCardReducer,
    },
  });
};
