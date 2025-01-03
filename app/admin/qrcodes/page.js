'use client';

import { fetchVerifiedQRCodes } from '@/app/Store/adminSlice';
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, MapPin, Search } from 'lucide-react';
import { useDispatch } from 'react-redux';

const VerifiedQRCodes = () => {
  const [verified, setVerified] = useState([]);
  const [filteredQRCodes, setFilteredQRCodes] = useState([]);
  const [search, setSearch] = useState('');
  const disptach = useDispatch();

  useEffect(() => {
    disptach(fetchVerifiedQRCodes()).then((result) => {
      if (result?.payload?.length > 0) {
        setVerified(result.payload);
        setFilteredQRCodes(result.payload);
      }
    });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = verified.filter(
      (qr) =>
        qr.stationName.toLowerCase().includes(query) ||
        qr.state.toLowerCase().includes(query) ||
        qr.uploaderName.toLowerCase().includes(query)
    );

    setFilteredQRCodes(filtered);
  };

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Verified QR Codes</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search QR codes by station, state, or uploader..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* QR Code Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQRCodes.map((qr) => (
          <div
            key={qr.qrCodeImage}
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col"
          >
            <img
              src={qr.qrCodeImage}
              alt={`${qr.stationName} QR`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{qr.stationName}</h2>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" /> {qr.state}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Uploaded by <span className="font-medium text-gray-700">{qr.uploaderName}</span>
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              {qr.isVerified ? (
                <p className="text-green-600 text-sm flex items-center gap-1">
                  <CheckCircle className="w-5 h-5" /> Verified
                </p>
              ) : (
                <p className="text-yellow-600 text-sm flex items-center gap-1">
                  <XCircle className="w-5 h-5" /> Not Verified
                </p>
              )}
              <button
                onClick={() => window.open(`/station/${qr._id}`, '_blank')}
                className="bg-purple-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-purple-700 transition"
              >
                View Station
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredQRCodes.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          <p>No QR codes found for the search query "{search}".</p>
        </div>
      )}
    </div>
  );
};

export default VerifiedQRCodes;
