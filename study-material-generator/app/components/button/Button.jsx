"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Button = ({ route, icons }) => {
  const router = useRouter();

  return (
    <div className="z-10 flex justify-center items-center ">
      <button
        onClick={() => router.push(`${route}`, { scroll: false })}
        className="fixed bottom-16 right-16 bg-gray-700 text-white w-16 h-16 lg:w-20 lg:h-20 text-xl flex justify-center items-center rounded-full hover:shadow-md hover:shadow-gray-300"
      >
        <i className={`${icons} font-bold text-4xl`}></i>
      </button>
    </div>
  );
};

export default Button;
