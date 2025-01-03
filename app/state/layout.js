import React from "react";

const layout = ({ children }) => {
  return (
    <div
      id="scrollable-container"
      className="pt-navbar mx-3 md:mx-10 lg:mx-20 my-5"
    >
      {children}
    </div>
  );
};

export default layout;
