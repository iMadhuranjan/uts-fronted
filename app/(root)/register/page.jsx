import React from "react";
import Register from "../../components/Register";

const page = () => {
  return (
    <div
      className="flex justify-center items-center bg-no-repeat bg-cover bg-center h-screen"
      style={{ backgroundImage: `url('bgImage.jpg')` }}
    >
      <Register />
    </div>
  );
};

export default page;

export const metadata = {
  title: "Register | UTS QR Code",
  description: "Create your account on the UTS QR Code platform to manage your QR profiles and access exclusive features.",
};
