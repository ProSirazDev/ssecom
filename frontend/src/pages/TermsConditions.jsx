import React from 'react';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

      <p className="mb-4">
        These Terms and Conditions govern your use of our website and services. By accessing or purchasing from our site, you agree to be bound by these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By using our website, you agree to comply with and be legally bound by these Terms. If you do not agree, please do not use our site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Account & User Responsibilities</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You must provide accurate and complete information during registration.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        <li>All activities under your account are your responsibility.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Product Information</h2>
      <p className="mb-4">
        We make every effort to ensure that product descriptions, pricing, and availability are accurate. However, errors may occur and we reserve the right to correct them.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Pricing and Payments</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>All prices are listed in USD (or your applicable currency) and include taxes unless stated otherwise.</li>
        <li>We accept major credit/debit cards and secure online payment options.</li>
        <li>Orders are subject to verification and acceptance before fulfillment.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Shipping & Delivery</h2>
      <p className="mb-4">
        Shipping times may vary depending on your location and selected shipping method. We are not responsible for delays caused by carriers or customs.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Returns and Refunds</h2>
      <p className="mb-4">
        Please refer to our <a href="/return-policy" className="text-blue-600 underline">Return Policy</a> page for details on how to request a return or exchange. Certain items may be non-returnable (e.g. final sale or personalized items).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Intellectual Property</h2>
      <p className="mb-4">
        All content on this site including images, graphics, and text is our property or licensed to us. You may not use, copy, or distribute content without permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any indirect, incidental, or consequential damages arising from the use of our site or products.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these Terms at any time. Any changes will be effective immediately upon posting.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions regarding these Terms, please contact us at: <br />
        <strong>Email:</strong> support@example.com
      </p>

      <p className="text-sm text-gray-500 mt-6">Last updated: May 26, 2025</p>
    </div>
  );
};

export default TermsConditions;
