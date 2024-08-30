"use client";
import React, { useEffect, useRef } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "../../../lib/features/quizSlice";

const QuizFeedback = ({ complexity, totalQuiz, userScore }) => {
  const dispatch = useDispatch();
  const { data, status, feedbackRes } = useSelector((store) => {
    return {
      data: store?.quiz?.wrongSelectedQue,
      status: store?.quiz?.feedbackStatus,
      feedbackRes: store?.quiz?.feedbackData?.feedback?.feedback,
    };
  }, shallowEqual);

  let ref = useRef();
  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      dispatch(fetchFeedback({ data, complexity, totalQuiz, userScore }));
    }, 1000);
    return () => {
      clearTimeout(ref.current);
    };
  }, []);

  return (
    <div className="mt-4 ">
      <h1 className="text-center font-semibold text-2xl mb-2 mt-4 border-b-2">
        Feedback
      </h1>
      {status === "loading" ? (
        <p className="text-lg ">Loading...</p>
      ) : (
        <p className="text-lg font-sans text-justify first-letter:font-bold first-letter:text-2xl">
          {feedbackRes}
        </p>
      )}
    </div>
  );
};

export default QuizFeedback;
