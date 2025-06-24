import React from 'react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-sky-900 to-gray-900 text-white py-1 px-4">
      <marquee behavior="scroll" direction="left" scrollamount="6">
        <span className="text-sm font-sm ">
          🎉 Special Offer: Enjoy up to 50% Off on selected items! &nbsp;&nbsp;&nbsp; 
          📧 Contact: shopeasy@gmail.com &nbsp;&nbsp;&nbsp; 
          🚚 Free Delivery on orders above ₹499! &nbsp;&nbsp;&nbsp; 
          🛍️ New arrivals just landed. Check them out!
        </span>
      </marquee>
    </div>
  );
};

export default Header;
