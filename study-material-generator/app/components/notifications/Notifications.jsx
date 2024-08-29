import React from "react";
import Sidebar from "../sidebar/SideBar";

const Notifications = () => {
  return (
    <div className="">
      <div className="lg:hidden">
        <Sidebar />
      </div>
      <dir className="p-0">
        <p className="p-2 text-xl font-bold text-start">FeedBack</p>
      </dir>
    </div>
  );
};

export default Notifications;
