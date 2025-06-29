import React, { useState, useContext, useEffect } from "react";

import { FiSearch, FiMenu, FiX } from "react-icons/fi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../globalstate/cartcontext";
import { FaShoppingCart ,FaHeart,FaUserCircle, FaLocationArrow  } from "react-icons/fa";
import axios from '../utils/axiosInstance'; // Make sure this is imported


import { AuthContext } from "../globalstate/authcontext";
import { toast } from "react-toastify";
import { useSearch } from "../globalstate/searchcontext";
import { useRef } from "react";

// Inside Navbar component




const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext); // ✅ AuthContext usage
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [userHover, setUserHover] = useState(false);
const userHoverTimeout = useRef(null);

const handleUserMouseEnter = () => {
  clearTimeout(userHoverTimeout.current);
  setUserHover(true);
};

const handleUserMouseLeave = () => {
  userHoverTimeout.current = setTimeout(() => {
    setUserHover(false);
  }, 150); // delay to prevent flickering
};
    

  // Navigate to /products on searchTerm change
  useEffect(() => {
    if (searchTerm.trim() !== "" && location.pathname !== "/products") {
      navigate("/products");
    }
  }, [searchTerm]);
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isLoggedIn = !!user;
  const userName = user?.email || "Guest";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


const handleLogout = async () => {
  try {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });

    toast.success("Logged Out Successfully");

    setUser(null);
    navigate('/');
  } catch (err) {
    console.error('Logout failed:', err);
    toast.error('Failed to logout');
  }
};



  return (
    <>
      {/* <Header /> */}
      <nav className="bg-gradient-to-r from-gray-800 via-sky-900 to-gray-900 text-white px-2 py-1  md:px-10 sticky top-0 sm:top-0 z-50 w-full transition-all duration-300 ">
        <div className="flex justify-between items-center sm:gap-x-2">
          <Link to="/" className="flex items-center bg-white hidden md:block rounded-full">
            <img
              src="https://res.cloudinary.com/des8x6d4o/image/upload/v1751220354/ssecomlogo_de9nbv.png"
              alt="Logo"
              className=" w-6 h-6 sm:w-14 sm:h-14 object-contain rounded-full   "
            />
          </Link>

          {/* <Menu /> */}
          <div className=" items-center gap-2 hidden md:flex">
          <FaLocationArrow className="text-white "/>
           <p className="text-white text-base">Hyderabad : 500008</p></div>

             <div className=" relative sm:mx-4 w-[70vw]    sm:w-[40vw] my-2 sm:my-3 ">
              <div className="absolute bg-orange-500 rounded-l-full inset-y-0  flex items-center justify-center sm:px-2 pointer-events-none">
                <FiSearch className="h-2 sm:w-4 sm:h-4 text-white rounde-l-full" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full h-3 sm:h-9 pl-10 pr-3 rounded-full py-3 sm:py-3 border border-gray-200  bg-white text-black placeholder-gray-700 focus:outline-none text-xs  sm:text-sm transition"
              />
            </div>

          <div className="flex flex-col   space-x-1 md:space-x-7 ">
            {/* User Icon */}
           <div className="flex justify-end sm:my-2 space-x-7 sm:space-x-16">
  {/* User Icon */}
 <div
  className="relative"
  onMouseEnter={handleUserMouseEnter}
  onMouseLeave={handleUserMouseLeave}
>
  {isLoggedIn ? (
    <>
      <button className="flex items-center justify-center text-white">
        <FaUserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {userHover && (
        <div className="absolute right-0 mt-1 w-60 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
          <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
            Welcome, {userName}
          </div>
          {/* <hr /> */}
          <Link
            to="/my-profile"
            className="block px-4 py-2 text-md text-gray-700  hover:text-teal-500 hover:underline"
          >
            My Profile
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 text-md text-gray-700  hover:text-teal-500 hover:underline"
          >
            Orders
          </Link>
          <Link
            to={`/address`}
            className="block px-4 py-2 text-md text-gray-700  hover:text-teal-500 hover:underline"
          >
            Address
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-md text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </>
  ) : (
    <Link
      to="/login"
      className="flex items-center justify-center text-white hover:text-indigo-600"
    >
      <FaUserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
    </Link>
  )}
</div>

     

  {/* Become Seller Icon */}
  <Link
    to="/becomeseller"
    className="flex items-center justify-center text-white hidden md:block   hover:text-indigo-600"
  >
    <FaHeart  className="h-6 w-6 text-white" />
  </Link>

  {/* Cart Icon */}
  <Link
    to="/cart"
    className="relative flex items-center justify-center   text-white hover:text-indigo-600"
  >
    <FaShoppingCart  className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-small rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </Link>
</div>

         

            <div className="hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 transition-all duration-300">
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-white" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 border border-white rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base text-white hover:bg-gray-100 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/deals"
              className="block px-3 py-2 rounded-md text-base text-white hover:bg-gray-100 hover:text-indigo-600"
            >
              Deals
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base text-white hover:bg-gray-100 hover:text-indigo-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base text-white hover:bg-gray-100 hover:text-indigo-600"
            >
              Contact
            </Link>
          </div>
        )} */}
      </nav>
    </>
  );
};

export default Navbar;
