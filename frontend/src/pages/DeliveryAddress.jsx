import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../globalstate/cartcontext";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../globalstate/authcontext";
import { FaTrash } from "react-icons/fa";
import AvailableOffers from "../components/AvailableOffers";
import CouponOffers from "../components/CouponOffers";
import Loader from "../components/Loader";

const DeliveryAddress = () => {
  const { user } = useContext(AuthContext);
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/address/${user.id}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch addresses");
          return res.json();
        })
        .then(data => {
          setAddresses(data);
          const defaultAddr = data.find(addr => addr.is_default);
          if (defaultAddr) setSelectedAddressId(defaultAddr.id);
        })
        .catch(error => {
          console.error("Error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      navigate("/");
      return;
    } else if (!user) {
      toast.warning("Please login to proceed to checkout.");
      navigate("/signin");
      return;
    } else if (!selectedAddressId) {
      toast.error("Please select a shipping address.");
      return;
    }
const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  if (!selectedAddress) {
    toast.error("Selected address not found.");
    return;
  }

  // Compose full address string
  const shippingAddress = `${selectedAddress.full_name}, ${selectedAddress.address_line1}, ${selectedAddress.address_line2 || ""}, ${selectedAddress.landmark || ""}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.postal_code}, ${selectedAddress.country}`;
    try {
      const payload = {
        customer_id: user.id,
        payment_method: "cash",
        payment_status: "unpaid",
        shipping_address: shippingAddress,
        address_id: selectedAddressId,
        order_status: "Pending",
        cartItems: cartItems.map(({ id, quantity, price, product_name }) => ({
          product_id: id,
          quantity,
          price,
          product_name,
        })),
      };

      const response = await axios.post("/api/orders", payload, {
        withCredentials: true,
      });

      if (response.status === 201) {
        clearCart();
        navigate("/checkout", {
          state: { amount: (total + 5) * 100 },
        });
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Error placing order.");
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-50 py-8 px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Address Section */}
        <div className="lg:col-span-2 space-y-6 bg-white border border-gray-200 p-5 shadow">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
            {loading ? (
                 <div className="flex  justify-center py-10 w-full mx-auto h-screen"><Loader
                 /></div>
            ) : addresses.length === 0 ? (
              <p>No addresses found.</p>
            ) : (
          <ul className="space-y-4">
  {addresses.map(addr => (
    <li
      key={addr.id}
      className={`border border-gray-200 p-4 rounded shadow-sm cursor-pointer flex items-start gap-3 ${
        selectedAddressId === addr.id
          ? "border-green-600 bg-green-50"
          : "hover:border-gray-400"
      }`}
      onClick={() => setSelectedAddressId(addr.id)}
    >
      <input
        type="radio"
        name="selectedAddress"
        value={addr.id}
        checked={selectedAddressId === addr.id}
        onChange={() => setSelectedAddressId(addr.id)}
        className="mt-1"
      />
      <div className="text-sm">
        <p>
          <strong>{addr.full_name}</strong> ({addr.mobile_optional})
        </p>
        <p>
          {addr.address_line1}, {addr.address_line2}
        </p>
        <p>{addr.landmark}</p>
        <p>
          {addr.city}, {addr.state}, {addr.postal_code}
        </p>
        <p>{addr.country}</p>
        {addr.is_default && (
          <p className="text-green-600 font-semibold">
            Default Address
          </p>
        )}
      </div>
    </li>
  ))}
</ul>

            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          {cartItems.length !== 0 && (
            <div className="bg-white p-6 rounded shadow-lg border border-gray-200 h-fit sticky top-20">
              <CouponOffers />
              <h3 className="text-xl font-medium text-gray-800 mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">₹5.00</span>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 mt-4 text-base font-medium">
                <span>Total</span>
                <span>₹{(total + 5).toFixed(2)}</span>
              </div>
              <button
                onClick={handleOrder}
                className="mt-6 w-full bg-teal-600 hover:bg-indigo-700 text-white py-2 rounded transition shadow-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Available Offers */}
      {cartItems.length > 0 && (
        <div className="mt-10">
          <AvailableOffers />
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
