'use client'
import { Card } from '@/components/ui/card'
import { unverifiedCode } from '@/customHooks/unverifiedcode';
import { BadgeCheckIcon, QrCode, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchAllUsers, fetchUnverifiedQRCodes, fetchVerifiedQRCodes } from '../Store/adminSlice';


const page = () => {
  const disptach = useDispatch();

  const [toverify, setToVerify] = useState(0);
  const [noUser, setNoUser] = useState(0);
  const [verified, setVerified] = useState(0);

  useEffect(() => {
    disptach(fetchUnverifiedQRCodes()).then((result) => {
      if (result?.payload?.success) {
        const numberofQr = result?.payload?.qrtoverify;
        setToVerify(numberofQr.length);
      }
    });
  }, [disptach])



  useEffect(() => {
    disptach(fetchAllUsers()).then((result) => {
      if (result?.payload?.alluserData) {
        setNoUser(result?.payload?.alluserData.length)
      }
    });
  }, [disptach])


  useEffect(() => {
    disptach(fetchVerifiedQRCodes()).then((result) => {
      if (result?.payload) {
        setVerified(result?.payload.length)
      }
    });
  }, [disptach])


  const data = [
    {
      id: 1,
      number: noUser,
      label: 'Total Users',
      icon: <Users className="h-12 w-12 text-white" />,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      id: 2,
      number: verified,
      label: 'Verified QR Codes',
      icon: <BadgeCheckIcon className="h-12 w-12 text-white" />,
      gradient: 'from-green-500 to-teal-500',
    },
    {
      id: 3,
      number: toverify,
      label: 'Moderated QR Codes',
      icon: <QrCode className="h-12 w-12 text-white" />,
      gradient: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <div>
      <div className='flex flex-col gap-2 items-center my-3 md:my-10 lg:my-20'>
        <h2 className='font-semibold text-2xl md:text-3xl '> Welcome Madhuranjan Ji! 🥰</h2>
        <p className='text-lg'>Aap hi ka to Intejar tha. </p>
      </div>
      <hr className='mt-5' />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl px-4 my-5">
        {data.map((item) => (
          <Card
            key={item.id}
            className={`p-6 rounded-lg shadow-lg bg-gradient-to-r ${item.gradient} text-white transform transition-transform hover:scale-105 hover:shadow-2xl`}
          >
            <div className="flex items-center justify-between">
              <div>{item.icon}</div>
              <div>
                <h2 className="text-5xl font-extrabold animate-pulse">{item.number}</h2>
                <p className="text-lg mt-2 font-medium opacity-90 tracking-wide">{item.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default page
