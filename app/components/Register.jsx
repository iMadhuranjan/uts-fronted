"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { otpVerify, registerUser, resendOtp } from "../Store/authSlice";
import { useToast } from "@/hooks/use-toast";
import PasswordStrengthMeter from "@/libs/PasswordStrengthMeter";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Tracks whether the user has registered
  const dispatch = useDispatch();
  const [otpEmail, setOtpEmail] = useState("");
  const { toast } = useToast();
  const navigation = useRouter();
  const [timer, setTimer] = useState(60); // 1-minute timer
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 60; // Reset timer
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled]);

  function onSubmitClick(e) {
    e.preventDefault();

    dispatch(registerUser({ username, email, password }))
      .then((response) => {
        if (response?.payload?.success) {
          toast({
            title: response?.payload?.message,
          });
          setOtpEmail(email);
          setUsername("");
          setEmail("");
          setPassword("");
          setIsRegistered(true); // Show OTP box
        } else {
          toast({
            title: response?.payload?.message,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.log("Error during registration:", error?.payload);
      });
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(otpVerify({ code, otpEmail }))
      .then((result) => {
        if (result?.payload?.success) {
          toast({ title: result?.payload?.message });
          // Redirect to login page or desired location
          navigation.push("/login");
        } else {
          toast({
            title: result?.payload?.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "An error occurred. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    dispatch(resendOtp({ email: otpEmail }))
      .then((result) => {
        if (result?.payload?.success) {
          toast({ title: "OTP resent successfully!" });
        } else {
          toast({
            title: result?.payload?.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Failed to resend OTP. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="w-full max-w-md px-4 pt-navbar">
      <AnimatePresence>
        {!isRegistered ? (
          <motion.form
            onSubmit={onSubmitClick}
            className="bg-white shadow-lg p-6 md:p-8 rounded-xl drop-shadow-md transition-all"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Join Us 💓
            </h2>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Your Name
              </label>
              <Input
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                name="username"
                placeholder="What is Your Name?"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Your Email
              </label>
              <Input
                type="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                name="email"
                placeholder="mail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Your Password
              </label>
              <Input
                type="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <PasswordStrengthMeter password={password} />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
            <p className="text-center text-sm text-gray-600 py-3">
              Already have an Account?{" "}
              <Link
                href="/login"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Login
              </Link>
            </p>
          </motion.form>
        ) : (
          <motion.div
            className="bg-white shadow-lg p-8 rounded-xl drop-shadow-md transition-all"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Enter OTP
            </h2>

            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter 6-digit OTP
              </label>
              <Input
                type="number"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            <button
              onClick={handleOtpSubmit}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            >
              Verify OTP
            </button>

            {isResendDisabled ? (
              <p className="mt-4 text-center text-sm text-gray-600">
                Resend OTP available in{" "}
                <span className="font-bold">{timer}</span> seconds
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="mt-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Resend OTP
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;
