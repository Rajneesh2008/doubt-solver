"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="  bg-gray-800 z-50 rounded-md shadow-sm hover:shadow-md shadow-gray-300 hover:shadow-gray-300 cursor-pointer">
      <h1
        className="px-2 py-3 text-3xl font-bold"
        onClick={() => router.replace("/", { scroll: false })}
      >
        Chat Bot
      </h1>
    </div>
  );
};

export default Navbar;
