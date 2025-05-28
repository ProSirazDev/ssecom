import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-3xl font-bold mb-4">Return & Refund Policy</h1>

      <p className="mb-4">
        We want you to be completely satisfied with your purchase. If for any reason you're not happy, we're here to help. Please review our return and refund policy below.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Return Eligibility</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Items must be returned within <strong>15 days</strong> of delivery.</li>
        <li>Products must be unused, in original packaging, and in resellable condition.</li>
        <li>A receipt or proof of purchase is required.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Non-Returnable Items</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Gift cards</li>
        <li>Final sale items</li>
        <li>Personalized or custom-made products</li>
        <li>Opened cosmetics or hygiene items</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. How to Initiate a Return</h2>
      <p className="mb-4">
        To start a return, please contact our support team at <strong>returns@example.com</strong> with your order number and reason for return.
      </p>
      <p className="mb-4">
        Once your return is approved, we will provide a return shipping label and instructions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Refunds</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Refunds will be processed to the original payment method within <strong>5–7 business days</strong> after we receive the item.</li>
        <li>You will be notified via email once your refund has been issued.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Exchanges</h2>
      <p className="mb-4">
        We only replace items if they are defective or damaged. If you need to exchange an item for the same product, please email us with a photo and your order details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Return Shipping Costs</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>If the return is due to our error (damaged or incorrect item), we will cover return shipping costs.</li>
        <li>For all other returns, the customer is responsible for return shipping fees.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about returns or refunds, contact us at:<br />
        <strong>Email:</strong> returns@example.com
      </p>

      <p className="text-sm text-gray-500 mt-6">Last updated: May 26, 2025</p>
    </div>
  );
};

export default ReturnPolicy;
