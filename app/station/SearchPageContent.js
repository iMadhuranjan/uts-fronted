"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewBySearch } from "../Store/uploadSlice";
import { useSearchParams } from "next/navigation";
import SearchStationCar from "../components/SearchStationCar";

const SearchPageContent = () => {
  const searchParam = useSearchParams();
  const stationName = searchParam.get("name");
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [stationDetail, setStationDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!stationName) return;

    setLoading(true);
    setError(null);

    dispatch(viewBySearch({ stationName }))
      .then((result) => {
        if (result?.payload?.success) {
          setStationDetails(result?.payload?.StationQr);
        } else {
          setStationDetails(null);
          setError("No results found for the provided station name.");
        }
      })
      .catch(() => {
        setError("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [stationName, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-gray-800 text-center py-5">
        Showing Results for{" "}
        <span className="text-orange-600">{stationName || "..."}</span>
      </h1>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center text-orange-500 font-semibold">
          Loading...
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}

      {/* Results */}
      {!loading && stationDetail && (
        <div className="w-full mx-auto">
          <h2 className="text-xl text-center font-semibold text-gray-700 mb-2">
            Search Results:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center">
            {stationDetail.map((station, index) => (
              <SearchStationCar station={station} key={index} user={user} />
            ))}
          </div>
        </div>
      )}

      {/* No Results State */}
      {!loading && !stationDetail && !error && (
        <div className="text-center text-gray-500 font-semibold">
          No data available. Try searching for another station.
        </div>
      )}
    </div>
  );
};

export default SearchPageContent;
