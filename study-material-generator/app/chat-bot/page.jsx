import React from "react";
import Sidebar from "../components/sidebar/SideBar";
import Contant from "../components/content/Content";
const page = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 mt-2">
      <div className="h-full px-3 py-4 overflow-y-auto hidden md:block md:col-span-1 lg:col-span-2 shadow-sm shadow-gray-500 mr-1 ">
        <Sidebar />
      </div>

      <div className="  md:col-span-2 lg:col-span-5">
        <Contant />
      </div>
    </div>
  );
};

export default page;
