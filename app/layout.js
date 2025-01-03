import { Geist, Geist_Mono, Imprima } from "next/font/google";
import "./globals.css";
import "./styles/fonts.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SliceProvier from "./Store/SliceProvier";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <SliceProvier>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </body>
      </html>
    </SliceProvier>
  );
}
