'use client';

import { Check, CheckCheckIcon, LayoutDashboard, Mail, User } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUnverifiedQRCodes } from '../Store/adminSlice';


const AdminControlSidebar = () => {

    const [toverify, setToVerify] = useState(0);
    const disptach = useDispatch();

    useEffect(() => {
        disptach(fetchUnverifiedQRCodes()).then((result) => {
            if (result?.payload?.success) {
                const numberofQr = result?.payload?.qrtoverify;
                setToVerify(numberofQr.length);
            }
        });
    }, [disptach])



    return (
        <div classNameName="flex h-screen ">


            <aside id="default-sidebar" className="top-0 left-0 h-screen">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
                    <ul className="space-y-2 text-xl font-semibold font-ubuntu pl-10 py-10 flex flex-col gap-2">

                        <li>
                            <Link href="/admin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LayoutDashboard />
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <User />
                                <span className="flex-1 ms-3 whitespace-nowrap">Users Data</span>

                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/moderate" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Mail />
                                <span className="flex-1 ms-3 whitespace-nowrap">Moderate QR</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 ms-3 text-sm font-medium text-blue-800 bg-red-300 p-4 animate-pulse rounded-full ">{toverify}</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin/qrcodes" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <CheckCheckIcon />
                                <span className="flex-1 ms-3 whitespace-nowrap">Approved QR</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </aside>



        </div>
    );
};

export default AdminControlSidebar;
