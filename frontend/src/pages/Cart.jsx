import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../globalstate/cartcontext";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../globalstate/authcontext";
import { FaTrash } from "react-icons/fa";
import AvailableOffers from "../components/AvailableOffers";
import CouponOffers from "../components/CouponOffers";
import axios from "../utils/axiosInstance";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    discountval,
    setDiscountVal,
    appliedCoupon,
    setAppliedCoupon
  } = useCart();

  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get('/api/coupons');
        setCoupons(res.data);
      } catch (err) {
        toast.error("Failed to fetch coupons");
      }
    };
    fetchCoupons();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
useEffect(() => {
  if (!appliedCoupon) return;

  if (total < appliedCoupon.minimum_order_value) {
    setAppliedCoupon(null);
    setDiscountVal(0);
    // toast.warning("Coupon removed: Order no longer meets minimum value.");
    return;
  }

  let discount = 0;

  if (appliedCoupon.discount_type === "percentage") {
    discount = (total * appliedCoupon.discount_value) / 100;
    if (discount > appliedCoupon.max_discount) discount = appliedCoupon.max_discount;
  } else if (appliedCoupon.discount_type === "flat") {
    discount = appliedCoupon.discount_value;
  }

  setDiscountVal(discount);
  setAppliedCoupon({ ...appliedCoupon, discount });
}, [total]);

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.coupon_code.toLowerCase() === couponCode.toLowerCase());

    if (!coupon) {
      toast.error("Please enter a valid coupon code");
      setAppliedCoupon(null);
      setDiscountVal(0);
      return;
    }

    if (!coupon.is_active) {
      toast.warning("This coupon is not active");
      return;
    }

    if (total < coupon.minimum_order_value) {
      toast.warning(`Minimum order value should be ₹${coupon.minimum_order_value}`);
      return;
    }

    let discount = 0;
    if (coupon.discount_type === 'percentage') {
      discount = (total * coupon.discount_value) / 100;
      if (discount > coupon.max_discount) discount = coupon.max_discount;
    } else if (coupon.discount_type === 'flat') {
      discount = coupon.discount_value;
    }

    setDiscountVal(discount);
    setAppliedCoupon({ ...coupon, discount });
    toast.success(`Woohoo! You saved ₹${discount} 🎉`);
  };

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginCheck = () => {
    if (cartItems.length === 0) {
      navigate("/");
      return;
    }
    if (!user) {
      toast.warning("Please login to proceed to checkout.");
      navigate("/login");
    } else {
      navigate("/delivery-address");
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 py-8 px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6 bg-white border border-gray-200 p-5 shadow">
          {cartItems.length === 0 ? (
            <div className="text-gray-500 text-lg flex items-center justify-center flex-col gap-y-5 py-5">
              <p className="text-base font-medium">Your Cart is Empty</p>
              <Link to="/" className="bg-black text-white px-5 py-2">Shop Now</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 justify-center lg:grid-cols-12 items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md transition gap-3"
              >
                <div className="col-span-3">
                  <img
                    src={item.unit_image}
                    alt={item.product_name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                </div>
                <div className="col-span-6 space-y-2">
                  <h2 className="font-semibold text-gray-800">{item.product_name}</h2>
                  <p className="text-sm text-gray-500">{item.brand_name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-sm"><span className="font-medium">Size: </span>{item.selectedSize}</p>
                  <p className="text-sm"><span className="font-medium">Color: </span>{item.selectedColor}</p>
                </div>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center justify-center rounded px-2 py-1 w-fit mx-auto">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.selectedSize, item.selectedColor)}
                      className="text-gray-600 hover:text-indigo-600 px-1 mx-1 border border-gray-500"
                    >−</button>
                    <span className="px-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id, item.selectedSize, item.selectedColor)}
                      className="text-gray-600 hover:text-indigo-600 px-1 mx-1 border border-gray-500"
                    >+</button>
                  </div>
                  <div className="font-semibold text-black text-center">
                    <span className="text-base font-medium">&#x20B9; </span>
                    {(Number(item.price) * item.quantity).toFixed(2)}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
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

        {/* Order Summary */}
        <div>
          {cartItems.length !== 0 && (
            <div className="bg-white p-6 rounded shadow-lg border border-gray-200 h-fit sticky top-20">
              <CouponOffers />
              <div className="my-4">
                <label className="block text-sm text-gray-600 mb-1">Apply Coupon</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2  text-sm"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2">
                    Applied : {appliedCoupon.coupon_code} — Saved ₹{appliedCoupon.discount} 😘
                  </p>
                )}
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-6">Order Summary</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">&#x20B9;{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon Discount</span>
                  <span className="font-medium">- &#x20B9;{discountval}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">&#x20B9;5.00</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 mt-4 text-base font-medium">
                <span>Total</span>
                <span>₹ {(total + 5 - discountval).toFixed(2)}</span>
              </div>

              <div className="mt-5 flex w-full justify-end">
                <button
                  onClick={handleLoginCheck}
                  className="px-5 bg-teal-500 hover:bg-teal-600 text-white py-2 transition shadow-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="mt-10">
          <AvailableOffers />
        </div>
      )}
    </div>
  );
};

export default Cart;
