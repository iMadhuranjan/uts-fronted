"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Store/authSlice";
import { toast } from "@/hooks/use-toast";
import { CheckCheckIcon, LayoutDashboard, Mail, User } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = useRouter();
  const dispatch = useDispatch();
  let { isLoggedIn, user, isLoading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()).then((result) => {
      if (result?.payload?.success) {
        toast({ title: result?.payload?.message });
        navigation.push("/");
      }
    });
  };

  return (
    <nav className="h-16 w-full bg-white border-b shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold text-gray-800">
           <img
           src={'/logo.png'}
           width={200}
           />
          </Link>
        </div>

        <div className="flex gap-5 items-center justify-center">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link
              href="/disclaimer"
              className="text-gray-600 hover:text-gray-900"
            >
              Disclaimer
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div
            className="md:hidden text-gray-800 text-2xl cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </div>

          {/* Mobile Menu  */}

          <div
            className={`fixed top-0 left-0 h-screen w-3/4 bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg transform ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-50`}
          >
            <div className="flex flex-col items-start p-6 space-y-4 ">
              <button
                className="self-end text-2xl text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✖
              </button>
              <Link
                href="/"
                className="text-2xl hover:text-gray-300 transition duration-300 mt-5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-2xl hover:text-gray-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-2xl hover:text-gray-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/disclaimer"
                className="text-2xl hover:text-gray-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Disclaimer
              </Link>

              {isLoggedIn && user.role == "admin" ? (
                <>
                  <h3 className="text-xl text-black py-1 mt-4"> 
                    Admin Section Only
                  </h3>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/admin"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard />
                      <span className="ms-3">Dashboard</span>
                    </Link>

                    <Link
                      href="/admin/users"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Users Data
                      </span>
                    </Link>

                    <Link
                      href="/admin/moderate"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Mail />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Moderate QR
                      </span>
                    </Link>

                    <Link
                      href="/admin/qrcodes"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <CheckCheckIcon />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Approved QR
                      </span>
                    </Link>
                  </div>

                </>
              ) : null}
            </div>
          </div>

          {/* Avatar or Fallback Name */}
          {isLoggedIn ? (
            <div className="relative md:block">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer text-white bg-black">
                      {user.avatarUrl ? (
                        <AvatarImage src={user.avatarUrl} alt="User Avatar" />
                      ) : (
                        <AvatarFallback className="bg-black">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Hey, {user.username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/upload")}
                      className="cursor-pointer"
                    >
                      Upload QR
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/account")}
                      className="cursor-pointer"
                    >
                      Account
                    </DropdownMenuItem>
                    {user.role == "admin" ? (
                      <DropdownMenuItem
                        onClick={() => router.push("/admin")}
                        className="cursor-pointer"
                      >
                        Admin Section
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => router.push("/signin")}
                  variant="outline"
                  className="text-gray-600 border-gray-300 hover:border-gray-400"
                >
                  Sign In
                </Button>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigation.push("/upload")}
              className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-full text-sm shadow-md hover:from-orange-500 hover:to-orange-700 transition duration-300"
            >
              Upload QR
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Slide-in Menu */}

      {/* Overlay to Close Sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
