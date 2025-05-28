import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/logo3.png";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { IoBagOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../globalstate/cartcontext";
import { FaShoppingCart ,FaHeart,FaUserCircle, FaLocationArrow  } from "react-icons/fa";

import Header from "./Header";
import Menu from "./Menu";
import { AuthContext } from "../globalstate/authcontext";
import { toast } from "react-toastify";
import { useSearch } from "../globalstate/searchcontext";
import Login from "../pages/Login";
import MobileSignin from "../pages/MobileSignin";
import OtpVerify from "../pages/OtpVerify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext); // ✅ AuthContext usage
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
    

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
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

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
      <Header />
      <nav className="bg-gray-800 px-6 md:px-10 sticky top-0 z-50 w-full transition-all duration-300 border-b ">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center bg-white rounded-full">
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 object-cover   "
            />
          </Link>

          {/* <Menu /> */}
          <div className="flex items-center gap-2"><FaLocationArrow className="text-white"/> <p className="text-white text-base">Hyderabad : 500008</p></div>

             <div className="hidden md:block relative mx-4    w-[40vw] my-3 ">
              <div className="absolute bg-orange-500 inset-y-0  flex items-center justify-center px-2 pointer-events-none">
                <FiSearch className="w-4 h-4 text-white" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full h-9 pl-10 pr-3 rounded py-3 border border-gray-200  bg-gray-200 text-black placeholder-gray-700 focus:outline-none  text-sm transition"
              />
            </div>

          <div className="flex flex-col   space-x-5 md:space-x-7">
            {/* User Icon */}
           <div className="flex justify-end my-2 space-x-5 md:space-x-16">
  {/* User Icon */}
  <div className="relative group">
    {isLoggedIn ? (
      <>
        <button className="flex items-center justify-center text-white group-hover:text-teal-600">
          <FaUserCircle  className="h-6 w-6" />
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border hidden group-hover:block">
          <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
            Welcome, {userName}
          </div>
          <hr />
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit Profile
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Orders
          </Link>
          <Link
            to="/address"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Address
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </>
    ) : (
  <>
    {/* 👤 User Icon Button */}
   <Link
    to="/signin"
    className="flex items-center justify-center text-white   hover:text-indigo-600"
  >
    <FaUserCircle  className="h-6 w-6 text-white" />
  </Link>
    {/* 🔐 SignIn Modal */}
    {/* {showModal && (
      <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
             <h2 className="text-xl font-semibold mb-4">
        {modalStep === "signin" ? "Sign In" : "Verify OTP"}
      </h2>

      {modalStep === "signin" && <MobileSignin />}
      {modalStep === "otp" && <OtpVerify />}
        </div>
      </div>
    )} */}
  </>
)}
  </div>
  
     

  {/* Become Seller Icon */}
  <Link
    to="/becomeseller"
    className="flex items-center justify-center text-black   hover:text-indigo-600"
  >
    <FaHeart  className="h-6 w-6 text-white" />
  </Link>

  {/* Cart Icon */}
  <Link
    to="/cart"
    className="relative flex items-center justify-center  text-black hover:text-indigo-600"
  >
    <FaShoppingCart  className="h-6 w-6 text-white" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-small rounded-full h-4 w-4 flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </Link>
</div>

         

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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

        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 transition-all duration-300">
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/deals"
              className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
            >
              Deals
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
