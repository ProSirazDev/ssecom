import React from "react";
import { FaCheckCircle, FaWarehouse, FaShippingFast, FaLock, FaHeadset } from "react-icons/fa";

const features = [
  {
    title: "QUALITY AND SAVING",
    description: "Comprehensive quality control and affordable prices",
    icon: <FaCheckCircle className="text-emerald-600 text-4xl mb-4" />,
  },
  {
    title: "GLOBAL WAREHOUSE",
    description: "37 overseas warehouses",
    icon: <FaWarehouse className="text-amber-500 text-4xl mb-4" />,
  },
  {
    title: "FAST SHIPPING",
    description: "Fast and convenient door to door delivery",
    icon: <FaShippingFast className="text-sky-500 text-4xl mb-4" />,
  },
  {
    title: "PAYMENT SECURITY",
    description: "More than 10 different secure payment methods",
    icon: <FaLock className="text-red-500 text-4xl mb-4" />,
  },
  {
    title: "HAVE QUESTIONS?",
    description: "24/7 Customer Service - We’re here and happy to help!",
    icon: <FaHeadset className="text-purple-600 text-4xl mb-4" />,
  },
];

const Whyus = () => {
  return (
    <div className="py-10 px-4 bg-orange-500/10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4  mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 hover:bg-white transition-all duration-300  shadow-md hover:shadow-xl text-center p-4 aspect-square flex flex-col items-center justify-center"
          >
            {feature.icon}
            <h3 className="text-sm font-semibold text-gray-700 mb-2">{feature.title}</h3>
            <p className="text-xs text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Whyus;
