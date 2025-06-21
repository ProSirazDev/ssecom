import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance';
import { toast } from "react-toastify";

const useWeightClasses = () => {
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeights = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/weightclass");
      setWeights(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWeight = async (data) => {
    try {
      const res = await axios.post("/api/weightclass", data);
      setWeights((prev) => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const updateWeight = async (id, data) => {
    try {
      await axios.put(`/api/weightclass/${id}`, data);
      setWeights((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const deleteWeight = async (id) => {
    try {
      await axios.delete(`/api/weightclass/${id}`);
      setWeights((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted successfully");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  return {
    weights,
    loading,
    error,
    createWeight,
    updateWeight,
    deleteWeight,
  };
};

export default useWeightClasses;
