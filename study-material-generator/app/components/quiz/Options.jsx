"use client";
import React from "react";

const Options = ({
  handleOptionClick,
  option,
  correctAnswer,
  selectedOption,
}) => {
  return (
    <button
      onClick={() => handleOptionClick(option)}
      className={`py-2 border rounded-md shadow-sm shadow-gray-500 ${
        selectedOption
          ? option === correctAnswer
            ? "bg-green-500 text-white"
            : option === selectedOption
            ? "bg-red-500 text-white"
            : "bg-white text-black"
          : "bg-white text-black"
      }`}
      disabled={selectedOption !== null}
    >
      {option}
    </button>
  );
};

export default Options;
