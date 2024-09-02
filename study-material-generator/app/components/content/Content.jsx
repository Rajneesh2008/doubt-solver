"use client";
import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import Summary from "../summary/Summary";
import Quiz from "../quiz/Quiz";
import FlashCard from "../flashCard/FlashCard";
import FilterComponent from "../responsive/FilterComponent";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../../lib/features/summarySlice";
import { fetchQuiz, reset } from "../../../lib/features/quizSlice";
import { fetchFlash } from "../../../lib/features/flashCardSlice";

export default function Content() {
  const initData = { complexity: "", type: "" };
  const [queries, setQueries] = useState(initData);
  const [topic, setTopic] = useState("");
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { summaryStatus, quizStatus, flashCardStatus } = useSelector(
    (store) => ({
      summaryStatus: store?.summary?.summaryStatus,
      quizStatus: store?.quiz?.quizStatus,
      flashCardStatus: store?.flashCard?.flashcardStatus,
    })
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const complexities = url.searchParams.getAll("complexity");
    const typeParam = url.searchParams.get("type");
    setQueries((pre) => ({
      ...pre,
      complexity: complexities.length ? complexities.join(",") : "beginner",
      type: typeParam ? typeParam : "summary",
    }));
  }, [searchParams.get("type"), searchParams.getAll("complexity").length]);

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

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  return (
    <div className="flex flex-col w-[98%] h-[calc(100vh-60px)] relative ">
      <div className="md:hidden">
        <FilterComponent />
      </div>

      {/* Scrollable Quiz/Summary/Flashcard Area */}
      <div className="flex-grow w-full mx-auto p-4 overflow-y-auto">
        {queries.type === "summary" && <Summary {...queries} />}
        {queries.type === "quiz" && <Quiz complexity={queries.complexity} />}
        {queries.type === "flashcards" && <FlashCard />}
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="p-2 mb-3 mx-auto flex items-center bg-primary rounded-md w-full">
        <div className="px-2 py-1  flex items-center w-full">
          <input
            type="text"
            value={topic}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-grow  py-2 border text-white rounded-l-md  bg-green-500 placeholder-gray-200 outline-none focus:border-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={
              summaryStatus === "loading" ||
              quizStatus == "loading" ||
              flashCardStatus == "loading"
            }
            className="bg-primary h-[41px] px-6 py-2 rounded-r-md hover:animate-flyin text-white hover:bg-green-700 border border-gray-500"
          >
            {summaryStatus === "loading" ||
            quizStatus === "loading" ||
            flashCardStatus === "loading" ? (
              <p className="animate-spin">⏳</p>
            ) : (
              <i className="fas fa-paper-plane text-xl"></i>
            )}
          </button>
        </div>
      </div>

      {/* Navigate to Home Button for Larger Screens */}
      <div className="hidden lg:block">
        <Button route={"/"} icons={"fas fa-home"} />
      </div>
    </div>
  );
}
