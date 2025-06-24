import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  // window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-sky-900 to-gray-900 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-white">

        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-white">ShopEase</h2>
          <p className="mb-4 text-gray-300">Your one-stop shop for everything awesome.</p>
          <div className="flex space-x-4 text-indigo-500 text-lg">
            <FiFacebook className="hover:text-indigo-300 cursor-pointer" />
            <FiInstagram className="hover:text-indigo-300 cursor-pointer" />
            <FiTwitter className="hover:text-indigo-300 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/shop" className="hover:text-indigo-400">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-indigo-400">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Categories</h3>
          <ul className="space-y-2">
            <li><Link to="/category/electronics" className="hover:text-indigo-400">Electronics</Link></li>
            <li><Link to="/category/fashion" className="hover:text-indigo-400">Fashion</Link></li>
            <li><Link to="/category/home" className="hover:text-indigo-400">Home & Garden</Link></li>
            <li><Link to="/category/beauty" className="hover:text-indigo-400">Beauty</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-indigo-400">FAQ</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-400">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
            <li><Link to="/returns" className="hover:text-indigo-400">Return Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-gray-500 py-4 text-white text-xs bg-black/10">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
