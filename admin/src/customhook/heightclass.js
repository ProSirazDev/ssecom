import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance';
import { toast } from "react-toastify";

const useHeightClasses = () => {
  const [heights, setHeights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHeights = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/heightclass");
      setHeights(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createHeight = async (data) => {
    try {
      const res = await axios.post("/api/heightclass", data);
      setHeights((prev) => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const updateHeight = async (id, data) => {
    try {
      await axios.put(`/api/heightclass/${id}`, data);
      setHeights((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const deleteHeight = async (id) => {
    try {
      await axios.delete(`/api/heightclass/${id}`);
      setHeights((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted successfully");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  useEffect(() => {
    fetchHeights();
  }, []);

  return {
    heights,
    loading,
    error,
    createHeight,
    updateHeight,
    deleteHeight,
  };
};

export default useHeightClasses;
