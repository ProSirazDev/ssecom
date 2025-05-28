import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        This Privacy Policy describes how we collect, use, and protect your information when you use our website and services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Payment details (securely processed through third-party services)</li>
        <li>Browsing behavior, device type, and location data</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To process your orders and manage your account</li>
        <li>To improve our website and customer service</li>
        <li>To send promotional emails (only with your consent)</li>
        <li>To detect and prevent fraud</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing of Data</h2>
      <p className="mb-4">
        We do not sell your personal data. We may share it with trusted partners for order fulfillment, payment processing, or legal compliance.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your experience, track website usage, and show relevant content. You can disable cookies in your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You can request access to your personal data</li>
        <li>You can ask us to delete or correct your information</li>
        <li>You can opt out of marketing emails at any time</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. Changes will be posted on this page with the revised date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: <br />
        <strong>Email:</strong> support@example.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
