'use client'

import { fetchStationDetails } from '@/app/Store/uploadSlice';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BlogWrapper from './BlogWrapper';

const page = () => {
  const { station } = useParams();
  const [loading, setLoading] = useState(true)
  const [stationDetail, setStationDetail] = useState([]);

  const disptach = useDispatch();

  useEffect(() => {
    disptach(fetchStationDetails({ id: station })).then((result) => {
      if (result?.payload?.success) {
        setStationDetail(result?.payload?.station);
        console.log(stationDetail);
        setLoading(false);
      }
    })
  }, [stationDetail, disptach]);



  if (loading) {
    return <div> Loading... </div>
  }
  return (
    <div>
      <BlogWrapper stationDetails={stationDetail} />
    </div>
  )
}

export default page
