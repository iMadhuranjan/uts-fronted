"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Upload, Share } from "lucide-react";

export default function LandingPage() {
  const navigation = useRouter();
  const [searchInput, setSearchInput] = useState("");

  function handleSearch() {
    if (searchInput.trim() === "") return;
    navigation.push(`/station?name=${encodeURIComponent(searchInput.trim())}`);
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-600 h-full md:min-h-[90vh] flex flex-col justify-center items-center text-white overflow-hidden py-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/bgImage.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 sm:px-10 lg:px-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            UTS QR Codes
          </h1>
          <p className="mt-6 text-lg md:text-2xl leading-relaxed max-w-xl mx-auto">
            Find accurate QR codes for stations or upload missing ones. Share
            them with ease and contribute to the network!
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
            <input
              type="text"
              placeholder="Search Station QR Code..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="p-4 w-full sm:w-2/3 lg:w-1/2 rounded-lg text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              onClick={handleSearch}
              className="bg-indigo-500 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-8 text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Our Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Accurate QR Code Feature */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Search className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800">
                Accurate QR Codes
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Find the right QR code for your station with precise details.
              </p>
            </motion.div>

            {/* Upload Feature */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Upload className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800">
                Upload QR Codes
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Missing a QR code? Upload it and contribute to the community.
              </p>
            </motion.div>

            {/* Share Feature */}
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Share className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800">
                Share QR Codes
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Share station QR codes with your friends and family.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-500 via-blue-500 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Contribute to the Community
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Upload missing QR codes for stations and help others find them
            easily.
          </motion.p>
          <motion.a
            href="/upload"
            className="inline-block bg-white text-indigo-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            Upload QR Code
          </motion.a>
        </div>
      </section>
    </>
  );
}
