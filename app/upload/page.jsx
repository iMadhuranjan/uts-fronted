"use client";
import React from "react";
import QRCodeForm from "../Pages/uploadForm";
import { useSelector } from "react-redux";

const page = () => {
  const { isLoggedIn, user, isLoading } = useSelector((state) => state.auth);

  return (
    <div
     
    >
      <QRCodeForm user={user} 
      className=""
      />
    </div>
  );
};

export default page;
