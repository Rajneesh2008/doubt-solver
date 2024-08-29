"use client";
import React, { useEffect } from "react";
import QuizCard from "./QuizCard";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { incScore, reset } from "../../../lib/features/quizSlice";
import Spin from "../../components/shimmerUi/spin";

const Quiz = () => {
  const dispatch = useDispatch();
  const { score, status, quiz, error, totalQuiz } = useSelector(
    (store) => ({
      score: store.quiz.quizScore,
      totalQuiz: store.quiz.totalQuiz,
      status: store.quiz.quizStatus,
      quiz: store.quiz.quizData,
      error: store.quiz.quizError,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(reset());
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
    <div className="p-4">
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
    </div>
  );
};

export default Quiz;
