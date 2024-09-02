"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="   bg-gradient-to-r from-green-500 via-green-600 to-primary  shadow-sm hover:shadow-md shadow-primary hover:shadow-primary transition duration-100 cursor-pointer">
      <h1
        className="px-5 text-white py-3 text-3xl font-bold "
        onClick={() => router.replace("/", { scroll: false })}
      >
        Chat Bot
      </h1>
    </div>
  );
};

export default Navbar;
