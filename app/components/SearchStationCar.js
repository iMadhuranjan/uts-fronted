"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SearchStationCar = ({ station }) => {
  const navigation = useRouter();

  console.log(station);
  function handleArticle({}) {
    // navigation.push()
  }
  return (
    <Link href={`/station/${station._id}`}>
      <motion.div
        className="w-[350px]  md:w-[420px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-white via-gray-50 to-gray-100 border border-gray-200 hover:shadow-2xl transition-all duration-300 my-3 md:my-1 cursor-pointer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleArticle}
      >
        {/* Image Section */}
        <div className="relative w-full h-56">
          <Image
            src={station.qrCodeImage}
            alt={`${station.stationName} QR Code`}
            layout="fill"
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black/50"></div>
          {/* Station Name Overlay */}
        </div>

        {/* Content Section */}
        <div className="p-3 space-y-2">
          {/* Author and Verification */}
          <div className="flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center space-x-3">
              <p className="text-sm font-medium text-gray-700">
                {station.uploaderName}
              </p>
            </div>

            {/* Verification Badge */}
            {station.isVerified ? (
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
            <h2 className="text-xl">
              {station.stationName.charAt(0).toUpperCase() +
                station.stationName.slice(1).toLowerCase()}{" "}
              Station UTS Qr Code
            </h2>
          </div>
          {/* State and Location */}
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin size={16} className="text-gray-700" />
            <span className="text-sm">
              <strong>State:</strong> {station.state}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default SearchStationCar;
