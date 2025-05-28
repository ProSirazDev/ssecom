import React from 'react';
import { FaTag, FaGift, FaTruck } from 'react-icons/fa';
import { RiCoupon2Fill } from 'react-icons/ri';

const AvailableOffers = () => {
  const offers = [
    {
      icon: <FaTag className="text-teal-600 mr-3" />,
      title: "Flat 10% Off",
      description: "Use code FLAT10 on orders above ₹999. T&C apply.",
    },
    {
      icon: <FaGift className="text-purple-600 mr-3" />,
      title: "Buy 1 Get 1 Free",
      description: "Applicable on selected products only.",
    },
    {
      icon: <FaTruck className="text-orange-500 mr-3" />,
      title: "Free Shipping",
      description: "Get free shipping on prepaid orders above ₹499.",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <RiCoupon2Fill/> Available Offers
      </h3>

      <ul className="space-y-4">
        {offers.map((offer, index) => (
          <li key={index} className="flex items-start">
            <span className="mt-1">{offer.icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-900">{offer.title}</p>
              <p className="text-sm text-gray-600">{offer.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableOffers;
