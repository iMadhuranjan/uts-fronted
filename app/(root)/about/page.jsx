import React from "react";

const AboutUs = () => {
  return (
    <div className="about-us-container bg-gray-100 text-gray-800 pt-navbar my-5 px-3">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to our UTS QR Code platform! Our mission is to make your
          railway journey smoother and more efficient by providing a
          comprehensive database of UTS QR codes for stations across India.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Here, you can easily search for the UTS QR code of any station by its
          name or browse through the available options. If you can't find a
          specific QR code, we encourage you to contribute by uploading it to
          our platform, helping us build a more inclusive and complete resource
          for everyone.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Our platform is designed to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Allow seamless search for UTS QR codes by station name or code.
          </li>
          <li>
            Enable users to upload missing UTS QR codes to enhance our database.
          </li>
          <li>
            Provide an intuitive and user-friendly experience for all travelers.
          </li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          We believe in the power of community and collective effort. Together,
          we can ensure that every traveler has access to the UTS QR codes they
          need, saving time and reducing hassle.
        </p>
        <p className="text-lg leading-relaxed">
          Thank you for being a part of our journey. Whether you're here to find
          a QR code or to contribute to our growing database, your participation
          is invaluable. Let's work together to make railway travel in India
          smarter and more convenient!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

export const metadata={
  title: "About us | Uts Qr Code",
  description: " Learn more about us and our aim for creating this website uts Station qr code."
}