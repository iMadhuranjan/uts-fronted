"use client";

import { useDispatch } from "react-redux";
import { viewProfile, updateProfile } from "../Store/viewSlice";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle, Edit } from "lucide-react";
import Link from "next/link";
import { changePassword } from "../Store/authSlice";

const Shimmer = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
  </div>
);

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", bio: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewProfile()).then((result) => {
      if (result?.payload?.success) {
        toast({ title: `Welcome, ${result.payload.username}!` });
        setUser(result.payload);
        setFormData({
          username: result.payload.username,
          bio: result.payload.bio,
        });
      }
    });
  }, [dispatch]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handlePasswordCancel = () => setIsChangingPassword(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(formData));
    if (result?.payload?.success) {
      toast({ title: "Profile updated successfully!" });

      // Update local state
      setUser((prev) => ({ ...prev, ...formData }));

      // Transition back to the profile view
      setIsEditing(false);
    } else {
      toast({
        title: "Failed to update profile",
        description: result?.payload?.message || "Something went wrong.",
      });
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();

    dispatch(changePassword(passwordData)).then((result) => {
      if (result?.payload?.success) {
        toast({ title: "Password changed successfully!" });
        setPasswordData({ oldPassword: "", newPassword: "" });
        setIsChangingPassword(false);
      } else {
        toast({
          title: result?.payload?.message,
          description: "Please provide valid inputs.",
        });
      }

    })

  };

  return (
    <div className="p-3 md:p-6 flex justify-center items-center">
      <Card className="w-full max-w-3xl shadow-lg">
        {!user ? (
          <div className="p-6 text-center">
            <Shimmer />
            <Shimmer />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: isEditing || isChangingPassword ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isEditing || isChangingPassword ? -50 : 50 }}
            className="p-6"
          >
            {isEditing ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Update Your Profile</h2>
                <form className="space-y-4">
                  <div>
                    <Label className="block text-gray-700 font-medium mb-2">Username</Label>
                    <Input
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-gray-700 font-medium mb-2">Bio</Label>
                    <Textarea
                      name="bio"
                      placeholder="Write something about yourself..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      className="w-full bg-gray-300 hover:bg-gray-400"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : isChangingPassword ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <form className="space-y-4">
                  <div>
                    <Label className="block text-gray-700 font-medium mb-2">Current Password</Label>
                    <Input
                      name="oldPassword"
                      type="password"
                      placeholder="Enter your current password"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-gray-700 font-medium mb-2">New Password</Label>
                    <Input
                      name="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="my-3">
                    <Link href={'/forget'} className="text-blue-600 mt-4 py-4">Forget Password?</Link>

                  </div>
                  <div className="flex space-x-4">

                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={handlePasswordSave}
                    >
                      Save
                    </Button>
                    <Button
                      className="w-full bg-gray-300 hover:bg-gray-400"
                      onClick={handlePasswordCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <CardHeader className="p-6 text-center border-b">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                    Hello, {user?.username} 👋
                  </h1>
                  {user?.isVerified && (
                    <div className="flex justify-center items-center gap-2 mt-1 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Verified Account</span>
                    </div>
                  )}
                </CardHeader>
                <div className="px-6 py-4">
                  <div className="text-left">
                    <p className="text-lg font-medium text-gray-800 mb-2">
                      <span className="text-gray-600">Email: </span>
                      <strong className="font-semibold">{user?.email}</strong>
                    </p>
                    <Label className="text-gray-700 font-medium">Your Bio:</Label>
                    <p className="mt-2 text-gray-600 italic">
                      {user?.bio || "No bio provided yet."}
                    </p>
                  </div>
                </div>
                <CardFooter className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 hover:bg-gray-100"
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </CardFooter>
                <div className="py-4 text-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setIsChangingPassword(true)}
                  >
                    Change Password
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default AccountPage;
