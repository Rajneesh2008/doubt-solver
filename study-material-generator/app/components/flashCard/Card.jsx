"use client";
import React, { useState } from "react";

const SingleCard = ({ Q, A }) => {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {Q}
      </h5>
      <p className="font-normal text-gray-400 dark:text-gray-200">{A}</p>
    </div>
  );
};

export default SingleCard;
