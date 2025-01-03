import React from "react";

const Contact = () => {
  return (
    <div className="contact-container bg-gray-100 text-gray-800 pt-navbar my-4 px-3">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          Thank you for visiting our platform! We are here to assist you with
          any questions, feedback, or concerns you may have. Our goal is to
          ensure that your experience with our UTS QR Code platform is seamless
          and helpful.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          If you need assistance or wish to report an issue, please feel free to
          reach out to us via email. We value your feedback and are committed to
          addressing your inquiries as promptly as possible.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">How We Can Help</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Assistance with finding UTS QR codes for specific stations.</li>
          <li>
            Guidance on how to upload missing UTS QR codes to our platform.
          </li>
          <li>Resolution of technical issues or bugs on the website.</li>
          <li>
            Responding to queries from railway authorities or relevant
            organizations.
          </li>
          <li>General feedback or suggestions to improve our services.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
        <p className="text-lg leading-relaxed mb-4">You can reach us at:</p>
        <p className="text-lg font-bold mb-4">
          Email:{" "}
          <a
            href="mailto:HeyMadhuranjan@gmail.com"
            className="text-blue-600 underline"
          >
            HeyMadhuranjan@gmail.com
          </a>
        </p>
        <p className="text-lg leading-relaxed mb-4">
          We strive to respond to all inquiries within 48 hours. Please provide
          detailed information in your email to help us address your concerns
          effectively.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          Feedback and Suggestions
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Your feedback is invaluable to us. If you have suggestions for new
          features, improvements, or anything else that can enhance our
          platform, we would love to hear from you. Together, we can build a
          better resource for railway travelers across India.
        </p>
        <p className="text-lg leading-relaxed">
          Thank you for being a part of our journey. We look forward to
          connecting with you!
        </p>
      </div>
    </div>
  );
};

export default Contact;

export const metadata = {
  title: "Contact Us | UTS QR Code",
  description: "Get in touch with us for any inquiries, feedback, or assistance regarding UTS Station QR codes. We're here to help!",
};