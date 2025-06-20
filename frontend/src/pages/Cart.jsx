import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../globalstate/cartcontext";
import Recommended from "../components/Recommended";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../globalstate/authcontext"; // import your AuthContext

import { FaTrash } from "react-icons/fa";
import AvailableOffers from "../components/AvailableOffers";
import CouponOffers from "../components/CouponOffers";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { user,  } = useContext(AuthContext); // get user from context
  console.log("user in cart page", user);
  
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

 const handleLoginCheck = async () => {
  if (cartItems.length === 0) {
    navigate("/");
    return;
  }

  if (!user) {
    toast.warning("Please login to proceed to checkout.");
    navigate("/signin");
  } else {
    navigate('/delivery-address');
  }
};

  return (
    <div className="min-h-screen max-w-7xl mx-auto  bg-gray-50 py-8 px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6 bg-white border border-gray-200 p-5 shadow">
          {cartItems.length === 0 ? (
            <div className=" text-gray-500 text-lg flex items-center justify-center flex-col gap-y-5 py-5">
              <p className="text-base font-medium">Your Cart is Empty</p>
              <Link to="/" className="bg-black text-white px-5 py-2">
                Shop Now
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-2 lg:grid-cols-12 items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md transition gap-3"
              >
                <div className="col-span-3">
                  <img
                    src={item.unit_image}
                    alt={item.product_name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                </div>
                <div className="col-span-6 space-y-2">
                  <h2 className="font-semibold text-gray-800">
                    {item.product_name}
                  </h2>
                  <p className="text-sm text-gray-500">{item.brand_name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm"> <span className="font-medium">Size : </span>{item.selectedSize}</p>
                  <p className="text-sm"> <span className="font-medium">Color : </span>{item.selectedColor}</p>
                </div>
                <div className="col-span-3 space-y-2">
                  {/* <div className="text-sm text-gray-400">—</div> */}
                  <div className="">
                    <div className="flex items-center justify-center rounded px-2 py-1 w-fit mx-auto">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-gray-600 hover:text-indigo-600 px-1 mx-1  border  border-gray-500"
                      >
                        −
                      </button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="text-gray-600 hover:text-indigo-600 px-1 mx-1 border border-gray-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* <div className="col-span-1 text-center text-sm text-gray-700">
                    ${Number(item.price).toFixed(2)}
                  </div>
                  <div className="col-span-1 text-center text-gray-400 text-sm">
                    $0.00
                  </div> */}
                  <div className="col-span-1 font-semibold text-black text-center">
                   <span className="text-base font-medium">&#x20B9; </span> {(Number(item.price) * item.quantity).toFixed(2)}
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      <FaTrash className="text-sm cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          {/* Order Summary */}
          {cartItems.length !== 0 && (
            <div className="bg-white p-6 rounded shadow-lg border border-gray-200 h-fit sticky top-20">
              <CouponOffers />
              <h3 className="text-xl font-medium text-gray-800 mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">&#x20B9;{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">&#x20B9;5.00</span>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 mt-4 text-base font-medium">
                <span>Total</span>
                <span>&#x20B9; {(total + 5).toFixed(2)}</span>
              </div>
            <div className="mt-5 flex w-full justify-end">  <button 
                onClick={handleLoginCheck}
                className="  px-5 bg-teal-500 hover:bg-teal-600 text-white py-2  transition shadow-sm"
              >
               Continue
              </button></div>
            </div>
          )}
        </div>
      </div>
      {cartItems.legth >=0 && (
        <div className="mt-10">
          {/* <Recommended /> */}
          <AvailableOffers />
        </div>
      )}
      {cartItems.length > 0 && (
  <div className="mt-10">
    {/* <Recommended /> */}
    <AvailableOffers />
  </div>
)}

    </div>
  );
};

export default Cart;
