import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import Spin from "../../components/shimmerUi/spin";

const Summary = () => {
  const { summary, status, error } = useSelector((store) => {
    return {
      summary: store?.summary?.summaryData?.summary,
      status: store?.summary?.summaryStatus,
      error: store?.summary?.summaryError,
    };
  }, shallowEqual);

  if (status === "loading") {
    return <Spin />;
  } else if (status === "failed") {
    <p>Error: Something went wrong \n {error}</p>;
  }
  return (
    <div className="flex-grow p-4 overflow-y-auto bg-gray-800 text-white text-lg first-letter:font-bold first-letter:text-2xl">
      {summary?.topic && (
        <p className=" bg-gray-800 text-white text-xl font-semibold mb-1 underline underline-offset-2">
          {" "}
          {summary?.topic}
        </p>
      )}
      <p className=" bg-gray-800 text-white text-lg font-poppins first-letter:font-bold first-letter:text-2xl">
        {" "}
        {summary?.summary}
      </p>
    </div>
  );
};

export default Summary;
