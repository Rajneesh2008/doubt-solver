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
    <div className="mt-4  h-80">
      <h1 className="text-center font-semibold text-2xl mb-2 mt-4 border-b-2">
        Feedback
      </h1>
      <div className="h-full overflow-y-auto">
        {status === "loading" ? (
          <div className=" flex items-center justify-start gap-3">
            <p className="animate-spin w-4">⏳</p>
            <p className="text-lg text-primary font-semibold "> Loading... </p>
          </div>
        ) : (
          <p className="text-base font-sans text-justify first-letter:font-bold first-letter:text-2xl overflow-hidden">
            {feedbackRes}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizFeedback;
