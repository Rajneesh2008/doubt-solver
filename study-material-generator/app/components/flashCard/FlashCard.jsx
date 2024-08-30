"use client";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import SingleCard from "./Card";
import Spin from "../../components/shimmerUi/spin";
const FlashCard = () => {
  const { flashCard, status, error } = useSelector((store) => {
    return {
      status: store?.flashCard?.flashcardStatus,
      flashCard: store?.flashCard?.flashcardData?.flashcards,
      error: store?.flashCard?.flashcardError,
    };
  }, shallowEqual);

  if (status === "loading") {
    return <Spin />;
  } else if (status === "failed") {
    <p className="absolute top-1/2 left-1/2 z-50 text-red-700">
      Error: Something went wrong {error}
    </p>;
  }

  return (
    <div className="flex-grow p-4 overflow-y-auto">
      {flashCard?.length && (
        <h1 className="text-center font-bold text-xl py-2 shadow-sm shadow-white mb-4">
          Flash Cards
        </h1>
      )}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 gap-3 w-[98%] m-auto">
        {flashCard?.map((item, idx) => {
          return <SingleCard key={item?.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default FlashCard;
