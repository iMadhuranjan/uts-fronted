"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MapPin } from "lucide-react";
import Link from "next/link";

const StateQrCards = ({ detail, stateName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of items to display per page
  const totalPages = Math.ceil(Object.keys(detail).length / itemsPerPage);

  const stateNameFormatted = stateName.toLowerCase().replace("-", " ");
  const formattedDetails = Object.entries(detail).slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Ref for heading
  const headingRef = useRef(null);

  const scrollToHeading = () => {
    <Link href={`${stateName}/#top`}></Link>;
    if (headingRef.current) {
      headingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      console.log("Scrolled to heading");
    }
  };

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      scrollToHeading();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      scrollToHeading();
    }
  };

  return (
    <>
      {/* Heading */}
      <h2
        ref={headingRef}
        id="top"
        className="font-extrabold text-2xl md:text-4xl py-4 text-center"
      >
        <strong className="text-gradient bg-gradient-to-r from-orange-500 via-red-500 to-orange-700 bg-clip-text text-transparent">
          {stateNameFormatted
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </strong>{" "}
        State UTS QR Codes
      </h2>
      <p className="py-3 text-center text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed max-w-6xl mx-auto font-ubuntu">
        Below are all the available UTS QR codes for the state of{" "}
        <span className="font-medium text-orange-600">
          {stateNameFormatted}
        </span>
        . With these UTS QR codes, you can easily book tickets to the respective
        stations. If you don’t find the QR code for your desired station, you
        can{" "}
        <Link
          href={"/upload"}
          className="font-semibold text-blue-600 cursor-pointer"
        >
          upload it to this website
        </Link>
        . Doing so will not only help you but also benefit your neighbors and
        colleagues.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formattedDetails.map(([key, value]) => (
          <Link href={`/station/${value._id}`} key={key}>
            <motion.div
              className="w-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-white via-gray-50 to-gray-100 border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image Section */}
              <div className="relative w-full h-60">
                <Image
                  src={value.qrCodeImage}
                  alt={`${value.stationName} QR Code`}
                  layout="fill"
                  className="object-cover"
                />
                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black/50"></div>
              </div>

              {/* Content Section */}
              <div className="p-3 space-y-2">
                {/* Author and Verification */}
                <div className="flex items-center justify-between">
                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-700">
                      {value.uploaderName || "Unknown"}
                    </p>
                  </div>

                  {/* Verification Badge */}
                  {value.isVerified ? (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 border-green-600 flex items-center space-x-1"
                    >
                      <CheckCircle size={14} className="text-green-700" />
                      <span>Verified</span>
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-100 text-red-700 border-red-600 flex items-center space-x-1"
                    >
                      <XCircle size={14} className="text-red-700" />
                      <span>Not Verified</span>
                    </Badge>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    {value.stationName.charAt(0).toUpperCase() +
                      value.stationName.slice(1).toLowerCase()}{" "}
                    Station UTS Qr Code
                  </h2>
                </div>

                {/* State and Location */}
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={16} className="text-gray-700" />
                  <span className="text-sm">
                    <strong>State:</strong> {value.state}
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <Link
          href={`${stateName}/#top`}
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-md ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </Link>
        <span className="text-gray-700 font-medium">
          Page {currentPage + 1} of {totalPages}
        </span>
        <Link
          href={`${stateName}/#top`}
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages - 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </Link>
      </div>
    </>
  );
};

export default StateQrCards;
