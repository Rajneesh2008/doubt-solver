"use client";
import React, { useEffect, useState } from "react";
import Option from "./Options";
import { useDispatch } from "react-redux";
import { attempted, wrongSelection } from "../../../lib/features/quizSlice";
const Quiz = ({ id, question, options, correctAnswer, updateScore }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();
  // Reset state when a new quiz is loaded
  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option == correctAnswer) {
      updateScore();
    } else {
      dispatch(
        wrongSelection({
          id,
          question,
          selectedOption: option,
          correctAnswer: correctAnswer,
        })
      );
    }
    dispatch(attempted());
  };

  return (
    <div>
      <h2 className="text-xl my-4">
        {id}.{question}
      </h2>
      <div className="grid lg:grid-cols-2 grid-flow-row gap-4">
        {options.map((option, idx) => {
          return (
            <Option
              key={idx + 1}
              handleOptionClick={handleOptionClick}
              correctAnswer={correctAnswer}
              selectedOption={selectedOption}
              option={option}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;
