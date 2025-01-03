"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, HomeIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const Sidebar = () => {
  const { state } = useParams();
  const allStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStates, setFilteredStates] = useState(allStates);
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useRouter();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredStates(
      allStates.filter((state) =>
        state.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchState = () => {
    if (searchInput.trim() === "") return;
    navigation.push(`/station?name=${encodeURIComponent(searchInput.trim())}`);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Search and Breadcrumb Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-2/3">
          <input
            type="text"
            placeholder="Search More..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-4 pr-16 rounded-lg text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
            required
          />
          <button
            onClick={handleSearchState}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Breadcrumb */}
        {state && (
          <div className="flex items-center text-sm font-medium text-gray-600">
            <Link href={"/"} className="flex items-center gap-1 text-blue-600">
              <HomeIcon className="w-5 h-5" />
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">{state}</span>
          </div>
        )}
      </div>

      {/* Sidebar Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* State Dropdown */}
        <div className=" bg-white shadow rounded-lg border border-gray-200">
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 bg-blue-600 text-white cursor-pointer "
            onClick={toggleList}
          >
            <span className="text-lg font-semibold">Search By States</span>
            <ChevronDown
              className={`w-6 h-6 transform transition-transform lg:hidden ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-500 ease-in-out lg:block ${
              isOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"
            } overflow-hidden`}
          >
            <input
              type="text"
              placeholder="Search State"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 text-sm border-b focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div className="p-4 overflow-y-auto max-h-80 md:max-h-96 scrollbar-thin scrollbar-thumb-blue-300">
              <ul>
                {filteredStates.map((state) => {
                  const formattedState = state
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <li key={state} className="mb-2">
                      <Link
                        href={`/state/${formattedState}`}
                        className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 hover:bg-blue-600 hover:text-white rounded transition"
                      >
                        {state}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
