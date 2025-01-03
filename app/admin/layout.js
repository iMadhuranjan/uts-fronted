'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UnauthorizedPage from '../components/Unauthorize';
import AdminControlSidebar from './Sidebar';
import { fetchUnverifiedQRCodes } from '../Store/adminSlice';

const layout = ({ children }) => {
    const { user, isLoggedIn, loading } = useSelector((state) => state.auth);
    const [admin, setAdmin] = useState(false);
    const [lockContent, setLockContent] = useState(false);
    if (loading) {
        return (<div>Loading... </div>)
    }

    useEffect(() => {
        if (user) {
            if (user.role == "admin") {
                setAdmin(true);
                setLockContent(true)
                    ;
            }
        }
    }, [user, loading])


    return (
        <div className='pt-navbar'>
            {
                !lockContent ? <div
                    className="flex justify-center items-center bg-no-repeat bg-cover bg-center h-[90vh] py-10 pt-navbar"
                    style={{ backgroundImage: `url('bgImage.jpg')` }}
                ><UnauthorizedPage /></div> : <div>
                    {
                        admin ? <div className='flex gap-4'>

                            <div className='w-1/4  hidden md:block'> <AdminControlSidebar /></div>
                            <div className='flex-1 font-ubuntu'>{children}</div>
                        </div> : <div
                            className="flex justify-center items-center bg-no-repeat bg-cover bg-center h-[90vh] py-10 pt-navbar"
                            style={{ backgroundImage: `url('bgImage.jpg')` }}
                        ><UnauthorizedPage /></div>
                    }
                </div>
            }
        </div>
    )
}

export default layout
