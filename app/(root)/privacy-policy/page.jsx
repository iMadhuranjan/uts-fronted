import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container bg-gray-100 text-gray-800 pt-navbar my-5 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
                <p className="text-lg leading-relaxed mb-4">
                    Effective Date: January 1, 2025
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    At our platform, we are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy explains how we collect, use, and protect the information you provide to us. By using this platform, you agree to the terms outlined in this policy.
                </p>
                <h2 className="text-2xl font-bold mt-6 mb-4">1. Information We Collect</h2>
                <p className="text-lg leading-relaxed mb-4">
                    We collect two types of information from our users:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li><strong>Personal Information:</strong> This includes data you provide directly, such as your name, email address, and any other details you submit when uploading QR codes, contacting us, or registering on the platform.</li>
                    <li><strong>Usage Data:</strong> This includes information about how you interact with the platform, such as your IP address, browser type, device information, and search queries. This data is collected automatically to improve the functionality of the platform.</li>
                </ul>
                <h2 className="text-2xl font-bold mt-6 mb-4">2. How We Use Your Information</h2>
                <p className="text-lg leading-relaxed mb-4">
                    The information we collect is used for the following purposes:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>To provide and improve our services.</li>
                    <li>To respond to your inquiries and requests.</li>
                    <li>To analyze user behavior and enhance platform performance.</li>
                    <li>To maintain the security and integrity of the platform.</li>
                    <li>To comply with legal obligations and enforce our terms of service.</li>
                </ul>
                <h2 className="text-2xl font-bold mt-6 mb-4">3. Sharing Your Information</h2>
                <p className="text-lg leading-relaxed mb-4">
                    We value your trust and will never sell your personal information to third parties. However, we may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>With service providers who assist us in operating the platform and delivering our services.</li>
                    <li>To comply with legal requirements, such as responding to court orders or government requests.</li>
                    <li>To protect the rights, property, or safety of our platform, users, or others.</li>
                </ul>
                <h2 className="text-2xl font-bold mt-6 mb-4">4. Data Security</h2>
                <p className="text-lg leading-relaxed mb-4">
                    We implement industry-standard security measures to safeguard your personal information from unauthorized access, disclosure, alteration, or destruction. Despite our efforts, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
                <h2 className="text-2xl font-bold mt-6 mb-4">5. Your Choices</h2>
                <p className="text-lg leading-relaxed mb-4">
                    You have the right to:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Access the personal information we have collected about you.</li>
                    <li>Request corrections to inaccuracies in your personal information.</li>
                    <li>Delete your personal information, subject to certain legal or operational restrictions.</li>
                    <li>Opt out of receiving promotional communications from us.</li>
                </ul>
                <h2 className="text-2xl font-bold mt-6 mb-4">6. Cookies and Tracking Technologies</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Our platform uses cookies and similar tracking technologies to enhance your user experience. Cookies are small text files stored on your device that help us understand user behavior and improve our services. You can manage your cookie preferences through your browser settings.
                </p>
                <h2 className="text-2xl font-bold mt-6 mb-4">7. Third-Party Links</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
                <h2 className="text-2xl font-bold mt-6 mb-4">8. Children's Privacy</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Our platform is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it promptly.
                </p>
                <h2 className="text-2xl font-bold mt-6 mb-4">9. Updates to This Privacy Policy</h2>
                <p className="text-lg leading-relaxed mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with the effective date indicated at the top.
                </p>
                <h2 className="text-2xl font-bold mt-6 mb-4">10. Contact Us</h2>
                <p className="text-lg leading-relaxed mb-4">
                    If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at:
                </p>
                <p className="text-lg font-bold mb-4">
                    Email: <a href="mailto:HeyMadhuranjan@gmail.com" className="text-blue-600 underline">HeyMadhuranjan@gmail.com</a>
                </p>
                <p className="text-lg leading-relaxed">
                    We are committed to addressing your inquiries promptly and ensuring that your privacy is respected.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy

export const metadata = {
    title: "Privacy Policy | UTS QR Code",
    description: "Understand how we collect, use, and protect your personal information when using the UTS QR Code platform.",
  };
  