"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../../lib/features/summarySlice";
import QuizFeedback from "../feedback/Quizfeedback";

export default function Sidebar() {
  // Router hook to navigate
  const router = useRouter();

  // dispatch
  const dispatch = useDispatch();

  // retrive data from summaryStore
  const { suggestion, totalQuiz, attemptedQuiz, quizScore } = useSelector(
    (store) => {
      return {
        suggestion: store?.summary?.summaryData?.summary?.suggestions,
        totalQuiz: store?.quiz?.totalQuiz,
        attemptedQuiz: store?.quiz?.attemptQuiz,
        quizScore: store?.quiz?.quizScore,
      };
    },
    shallowEqual
  );

  // Storing the queries
  const [complexity, setComplexity] = useState([]);
  const [type, setType] = useState("");

  // console.log(resData?.summary?.suggestion);

  // Initialize state from query parameters
  useEffect(() => {
    const url = new URL(window.location.href);
    const complexities = url.searchParams.getAll("complexity");
    const typeParam = url.searchParams.get("type");

    setComplexity(complexities.length ? complexities : []);
    setType(typeParam || "");
  }, []);

  // Update the URL when complexity or type changes
  useEffect(() => {
    const url = new URL(window.location.href);

    // Remove existing complexity and type parameters
    url.searchParams.delete("complexity");
    url.searchParams.delete("type");

    // Add updated complexity parameters
    complexity.forEach((item) => {
      url.searchParams.append("complexity", item);
    });

    // Add updated type parameter
    if (type) {
      url.searchParams.set("type", type);
    }

    // Push the updated URL without triggering a page reload
    router.push(url.toString(), { scroll: false });
  }, [complexity, type]);

  // Updating the state functions
  const handleSelect = (e) => {
    const { name, value } = e.target;

    if (name === "complexity") {
      if (complexity.includes(value)) {
        setComplexity((prev) => prev.filter((item) => item !== value));
      } else {
        setComplexity((prev) => [...prev, value]);
      }
    } else if (name === "types") {
      setType(value);
    }
  };

  // you might like handler

  const handleSuggestion = (value) => {
    const queries = { complexity: complexity.join(","), type, topic: value };
    dispatch(fetchSummary(queries));
  };

  // console.log(suggestion);
  return (
    <div className="mt-5 mx-3 shadow-sm shadow-white p-3  ">
      <div className="divide-gray-500 divide-y space-y-5">
        {/* Select complexity level */}
        <div className="mb-6 ">
          <h1 className="text-white cursor-pointer font-semibold text-xl">
            Select Level
          </h1>

          <div className="flex items-center font-poppins  ">
            <input
              type="checkbox"
              name="complexity"
              value="beginner"
              className="text-black w-5 h-5 rounded-sm focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={complexity.includes("beginner")}
            />
            <label className="ml-3 text-white cursor-pointer font-medium text-lg">
              Beginner
            </label>
          </div>

          <div className="flex items-center font-poppins">
            <input
              type="checkbox"
              name="complexity"
              value="intermediate"
              className="text-black w-5 h-5 rounded-sm focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={complexity.includes("intermediate")}
            />
            <label className="ml-3 text-white cursor-pointer font-medium text-lg">
              Intermediate
            </label>
          </div>

          <div className="flex items-center font-poppins">
            <input
              type="checkbox"
              name="complexity"
              value="advance"
              className="text-black w-5 h-5 rounded-sm focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={complexity.includes("advance")}
            />
            <label className="ml-3 text-white cursor-pointer font-medium text-lg">
              Advance
            </label>
          </div>
        </div>

        <div className="pt-2">
          <h1 className="text-white cursor-pointer font-semibold text-xl">
            Select Type
          </h1>

          <div className="flex items-center font-poppins">
            <input
              type="radio"
              name="types"
              value="summary"
              className="text-black w-5 h-5 rounded-full focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={type === "summary"}
            />
            <label className="ml-3 text-white cursor-pointer font-medium text-lg">
              Summary
            </label>
          </div>

          <div className="flex items-center font-poppins">
            <input
              type="radio"
              name="types"
              value="quiz"
              className="text-black w-5 h-5 rounded-full focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={type === "quiz"}
            />
            <label className="ml-3 text-white cursor-pointer font-medium text-lg">
              Quiz
            </label>
          </div>

          <div className="flex items-center font-poppins">
            <input
              type="radio"
              name="types"
              value="flashcards"
              className="text-black w-5 h-5 rounded-full focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={type === "flashcards"}
            />
            <label className="ml-3 text-white cursor-pointer font-medium text-lg">
              Flash-Cards
            </label>
          </div>
        </div>
        {suggestion?.length && type == "summary" && (
          <div className="space-y-2 ">
            <h1 className="text-white cursor-pointer font-semibold text-xl">
              You might like:
            </h1>

            <ul className="list-none pl-5 cursor-pointer last:mb-0 transition duration-100">
              {suggestion?.map((item, idx) => {
                return (
                  <li
                    className="  hover:bg-gray-500 p-2 hover:border-l-2 hover:border-l-white"
                    key={idx + 1}
                    onClick={() => handleSuggestion(item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {type === "quiz" &&
          totalQuiz === attemptedQuiz &&
          attemptedQuiz > 0 && (
            <QuizFeedback
              complexity={complexity}
              totalQuiz={totalQuiz}
              userScore={quizScore}
            />
          )}
      </div>
    </div>
  );
}
