"use client";

// react hooks
import React, { useEffect, useState } from "react";

//components
import Button from "../button/Button";
import Summary from "../summary/Summary";
import Quiz from "../quiz/Quiz";
import FlashCard from "../flashCard/FlashCard";
import FilterComponent from "../responsive/FilterComponent";

// reading the queries
import { useSearchParams } from "next/navigation";

// redux hooks
import { useDispatch, useSelector } from "react-redux";

//redux slices for different different type
import { fetchSummary } from "../../../lib/features/summarySlice";
import { fetchQuiz, reset } from "../../../lib/features/quizSlice";
import { fetchFlash } from "../../../lib/features/flashCardSlice";

export default function Content() {
  const initData = { complexity: "", type: "" };

  // queies
  const [queries, setQueries] = useState(initData);
  const [topic, setTopic] = useState("");

  // for reading the queries
  const searchParams = useSearchParams();

  // dispatch actions
  const dispatch = useDispatch();

  // retrive the data from redux store
  const { summaryStatus, quizStatus, flashCardStatus } = useSelector(
    (store) => {
      return {
        summaryStatus: store?.summary?.summaryStatus,
        quizStatus: store?.quiz?.quizStatus,
        flashCardStatus: store?.flashCard?.flashcardStatus,
      };
    }
  );

  // update the url queries according to the filter
  useEffect(() => {
    const url = new URL(window.location.href);

    // storing the complexity
    const complexities = url.searchParams.getAll("complexity");
    const typeParam = url.searchParams.get("type");
    setQueries((pre) => {
      return {
        ...pre,
        complexity: complexities.length ? complexities.join(",") : "beginner",
        type: typeParam ? typeParam : "summary",
      };
    });
  }, [searchParams.get("type"), searchParams.getAll("complexity").length]);

  // call the actions according to topic type
  const handleSendMessage = async () => {
    if (queries?.type == "summary") {
      dispatch(fetchSummary({ ...queries, topic }));
      setTopic("");
    } else if (queries?.type == "quiz") {
      dispatch(reset());
      dispatch(fetchQuiz({ ...queries, topic }));
      setTopic("");
    } else if (queries?.type == "flashcards") {
      dispatch(fetchFlash({ ...queries, topic }));
      setTopic("");
    }
  };

  // taking topics from input tag
  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div className="flex flex-col w-[98%] min-h-[calc(100vh-60px)] justify-between md:justify-end relative overflow-auto">
      <div className={`md:hidden`}>
        <FilterComponent />
      </div>
      {/* Chat Area */}
      {queries.type === "summary" && <Summary {...queries} />}
      {queries.type === "quiz" && <Quiz complexity={queries.complexity} />}
      {queries.type === "flashcards" && <FlashCard />}

      {/* Input Area */}
      <div className="p-2 mb-3 mx-auto bg-gray-800 flex items-center w-full">
        <input
          type="text"
          value={topic}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-600 rounded-l-md bg-gray-700 text-white outline-none focus:border-white"
        />
        {/* hiting request for different different types */}
        <button
          onClick={handleSendMessage}
          disabled={
            summaryStatus === "loading" ||
            quizStatus == "loading" ||
            flashCardStatus == "loading"
          }
          className="bg-black  px-6 py-2 rounded-r-md hover:bg-gray-800 text-white hover:ring-1 hover:ring-white"
        >
          {summaryStatus === "loading" ||
          quizStatus === "loading" ||
          flashCardStatus === "loading"
            ? "Wait..."
            : "Send"}
        </button>
      </div>
      {/* navigate to home page if screen size greater than lg */}
      <div className="hidden lg:block">
        <Button route={"/"} icons={"fas fa-home"} />
      </div>
    </div>
  );
}
