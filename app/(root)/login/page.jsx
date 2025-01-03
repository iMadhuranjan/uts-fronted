"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, otpVerify, resendOtp } from "../../Store/authSlice";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [isAccountVerified, setAccountVerified] = useState(true);
  const [isOtpDivVisible, setisOtpDivVisible] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60); // 1-minute timer
  const navigation = useRouter();

  useEffect(() => {
    if (isOtpDivVisible) {
      dispatch(resendOtp({ email }));
    }
  }, [isOtpDivVisible]);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .then((result) => {
        if (!result?.payload?.success) {
          toast({ title: result?.payload?.message, variant: "destructive" });
          if (
            result?.payload?.message ===
            "Account verification is required to login"
          ) {
            setAccountVerified(false);
            setOtpEmail(email);
          }
        } else {
          toast({ title: "Login Successful" });
          navigation.push("/account");
        }
      })
      .catch((err) => {
      });
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(otpVerify({ code, otpEmail })).then((result) => {
      if (result?.payload?.success) {
        toast({ title: result?.payload?.message });
        navigation.push("/");
      } else {
        toast({
          title: result?.payload?.message,
          variant: "destructive",
        });

        if (
          result?.payload?.message === "Your Account has Been Already Verified"
        ) {
          navigation.push("/");
        }
      }
    });
  };

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

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    dispatch(resendOtp({ email }))
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
    <div
      className="flex justify-center items-center bg-no-repeat bg-cover bg-center h-[90vh] py-10 pt-navbar"
      style={{ backgroundImage: `url('bgImage.jpg')` }}
    >
      <div className="w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {!isOtpDivVisible ? (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg p-6 md:p-8 w-full max-w-md rounded-xl drop-shadow-md transition-all"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Login
              </h2>

              <div className="mb-4">
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
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

              <div className="mb-2">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

<div className="flex justify-end">
  <Link href={'/forget'} className="py-2 text-blue-500">Forget Password?</Link >
</div>
              {!isAccountVerified && (
                <Link
                  href="#"
                  className="text-red-500 underline text-sm mb-4 block"
                  onClick={() => setisOtpDivVisible(true)}
                >
                  Verify Your Account
                </Link>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  Sign up
                </Link>
              </p>
            </motion.form>
          ) : (
            <motion.div
              className="bg-white shadow-lg p-8 w-full max-w-md rounded-xl"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                Enter OTP
              </h2>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter 6-digit OTP
                  </Label>
                  <Input
                    id="otp"
                    type="number"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Verify OTP
                </button>
                {isResendDisabled ? (
                  <p className="text-center text-sm text-gray-600">
                    Resend OTP in <span className="font-bold">{timer}</span>{" "}
                    seconds
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Resend OTP
                  </button>
                )}
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
