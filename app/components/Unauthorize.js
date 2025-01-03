"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <motion.div
      className="h-[70vh] flex flex-col justify-center items-center text-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Lock Icon with Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6"
      >
        <Lock className="w-24 h-24 text-blue-500 bg-white p-4 rounded-full shadow-lg" />
      </motion.div>

      {/* 401 Unauthorized Text */}
      <motion.h1
        className="text-3xl md:text-3xl lg:text-5xl font-extrabold text-white tracking-wide mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        401 Unauthorized
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-lg text-gray-200 mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Oops! You Don't Have Access to view this Page.
      </motion.p>

      {/* Login Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Link href="/login">
          <Button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-full shadow-lg flex items-center gap-2"
          >
            Go to Login
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default UnauthorizedPage;
