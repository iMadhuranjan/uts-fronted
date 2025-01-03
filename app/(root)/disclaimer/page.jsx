import React from "react";

const Disclaimer = () => {
  return (
    <div className="disclaimer-container bg-gray-100 text-gray-900 pt-navbar my-5 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Disclaimer</h1>
        <p className="text-lg leading-relaxed mb-4">
          This website is a community-driven platform designed to assist railway
          travelers in accessing UTS QR codes. While we strive to ensure the
          accuracy and reliability of the information provided, we do not
          guarantee its completeness, timeliness, or correctness. Users are
          strongly advised to verify any QR codes or associated details with
          official railway sources before relying on them.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          By using this platform, you agree to the following terms:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            This platform is not affiliated with or endorsed by Indian Railways
            or any government entity.
          </li>
          <li>
            The information provided is for general informational purposes only
            and should not be used for any unauthorized or illegal activities.
          </li>
          <li>
            Users must ensure that their use of this platform complies with all
            applicable laws and regulations.
          </li>
          <li>
            The creators and maintainers of this platform are not responsible
            for any inaccuracies, omissions, or misuse of the information
            provided.
          </li>
        </ul>
        <p className="text-lg leading-relaxed mb-4">
          Users are strictly prohibited from using this platform for fraudulent
          or deceptive purposes. Any misuse of the platform may result in
          account suspension, legal action, or other consequences as deemed
          appropriate.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          If you are a representative of Indian Railways or any other relevant
          authority and have concerns regarding the content or functionality of
          this platform, please contact us directly. We are committed to
          addressing legitimate concerns promptly and in good faith.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          The creators of this platform do not assume any responsibility or
          liability for damages, direct or indirect, arising from the use of the
          platform or its content. By accessing this website, you acknowledge
          and agree to these terms and conditions.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          We encourage all users to exercise caution and diligence when using
          the platform. Please report any inaccuracies, inappropriate content,
          or technical issues to us so that we can continually improve the
          quality and reliability of our services.
        </p>
        <p className="text-lg leading-relaxed">
          Thank you for your understanding and cooperation. Together, we can
          ensure that this platform remains a valuable and trustworthy resource
          for railway travelers across India.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;


export const metadata = {
  title: "Disclaimer | UTS QR Code",
  description: "Read our disclaimer to understand the terms, conditions, and limitations of using our UTS Station QR Code services.",
};
