import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserCardOfQr = ({ item }) => {
  return (
    <Card className="flex flex-col items-center border border-gray-300 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      {/* Card Header */}
      <CardHeader className="w-full text-center bg-blue-500 text-white py-3">
        <h2 className="text-lg font-bold tracking-wide uppercase">
          {item.stationName}
        </h2>
      </CardHeader>

      {/* QR Code/Image */}
      <CardContent className="h-[100px] md:h-[200px] flex justify-center items-center py-2">
        <img
          src={item.qrCodeImage}
          alt={`QR Code for ${item.stationName}`}
          className="w-full h-full py-4 object-contain rounded-lg "
        />
      </CardContent>

      {/* Footer with Verification Status */}
      <CardFooter className="w-full flex flex-col md:flex-row gap-4 justify-between items-center px-4 py-3 bg-gray-100">
        <div className="flex items-center gap-2">
          {item.isVerified ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <span
            className={`text-sm font-medium ${
              item.isVerified ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.isVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
        <Button variant="outline" size="sm" className="text-sm px-3 py-1">
          <a href={`/station/${item._id}`} target="_blank">
            View Details{" "}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCardOfQr;
