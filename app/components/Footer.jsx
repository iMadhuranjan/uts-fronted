import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">


      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="./../icon.png" // Replace with your logo path
            alt="Logo"
            className="w-48 mb-4"
          />
        </div>

        {/* Links Section */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">More usefull Websites</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://msrtc.stbustimetable.com/"
                target="_blank"
                className="hover:underline"
              >
                MSRTC Bus Timetable
              </a>
            </li>
            <li>
              <a
                href="https://hrroadways.stbustimetable.com/"
                target="_blank"
                className="hover:underline"
              >
                HR Roadways Bus Timetable
              </a>
            </li>
            <li>
              <a
                href="https://agecalculator.iqmastered.com/"
                target="_blank"
                className="hover:underline"
              >
                Age Calculator
              </a>
            </li>
            <li>
              <a
                href="https://utsstationqrcode.com/"
                className="hover:underline"
                target="_blank" 
              >
                UTS QR Code
              </a>
            </li>
          </ul>
        </div>

        {/* Disclaimer Section */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Disclaimer</h3>
          <p className="text-sm leading-relaxed">
            This website is for informational purposes only and is not
            affiliated with, endorsed by, or connected to any government body,
            including Indian Railways or UTS. All information provided on this
            website is for general informational purposes only.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-3 text-center border-t border-gray-700 pt-4">
        <p className="text-sm">
          Made with 💓 by <a href="https://madhuranjan.in" target="_blank">Madhuranjan</a>
        </p>
      </div>

    </footer>
  );
};

export default Footer;
