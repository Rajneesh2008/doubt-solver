import React from "react";
import Sidebar from "../components/sidebar/SideBar";
import Contant from "../components/content/Content";
const page = () => {
  return (
    <div className="mx-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 min-h-[calc(100vh-60px)] mt-3">
      <div className="hidden md:block md:col-span-1 lg:col-span-2 shadow-sm shadow-white mr-1">
        <Sidebar />
      </div>

      <div className="  md:col-span-2 lg:col-span-4">
        <Contant />
      </div>
    </div>
  );
};

export default page;
