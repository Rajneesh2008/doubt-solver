"use client";
import React, { useState } from "react";

const SingleCard = ({ Q, A }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      {!show && (
        <div
          className=" h-60 flex items-center justify-center font-semibold bg-gray-700 p-4 transition duration-400  rounded-md rounded-t-none cursor-pointer "
          onClick={() => setShow(!show)}
        >
          {Q}
        </div>
      )}
      {show && (
        <div
          className=" h-60 flex items-center justify-center bg-gray-500 p-4 transition duration-400 rounded-md rounded-t-none "
          onClick={() => setShow(!show)}
        >
          {A}
        </div>
      )}
    </div>
  );
};

export default SingleCard;
