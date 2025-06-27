import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance';
import { toast } from "react-toastify";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
console.log(orders,"orders");

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single order by ID
  const fetchOrderById = async (id) => {
    try {
      const res = await axios.get(`/api/orders/${id}`);
      return { success: true, order: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

    const fetchOrderByorderId = async (orderid) => {
    try {
      const res = await axios.get(`/api/orders/details/${orderid}`);
      return { success: true, order: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };


  // Update an order
  const updateOrder = async (id, orderData) => {
    try {
      const res = await axios.put(`/api/orders/${id}`, orderData);
     setOrders((prev) => {
  if (!Array.isArray(prev.orders)) return prev;

  return {
    ...prev,
    orders: prev.orders.map((order) =>
      order.id === id ? { ...order, ...res.data.order } : order
    ),
  };
});

      toast.success("Order updated successfully");
      return { success: true };
    } catch (err) {
      toast.error("Failed to update order");
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    fetchOrderByorderId,
    updateOrder,
  };
};

export default useOrders;
