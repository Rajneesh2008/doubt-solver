import React from "react";

const FilterComponent = () => {
  return (
    <div className="md:hidden flex justify-around mt-4 items-center">
      <div>
        <select
          name=""
          className="border focus:border-none focus:ring-1 bg-gray-800
           focus:ring-white mb-4 px-4 py-3 rounded-none shadow-sm text-base text-white w-33 cursor-pointer"
          id=""
        >
          <option value="">--Select Level--</option>
          <option className="hover:bg-gray-700 py-1" value="beginner">
            Beginner
          </option>
          <option value="intermediate">Intermediate</option>
          <option value="advance">Advance</option>
        </select>
      </div>
      <div>
        <select
          name=""
          className="border focus:border-none focus:ring-1
           focus:ring-white mb-4 px-4 py-3 bg-gray-800 rounded-none shadow-sm text-base text-white w-33"
          id=""
        >
          <option value="">--Select Type--</option>
          <option value="">Summary</option>
          <option value="">Quiz</option>
          <option value="">Flash-Cards</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
