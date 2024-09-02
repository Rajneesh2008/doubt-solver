"use client";
import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { incScore, reset } from "../../../lib/features/quizSlice";
import Spin from "../shimmerui/Loading";
import QuizFeedback from "../feedback/Quizfeedback";

const Quiz = ({ complexity }) => {
  const dispatch = useDispatch();
  const [feedbackVisual, setFeedBackVisual] = useState(false);
  const { score, status, quiz, error, totalQuiz, attemptedQuiz } = useSelector(
    (store) => ({
      score: store.quiz.quizScore,
      totalQuiz: store.quiz.totalQuiz,
      status: store.quiz.quizStatus,
      quiz: store.quiz.quizData,
      error: store.quiz.quizError,
      attemptedQuiz: store?.quiz?.attemptQuiz,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(reset());
    setFeedBackVisual(false);
  }, [dispatch]);

  const updateScore = () => {
    dispatch(incScore());
  };

  if (status === "loading") {
    return <Spin />;
  } else if (status === "failed") {
    return <p className="text-center">Error: Something went wrong {error}</p>;
  }

  return (
    <div className="flex flex-col flex-grow h-full">
      {/* Header with Score */}
      {quiz?.quiz?.length > 0 && (
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold text-center">Quiz Practice</h2>
          <p className="font-bold">
            Score: {score}/{totalQuiz}
          </p>
        </div>
      )}

      {/* Scrollable Quiz Content */}
      <div className="flex-grow overflow-y-auto p-4">
        {quiz?.quiz.map((item, idx) => (
          <QuizCard key={item.id} {...item} updateScore={updateScore} />
        ))}
      </div>

      {/* Feedback Section for Small Screens */}
      <div className="p-4 lg:hidden ">
        {totalQuiz === attemptedQuiz && attemptedQuiz > 0 && (
          <QuizFeedback
            complexity={complexity}
            totalQuiz={totalQuiz}
            userScore={score}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
