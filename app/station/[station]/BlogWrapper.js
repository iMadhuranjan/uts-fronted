import { Badge } from "@/components/ui/badge";
import { Ban, MapPinCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogWrapper = ({ stationDetails }) => {
  const {
    stationName,
    uploaderName,
    qrCodeImage,
    state,
    isVerified,
    description = "This station is one of the key points for UTS QR code services and plays an important role in the region's public transportation system.",
  } = stationDetails;

  const sName = stationName
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <article className="max-w-4xl mx-auto p-5 font-ubuntu">
      {/* Header Section */}
      <header className="border-b border-gray-200 pb-6 mb-8 font-ubuntu">
        {/* Title Section */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            {sName} Station UTS QR Code (Active Code) 2025
          </h1>
          {/* Badge for Verification */}
        </div>

        {isVerified ? (
          <Badge className="bg-green-100 hover:bg-green-200 text-green-700 border-green-600 px-3 py-1 text-sm rounded-lg cursor-pointer">
            <ShieldCheck className="h-5 w-5 mr-1" /> <p>Verified</p>
          </Badge>
        ) : (
          <Badge className="bg-red-100 hover:bg-red-200 text-red-700 border-red-600 px-3 py-1 text-sm rounded-lg">
            <Ban className="h-5 w-5 mr-1" /> <p>Not Verified</p>
          </Badge>
        )}

        {/* Subtitle Section */}
        <div className="mt-3 flex gap-4  flex-col md:flex-row ">
          <p className="text-gray-600 text-lg flex items-center">
            Posted by{" "}
            <span className={`ml-2 font-medium text-gray-700`}>
              {uploaderName}
            </span>{" "}
          </p>
          <p className="flex items-center gap-2">
            <MapPinCheck className="w-5 h-5" />{" "}
            <span className="font-medium text-blue-600">{state}</span>
          </p>
        </div>
      </header>

      {/* Content Section */}
      <section>
        <p className="pb-3">
          <strong>{sName} UTS QR Code: </strong> are you Looking for an Uts Qr
          code for {sName} Station? If yes then you are in the right place My
          Friends. Are you tired of the hassle of finding a QR code to book your
          tickets at {sName}? The process can feel like a treasure hunt when
          there's no designated area for these QR codes at the station.
        </p>
        <p className="pb-4">
          {" "}
          Sometimes many people miss their trains because they are standing in
          the queue for tickets or those who book tickets through UTS are not
          able to get the UTS QR code quickly. So, to Solve this problem i have
          created this Website.
        </p>
        <p>
          You might think, "There are many websites that provide UTS QR codes,
          so what makes this one unique?" Well, keeping everything in mind, we
          created UTS QR Code with a fresh approach. Here, not only can people
          access UTS QR codes conveniently, but they can also contribute by
          uploading UTS QR codes from their nearby areas. This way, users can
          help their local community by sharing useful information effortlessly.
        </p>
        <h2 className="text-2xl md:text-3xl font-bold py-4">
          {" "}
          What is the UTS App?{" "}
        </h2>
        <p>
          The UTS app is the official Indian Railways mobile application,
          enabling passengers to purchase daily tickets directly from their
          phones. With features like online payments and QR-based booking, it
          eliminates the need to wait in long queues. This is one of the best
          app for Daily Local Traverlers.
        </p>
        <p className="py-3">
          <span className="text-red-500 font-bold">Note</span>: With the help of
          UTS QR Code, you can book tickets only within the station premises. QR
          code booking is not allowed outside the station.
        </p>
        <h2 className="text-2xl md:text-3xl font-bold py-4">
          {sName} Uts Qr Code
        </h2>
        <p>
          {" "}
          Below you can find the active and updated UTS QR Code for {sName}{" "}
          uploaded by <strong>{uploaderName}. </strong> You can use this QR Code
          to book train tickets conveniently. If you face any issues, You can
          upload your own UTS QR code on this Website By{" "}
          <Link href={"/login"} className="text-blue-600 font-bold">
            Sign In
          </Link>
          . It's Free!
        </p>
        <div style={{ maxWidth: "600px", margin: "auto" }} className="py-5">
          <Image
            src={qrCodeImage}
            layout="intrinsic"
            width={500}
            height={300}
          />
        </div>

        <p>
          With the help of above {sName} Uts Qr code you can eaily Book {sName}{" "}
          Station Ticket Online Without any Problem. Thanks{" "}
          <strong>{uploaderName}</strong> for Provding this QR Code.
        </p>

        <p className="py-3 font-bold">
          {" "}
          {uploaderName} Thoughts on {sName} UTS QR Code{" "}
        </p>
        <div className="border-l-4 border-gray-400 pl-4 my-6">
          <p className="text-base italic">"{description}"</p>
          <p className="text-right font-medium mt-2">- {uploaderName}</p>
        </div>

        <h3 className="py-4 text-xl md:text-2xl font-bold">
          {" "}
          How to Use {sName} Uts QR Code?
        </h3>

        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <strong>Download the UTS App:</strong> Get the app from the Google
            <a
              href="https://play.google.com/store/apps/details?id=com.cris.utsmobile&hl=en_IN"
              target="_blank"
              className="text-blue-700"
            >
              {" "}
              Play Store{" "}
            </a>
            or
            <a
              href="https://apps.apple.com/in/app/uts/id1357055366"
              target="_blank"
              className="text-blue-700"
            >
              App Store
            </a>{" "}
            .
          </li>
          <li>
            <strong>Log In or Register:</strong> Sign up or log in to your UTS
            account.
          </li>
          <li>
            <strong>Select QR Booking:</strong> Tap the "QR Booking" option in
            the app.
          </li>
          <li>
            <strong>Scan the QR Code:</strong> Use your phone's camera to scan
            the {sName} UTS QR Code below.
          </li>
          <li>
            <strong>Complete Payment:</strong> Pay using UPI, a credit or debit
            card, or your Rwallet for a seamless experience. Recharging your
            Rwallet in advance gives you a 3% discount on railway tickets.
          </li>
          <li>
            <strong>Enjoy Your Ticket:</strong> Once the payment is complete,
            your ticket will be available in the app.
          </li>
        </ol>

        <div className="space-y-4 text-gray-700 mt-4">
          <h2 className="py-1 font-bold text-black text-2xl"> FAQs on UTS </h2>
          <div>
            <h3 className="font-semibold">
              1. Can I scan the QR code if I don’t have another phone?
            </h3>
            <p>
              Yes, you can print the QR code or use a smartwatch with picture
              support to scan it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              2. Can I scan the QR code from home?
            </h3>
            <p>
              No, the UTS app requires you to be physically present at {sName}{" "}
              to scan the QR code.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              3. What if my phone's camera doesn’t work?
            </h3>
            <p>
              You can borrow a friend’s or family member’s phone to complete the
              QR code scanning and ticket booking process.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              4. Can I use UTS QR codes on public holidays?
            </h3>
            <p>
              Yes, the UTS QR code system is operational 24/7, including public
              holidays.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              5. What happens if I don’t complete the payment after scanning?
            </h3>
            <p>
              The booking will remain incomplete, and the ticket will not be
              issued. You can retry the process or start over.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              6. Are there any additional charges for using QR code booking?
            </h3>
            <p>
              No, there are no extra charges for QR code bookings. You only pay
              for the ticket price.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              7. Can I use a QR code from another station?
            </h3>
            <p>
              No, the QR code is specific to {sName}. You need to use the QR
              code available at the station where you are booking the ticket.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              8. What is the advantage of using Rwallet?
            </h3>
            <p>
              Using Rwallet allows you to recharge in advance and get a 3%
              discount on railway tickets, saving you money on frequent travel.
            </p>
          </div>
        </div>

        <dv>
          <p>
            <h2 className="py-4 text-xl font-bold">Final Words</h2>
            Booking train tickets at [sName] has never been easier with
            the UTS QR Code. Scan, pay, and travel hassle-free with this
            convenient option. If you face any issues, feel free to contact us
            or bookmark this page for quick access.
          </p>
        </dv>
      </section>
    </article>
  );
};

export default BlogWrapper;

