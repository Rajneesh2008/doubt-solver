"use client";
import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { incScore, reset } from "../../../lib/features/quizSlice";
import Spin from "../../components/shimmerUi/spin";
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
  }, []);

  const updateScore = () => {
    dispatch(incScore());
  };

  if (status === "loading") {
    return <Spin />;
  } else if (status === "failed") {
    return <p className="text-center">Error: Something went wrong {error}</p>;
  }

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      {quiz?.quiz?.length > 0 && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-center">Quiz Practice</h2>
          <p className="text-xl">
            Score: 0{score} / 0{totalQuiz}
          </p>
        </div>
      )}

      <div className="my-4">
        {quiz?.quiz.map((item, idx) => (
          <QuizCard key={item.id} {...item} updateScore={updateScore} />
        ))}
      </div>

      <div className="md:hidden">
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
