import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#232F3E] shadow-inner mt-12  ">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-white">

        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">ShopEase</h2>
          <p className="mb-4">Your one-stop shop for everything awesome.</p>
          <div className="flex space-x-4 text-indigo-600 text-lg">
            <FiFacebook className="hover:text-indigo-800 cursor-pointer" />
            <FiInstagram className="hover:text-indigo-800 cursor-pointer" />
            <FiTwitter className="hover:text-indigo-800 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-indigo-600">Home</a></li>
            <li><a href="/shop" className="hover:text-indigo-600">Shop</a></li>
            <li><a href="/cart" className="hover:text-indigo-600">Cart</a></li>
            <li><a href="/contact" className="hover:text-indigo-600">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-2">Categories</h3>
          <ul className="space-y-2">
            <li><a href="/category/electronics" className="hover:text-indigo-600">Electronics</a></li>
            <li><a href="/category/fashion" className="hover:text-indigo-600">Fashion</a></li>
            <li><a href="/category/home" className="hover:text-indigo-600">Home & Garden</a></li>
            <li><a href="/category/beauty" className="hover:text-indigo-600">Beauty</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-2">Support</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:text-indigo-600">FAQ</a></li>
            <li><a href="/terms" className="hover:text-indigo-600">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-indigo-600">Privacy Policy</a></li>
            <li><a href="/returns" className="hover:text-indigo-600">Return Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-gray-300 py-4 text-white text-xs bg-black/10">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
