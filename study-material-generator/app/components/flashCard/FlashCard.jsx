"use client";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import SingleCard from "./Card";
import { Spin } from "../shimmerui/Loading";

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
  }

  return (
    <div className="flex-grow w-full mx-auto px-2">
      {flashCard?.length && (
        <h1 className="text-center font-bold text-4xl py-2 text-gradient bg-gradient-to-r from-green-500 to-primary bg-clip-text text-transparent">
          Flash Cards
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto lg:grid-cols-3 gap-6 w-[98%] m-auto">
        {flashCard?.map((item, idx) => {
          return <SingleCard key={item?.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default FlashCard;
