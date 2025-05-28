import React, { useState } from 'react';

const Payment = ({ totalAmount, onPay }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    // add more methods if needed
  ];

  const handlePayClick = () => {
    onPay(paymentMethod);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
      <div className="mb-6">
        {paymentMethods.map(({ value, label }) => (
          <label key={value} className="block mb-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value={value}
              checked={paymentMethod === value}
              onChange={() => setPaymentMethod(value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="border-t pt-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
      <p>
  Total Amount: <span className="font-bold">${Number(totalAmount || 0).toFixed(2)}</span>
</p>

      </div>

      <button
        onClick={handlePayClick}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
