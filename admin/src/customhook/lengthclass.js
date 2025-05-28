import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useLengthClasses = () => {
  const [lengths, setLengths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLengths = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/lengthclass");
      setLengths(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createLength = async (data) => {
    try {
      const res = await axios.post("/api/lengthclass", data);
      setLengths((prev) => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const updateLength = async (id, data) => {
    try {
      await axios.put(`/api/lengthclass/${id}`, data);
      setLengths((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const deleteLength = async (id) => {
    try {
      await axios.delete(`/api/lengthclasse/${id}`);
      setLengths((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted successfully");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  useEffect(() => {
    fetchLengths();
  }, []);

  return {
    lengths,
    loading,
    error,
    createLength,
    updateLength,
    deleteLength,
  };
};

export default useLengthClasses;
