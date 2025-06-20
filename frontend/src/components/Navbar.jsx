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
              src="data:image/png;base64,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"
              alt="Logo"
              className="w-14 h-14 object-cover rounded-full   "
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
                className="w-full h-9 pl-10 pr-3 rounded py-3 border border-gray-200  bg-white text-black placeholder-gray-700 focus:outline-none  text-sm transition"
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
        <div className="absolute right-0 mt-1 w-60 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200 hidden group-hover:block">
          <div className="px-4 py-2 text-sm text-gray-700 font-semibold">
            Welcome, {userName}
          </div>
          <hr />
          <Link
            to="/my-profile"
            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
          >
            My Profile
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
          >
            Orders
          </Link>
          <Link
            to={`/address/${user.id}`}
            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
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
