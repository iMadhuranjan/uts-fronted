"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadUts } from "../Store/uploadSlice";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const QRCodeForm = ({ user }) => {
  const [stationName, setStationName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [imageUploaded, setImageUploaded] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const indianStates = [
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
  ];

  const handleFileChange = async (e) => {
    const imageFile = e.target.files[0];
    setSubmitted(false);
    if (!imageFile) {
      toast({ title: "Please select an image.", variant: "destructive" });
      return;
    }

    // Validate file type and size
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(imageFile.type)) {
      toast({
        title: "Invalid file type. Please upload PNG or JPEG.",
        variant: "destructive",
      });
      return;
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large. Maximum size is 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "uts_qr_code");
      data.append("cloud_name", "dohx14lil");

      const result = await fetch(
        "https://api.cloudinary.com/v1_1/dohx14lil/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const imageUrl = await result.json();
      setQrCodeImage(imageUrl.url);
      setImageUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);

    dispatch(
      uploadUts({
        stationName,
        description,
        state,
        qrCodeImage,
        uploaderName: user.username,
        uploader: user._id
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        setStationName("");
        setDescription("");
        setQrCodeImage(null);
        setState("");
        setFileInputKey(Date.now()); // Reset file input
        setImageUploaded(false);
        setFormLoading(false);
        setSubmitted(true);
      } else {
        toast({
          title: data?.payload?.data?.message,
          variant: "destructive",
        });
        setFormLoading(false);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 md:p-5 bg-white shadow-lg rounded-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Upload QR Code
      </h2>
      {submitted ? (
        <p className="text-green-600 text-center">
          Thank you for submitting UTS QR code 🎉! It will be reviewed and
          published shortly. 
        </p>
      ) : (
        <p className="text-gray-600 text-center">
          Help others by uploading QR codes for train stations. It’s easy and
          quick!
        </p>
      )}

      <div>
        <label
          htmlFor="qrCodeImage"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          QR Code Image (PNG/JPG)
        </label>
        <Input
          type="file"
          id="qrCodeImage"
          name="qrCodeImage"
          key={fileInputKey}
          required
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        {imageUploaded && (
          <p className="mt-2 text-sm text-green-600">
            Image uploaded successfully!
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="stationName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Station Name
        </label>
        <Input
          type="text"
          id="stationName"
          required
          name="stationName"
          value={stationName}
          onChange={(e) => setStationName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
          placeholder="Enter station name"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="border border-gray-300 p-2 rounded-md w-full"
          placeholder="Enter description"
        />
      </div>

      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          State
        </label>
        <Select
          onValueChange={(value) => setState(value)}
          defaultValue=""
          required
        >
          <SelectTrigger className="w-full border border-gray-300 p-2 rounded-md">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            {indianStates.map((state) => (
              <SelectItem key={state} value={state} className="cursor-pointer">
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        className="w-fit px-16 bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-all duration-300"
      >
        {formLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default QRCodeForm;
