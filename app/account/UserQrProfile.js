"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { viewQr } from "../Store/viewSlice";
import { toast } from "@/hooks/use-toast";
import UserCardOfQr from "../components/UserCardOfQr";

const UserQrProfile = () => {
  const dispatch = useDispatch();
  const [userQr, setUserQr] = useState([]);

  useEffect(() => {
    dispatch(viewQr()).then((result) => {
      if (result?.payload?.success) {
        setUserQr(result?.payload?.qrData);
      } else {
        toast({ title: "No QR Code Found", variants: "destructive" });
      }
    });
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-3 mt-4">
      {userQr.map((item, i) => {
        return <UserCardOfQr item={item} key={i} />;
      })}
    </div>
  );
};

export default UserQrProfile;
