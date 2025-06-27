import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";

const useCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all coupons
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/coupons");
      setCoupons(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new coupon
  const createCoupon = async (couponData) => {
    try {
      const res = await axios.post("/api/coupons", couponData);
      setCoupons((prev) => [...prev, { ...couponData, id: res.data.id }]);
      toast.success("Coupon created");
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  // Update an existing coupon
  const updateCoupon = async (id, couponData) => {
    try {
      await axios.put(`/api/coupons/${id}`, couponData);
      setCoupons((prev) =>
        prev.map((coupon) => (coupon.id === id ? { ...coupon, ...couponData } : coupon))
      );
      toast.success("Coupon updated");
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  // Delete a coupon
  const deleteCoupon = async (id) => {
    try {
      await axios.delete(`/api/coupons/${id}`);
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
      toast.success("Coupon deleted");
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return {
    coupons,
    loading,
    error,
    createCoupon,
    updateCoupon,
    deleteCoupon,
  };
};

export default useCoupons;
