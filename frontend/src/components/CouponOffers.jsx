import React from 'react';
import { FaTags, FaCheckCircle, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

const coupons = [
  {
    code: "SAVE10",
    description: "Get 10% off on orders above ₹999",
    minOrder: "₹999",
    expiry: "31 May 2025",
  },
//   {
//     code: "FREESHIP",
//     description: "Free delivery on prepaid orders above ₹499",
//     minOrder: "₹499",
//     expiry: "30 June 2025",
//   },
//   {
//     code: "BOGO",
//     description: "Buy 1 Get 1 Free on selected items",
//     minOrder: "No minimum",
//     expiry: "15 July 2025",
//   },
];

const CouponOffers = () => {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon "${code}" copied!`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5  shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
        <FaTags className="text-teal-600 mr-2" />
        Coupons & Offers
      </h3>

      <div className="space-y-4">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 rounded-md flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
          >
            <div>
              <p className="text-sm font-bold text-gray-800">{coupon.code}</p>
              <p className="text-sm text-gray-600">{coupon.description}</p>
              <p className="text-xs text-gray-500">
                Min. Order: {coupon.minOrder} • Expires: {coupon.expiry}
              </p>
            </div>
            <button
              onClick={() => copyCode(coupon.code)}
              className="flex items-center text-sm bg-orange-600 hover:bg-teal-700 text-white px-3 py-1 "
            >
              {/* <FaCopy className="mr-1" /> */}
               Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponOffers;
