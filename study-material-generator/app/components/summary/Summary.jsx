"use clinet";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Spin from "../shimmerui/Loading";
import { fetchSummary } from "../../../lib/features/summarySlice";

const Summary = ({ complexity, type }) => {
  const dispatch = useDispatch();
  const { summary, status, error } = useSelector((store) => {
    return {
      summary: store?.summary?.summaryData?.summary,
      status: store?.summary?.summaryStatus,
      error: store?.summary?.summaryError,
    };
  }, shallowEqual);
  const handleSuggestion = (value) => {
    const queries = { complexity: complexity, type, topic: value };
    dispatch(fetchSummary(queries));
  };

  if (status === "loading") {
    return <Spin />;
  } else if (status === "failed") {
    <p>Error: Something went wrong \n {error}</p>;
  }
  return (
    <div className="flex-grow p-4 overflow-y-auto  text-black text-lg first-letter:font-bold first-letter:text-2xl bg-custom-bg">
      {summary?.topic && (
        <p className="  text-xl font-semibold mb-1 underline underline-offset-2">
          {" "}
          {summary?.topic}
        </p>
      )}
      <p className="  text-lg text-justify"> {summary?.summary}</p>

      {summary?.suggestions.length && (
        <div className="mt-5 flex flex-col md:hidden text-black">
          <hr className="my-4 md:hidden" />
          <h1 className=" cursor-pointer font-semibold text-xl">
            You might like:
          </h1>

          <ul className="md:list-none sm:list-decimal  pl-5 cursor-pointer last:mb-0 transition duration-100">
            {summary?.suggestions?.map((item, idx) => {
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
    </div>
  );
};

export default Summary;
