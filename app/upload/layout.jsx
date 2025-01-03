"use client";

import { useSelector } from "react-redux";
import LoginToUpload from "../components/LogintoUpload.jsx";

const layout = ({ children }) => {
  const { isLoggedIn, user, isLoading } = useSelector((state) => state.auth);

  return (
    <div className="pt-navbar">
      {isLoggedIn ? (
        <div
          style={{ backgroundImage: `url('bgImage.jpg')` }}
          className="flex justify-center items-center bg-no-repeat bg-cover bg-center h-[90vh] p-2 "
        >
          {children}{" "}
        </div>
      ) : (
        <LoginToUpload />
      )}
    </div>
  );
};

export default layout;
