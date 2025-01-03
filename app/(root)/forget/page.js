"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ForgetPassword } from "../../Store/authSlice.js"; // Import the forget password thunk
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation.js";
import Link from "next/link";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP
  const [timer, setTimer] = useState(60); // Timer for resend OTP
  const dispatch = useDispatch();
  const navigation = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(ForgetPassword({ email })).unwrap();
      if (response?.success) {
        toast({ title: response.message });
        setStep(2); // Move to OTP verification step
        setTimer(60); // Reset the timer to 60 seconds
      } else {
        toast({ title: response.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error sending OTP", variant: "destructive" });
      console.error(error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(ForgetPassword({ email, code })).unwrap();
      console.log(response);
      if (response?.success) {
        toast({ title: response.message });
        setEmail("");
        setCode("");
        navigation.push("/login");
      } else {
        toast({ title: response.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error verifying OTP", variant: "destructive" });
      console.error(error);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await dispatch(ForgetPassword({ email })).unwrap();
      if (response?.success) {
        toast({ title: "OTP resent successfully" });
        setTimer(60); // Reset timer after resending OTP
      } else {
        toast({ title: response.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error resending OTP", variant: "destructive" });
      console.error(error);
    }
  };

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  return (
    <div
      className="w-full h-[90vh] flex flex-col justify-center items-center bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('bgImage.jpg')` }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg px-4"
      >
        {step === 1 ? (
          <motion.form
            onSubmit={handleEmailSubmit}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl p-6 md:p-8 rounded-xl border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Forgot Password
            </h2>

            <div className="mb-2">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Your Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="mail@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="py-2 flex justify-end">
              <Link href={"/login"} className="mr-7 text-blue-600 ">
                {" "}
                Login ?{" "}
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Send OTP
            </button>
          </motion.form>
        ) : (
          <motion.form
            onSubmit={handleOtpSubmit}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl p-6 md:p-8 rounded-xl border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Verify OTP
            </h2>

            <div className="mb-4">
              <Label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP
              </Label>
              <Input
                id="otp"
                type="number"
                value={code}
                placeholder="Enter 6-digit OTP"
                onChange={(e) => setCode(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
            >
              Submit OTP
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Didn&apos;t receive the OTP?{" "}
              {timer > 0 ? (
                <span className="text-gray-500">
                  Resend OTP in {timer} seconds
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Resend OTP
                </button>
              )}
            </p>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgetPasswordPage;
