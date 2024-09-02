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
    <div className=" mx-3 h-full shadow-sm shadow-gray-500 p-3  ">
      <div className="divide-gray-500 divide-y space-y-5 divide-opacity-50">
        {/* Select complexity level */}
        <div className="mb-6 ">
          <h1 className="text-black font-semibold ">Skill Level</h1>

          <div className="flex items-center   ">
            <input
              type="checkbox"
              name="complexity"
              value="beginner"
              className="text-primary w-4 h-4 rounded-sm focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={complexity.includes("beginner")}
            />
            <label className="ml-3 text-black  font-medium text-base">
              Beginner
            </label>
          </div>

          <div className="flex items-center ">
            <input
              type="checkbox"
              name="complexity"
              value="intermediate"
              className="text-primary w-4 h-4 rounded-sm focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={complexity.includes("intermediate")}
            />
            <label className="ml-3 text-black font-medium text-base">
              Intermediate
            </label>
          </div>

          <div className="flex items-center ">
            <input
              type="checkbox"
              name="complexity"
              value="advance"
              className="text-primary w-4 h-4 rounded-sm focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={complexity.includes("advance")}
            />
            <label className="ml-3 text-black font-medium text-base">
              Advance
            </label>
          </div>
        </div>

        <div className="pt-2">
          <h1 className="text-black font-semibold text-base">Content Type</h1>

          <div className="flex items-center">
            <input
              type="radio"
              name="types"
              value="summary"
              className="text-primary w-4 h-4 rounded-full focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={type === "summary"}
            />
            <label className="ml-3 text-black  font-medium text-base">
              Summary
            </label>
          </div>

          <div className="flex items-center ">
            <input
              type="radio"
              name="types"
              value="quiz"
              className="text-primary w-4 h-4 rounded-full focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={type === "quiz"}
            />
            <label className="ml-3 text-black  font-medium text-base">
              Quiz
            </label>
          </div>

          <div className="flex items-center ">
            <input
              type="radio"
              name="types"
              value="flashcards"
              className="text-primary w-4 h-4 rounded-full focus:ring-0 cursor-pointer"
              onChange={handleSelect}
              checked={type === "flashcards"}
            />
            <label className="ml-3 text-black  font-medium text-base">
              Flash-Cards
            </label>
          </div>
        </div>
        {suggestion?.length && type == "summary" && (
          <div className="space-y-2">
            <h1 className="text-black cursor-pointer font-semibold text-xl">
              You might like:
            </h1>
            <div className="overflow-y-auto h-80">
              <ul className="list-none pl-5 cursor-pointer last:mb-0 transition duration-100 overflow-hidden">
                {suggestion?.map((item, idx) => {
                  return (
                    <li
                      className=" bg-gray-200  hover:bg-green-500 p-2 hover:text-white hover:border-l-2 hover:border-l-primary "
                      key={idx + 1}
                      onClick={() => handleSuggestion(item)}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
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
