'use client';

import { fetchUnverifiedQRCodes, approveQRCode, deleteQRCode } from '@/app/Store/adminSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit3, Eye, CheckCircle, Trash2 } from 'lucide-react';

const UnverifiedQRCodes = () => {
  const [qrToVerify, setQrToVerify] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnverifiedQRCodes()).then((result) => {
      if (result?.payload?.success) {
        setQrToVerify(result?.payload?.qrtoverify);
      }
    });
  }, [dispatch, qrToVerify]);

  const handleApprove = (id) => {
    dispatch(approveQRCode(id)).then(() => {
      setQrToVerify((prev) => prev.filter((qr) => qr._id !== id));
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteQRCode(id)).then(() => {
      setQrToVerify((prev) => prev.filter((qr) => qr._id !== id));
    });
  };

  const handleEdit = (id) => {
    // Redirect to edit page
    window.open(`/admin/moderate/edit/${id}`, '_blank');
  };

  const handleView = (id) => {
    window.open(`/station/${id}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Unverified QR Codes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrToVerify.map((qr) => (
          <div
            key={qr._id}
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col"
          >
            <img
              src={qr.qrCodeImage}
              alt={`${qr.stationName} QR`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{qr.stationName}</h2>
              <p className="text-sm text-gray-500 mt-2">
                Uploaded by <span className="font-medium text-gray-700">{qr.uploaderName}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">{qr.state}</p>
            </div>
            <div className="mt-4 flex justify-between items-center gap-2">
              <button
                onClick={() => handleView(qr._id)}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition flex items-center gap-1"
              >
                <Eye className="w-4 h-4" /> View QR
              </button>
              <button
                onClick={() => handleApprove(qr._id)}
                className="bg-green-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition flex items-center gap-1"
              >
                <CheckCircle className="w-4 h-4" /> Approve QR
              </button>
            </div>
            <div className="mt-2 flex justify-between items-center gap-2">
              <button
                onClick={() => handleEdit(qr._id)}
                className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition flex items-center gap-1"
              >
                <Edit3 className="w-4 h-4" /> Edit QR
              </button>
              <button
                onClick={() => handleDelete(qr._id)}
                className="bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Delete QR
              </button>
            </div>
          </div>
        ))}
      </div>

      {qrToVerify.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          <p>No unverified QR codes available.</p>
        </div>
      )}
    </div>
  );
};

export default UnverifiedQRCodes;
