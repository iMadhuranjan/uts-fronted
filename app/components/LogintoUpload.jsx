import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginToUpload = () => {
  const navigate = useRouter();

  function handleLogin() {
    navigate.push("/login");
  }
  return (
    <div
      className="flex justify-center h-full py-20 md:h-[80vh] items-center bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url('bgImage.jpg')` }}
    >
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md m-3">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Welcome to UTS QR Codes
        </h2>
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          To upload your QR codes and contribute to a seamless travel
          experience, please log in to your account. Uploading QR codes is
          quick, easy, and helps others in their journeys!
        </p>
        <div className="mt-6 text-center">
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-orange-600 hover:to-orange-800 transition duration-300"
          >
            Log In to Upload
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-orange-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginToUpload;
