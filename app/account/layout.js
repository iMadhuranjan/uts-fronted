"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation
import { useSelector } from "react-redux"; // Redux for global auth state
import UserQrProfile from "./UserQrProfile";
import AccountPage from "./page";
import UnauthorizedPage from "../components/Unauthorize";
 
const Layout = ({ children }) => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth); // Use your actual auth state

  return (
    <div
      className="pt-navbar bg-no-repeat bg-cover bg-center px-2 md:px-10 lg:px-20"
      style={{ backgroundImage: `url('bgImage.jpg')` }}
    >
      {isLoggedIn ? (
        <div className=" min-h-screen flex flex-col md:flex-row ">
          <div className=" w-full md:w-1/3">
            <AccountPage />
          </div>

          <div className=" w-full md:w-2/3 h-full md:h-screen overflow-y-auto">
            <UserQrProfile />
          </div>
        </div>
      ) : (
        <UnauthorizedPage />
      )}
    </div>
  );
};

export default Layout;
