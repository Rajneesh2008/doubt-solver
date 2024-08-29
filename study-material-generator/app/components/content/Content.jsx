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

//redux slices for different different type
import { fetchSummary } from "../../../lib/features/summarySlice";
import { fetchQuiz } from "../../../lib/features/quizSlice";
import { fetchFlash } from "../../../lib/features/flashCardSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Content() {
  const initData = { complexity: "", type: "" };

  // queies
  const [queries, setQueries] = useState(initData);
  const [topic, setTopic] = useState("");
  // for reading the queries
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { summaryStatus, quizStatus, flashCardStatus } = useSelector(
    (store) => {
      return {
        summaryStatus: store?.summary?.summaryStatus,
        quizStatus: store?.quiz?.quizStatus,
        flashCardStatus: store?.flashCard?.flashcardStatus,
      };
    }
  );
  useEffect(() => {
    const url = new URL(window.location.href);
    const complexities = url.searchParams.getAll("complexity");
    const typeParam = url.searchParams.get("type");
    setQueries((pre) => {
      return {
        ...pre,
        complexity: complexities.length ? complexities.join(",") : "easy",
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
    <div className="flex flex-col w-[98%] min-h-[100vh] justify-end relative">
      {/* Chat Area */}
      {queries.type === "summary" && <Summary />}
      {queries.type === "quiz" && <Quiz />}
      {queries.type === "flashcards" && <FlashCard />}

      {/* Input Area */}
      <div className="lg:hidden">
        <FilterComponent />
      </div>
      <div className="p-4 mb-4 bg-gray-800 flex items-center w-full">
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
          className="bg-black p-2 px-6 rounded-r-md hover:bg-gray-800 text-white hover:ring-1 hover:ring-white"
        >
          {summaryStatus === "loading" ||
          quizStatus === "loading" ||
          flashCardStatus === "loading"
            ? "Please wait!..."
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
