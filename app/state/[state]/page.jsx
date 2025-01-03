import React from "react";
import StateQrCards from "./StateQrCards";
import Link from "next/link";

async function fetchStateQrCode(stateName) {
  const response = await fetch(
    `https://utsbac-git-main-imadhuranjans-projects.vercel.app/api/viewqr/state/${stateName}`
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data;
}

const page = async ({ params }) => {
  const stateName = await params.state;

  const data = await fetchStateQrCode(stateName);

  // Ensure data?.result is an array before checking its length
  const hasResults = Array.isArray(data?.result) && data.result.length > 0;

  return hasResults ? (
    <StateQrCards detail={data.result} stateName={stateName} />
  ) : (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 border border-gray-300 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        No QR Found for This State
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn't find any QR codes for the selected state. If you have a QR
        code for any station in this state, you can help by uploading it.
      </p>
      <Link
        href="/upload"
        className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Upload a QR Code
      </Link>
    </div>
  );
};

export async function generateMetadata({ params }) {
  const station = await params.state;

  const data = await fetchStateQrCode(station);
  const stateNameFormatted = station.toLowerCase().replace("-", " ");

  if (!data) {
    return {
      title: `Not QR Code Found for ${stateNameFormatted} Station`,
      description: `There is not UTS QR Code found for ${stateNameFormatted} station. Please try searching for an Another station.`,
    };
  }

  return {
    title: `${stateNameFormatted
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} State UTS QR Code (Active Codes) `,
  };
}

export default page;
