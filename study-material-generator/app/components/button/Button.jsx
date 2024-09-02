"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Button = ({ route, icons }) => {
  const router = useRouter();

  return (
    <div className="z-10 flex justify-center items-center ">
      <button
        onClick={() => router.push(`${route}`, { scroll: false })}
        className="fixed bottom-20 right-16  bg-gradient-to-r from-green-500 via-green-600 to-primary text-white lg:w-20 lg:h-20 text-xl flex justify-center items-center rounded-full hover:shadow-md hover:shadow-primary"
      >
        <i className={`${icons} font-bold text-4xl`}></i>
      </button>
    </div>
  );
};

export default Button;
