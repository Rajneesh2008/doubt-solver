"use client";
import React from "react";

const SingleCard = ({ Q, A }) => {
  return (
    <div className="block max-w-sm overflow-hidden p-6 bg-gradient-to-r from-green-500 via-green-600 to-primary hover:animate-flyin border border-transparent rounded-lg shadow-lg transform transition-transform duration-300 cursor-pointer">
      <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">
        {Q}
      </h5>
      <p className="font-medium text-white drop-shadow-md">{A}</p>
    </div>
  );
};

export default SingleCard;
