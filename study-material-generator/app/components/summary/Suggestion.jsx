import React from "react";
import { useSelector, shallowEqual } from "react-redux";
const Suggestion = () => {
  // retrive data from summaryStore
  const { suggestion } = useSelector((store) => {
    return {
      suggestion: store?.summary?.summaryData?.suggestion,
    };
  }, shallowEqual);
  return (
    <div>
      {suggestion.length && (
        <div className="pt-2">
          <h1 className="text-white cursor-pointer font-semibold text-xl">
            You might like:
          </h1>

          <ul className="list-disc pl-5 cursor-pointer">
            <li>{suggestion[0]}</li>
            <li>{suggestion[1]}</li>
            <li>{suggestion[2]}</li>
            <li>{suggestion[3]}</li>
            <li>{suggestion[4]}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Suggestion;
