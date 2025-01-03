import React from "react";
import BlogWrapper from "./BlogWrapper";

async function fetchStationDetails(stationId) {
  // Fetch the station details on the server
  const response = await fetch(
    `http://localhost:5000/api/viewqr/station/${stationId}`,
    {
      cache: "force-cache", // Ensures SSG behavior
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

const Page = async ({ params }) => {
  const stationId = await params.station;

  const stationDetails = await fetchStationDetails(stationId);

  if (!stationDetails) {
    return <div>Station not found</div>;
  }

  return (
    <div>
      <BlogWrapper stationDetails={stationDetails.station} />
    </div>
  );
};

export async function generateMetadata({ params }) {
  const stationId = params.station;
  const stationDetails = await fetchStationDetails(stationId);

  if (!stationDetails) {
    return {
      title: "Station Not Found",
      description: "The requested station could not be found.",
    };
  }

  return {
    title: `${stationDetails.station.stationName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} Station UTS QR Code (Active Code) 2025 `,
    description: `With the help of ${stationDetails.station.stationName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} Station UTS QR Code you can book ticket at ${stationDetails.station.stationName
      } Station with in a Second. We provde 100% Working and Updated UTS QR Code the Station`,
  };
}

export default Page;
