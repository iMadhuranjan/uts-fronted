import React from "react";
import Sidebar from "./Sidebar";

const layout = ({ children }) => {
  return (
    <div className="pt-navbar m-1 md:mx-10 lg:mx-20 h-full flex flex-col-reverse md:flex-row">
      <div className="w-full md:w-2/3  ">{children}</div>
      <div className= " w-full md:w-1/3">
        <Sidebar />
      </div>
    </div>
  );
};

export default layout;
