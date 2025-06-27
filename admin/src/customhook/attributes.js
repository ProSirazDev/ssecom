import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance';
import { toast } from "react-toastify";

const useAttributes = () => {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all attributes
  const fetchAttributes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/attributes");
      setAttributes(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new attribute
const createAttribute = async (attributeData) => {
  try {
    const res = await axios.post("/api/attributes", {
      ...attributeData,
      attribute_value: JSON.stringify(attributeData.attribute_value),
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setAttributes((prev) => [...prev, res.data]);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
};


  // Update attribute
  const updateAttribute = async (id, attributeData) => {
    try {
      await axios.put(`/api/attributes/${id}`, attributeData);
      setAttributes((prev) =>
        prev.map((attr) => (attr.id === id ? { ...attr, ...attributeData } : attr))
      );
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  // Delete attribute
  const deleteAttribute = async (id) => {
    try {
      await axios.delete(`/api/attributes/${id}`);
      setAttributes((prev) => prev.filter((attr) => attr.id !== id));
      toast.success("Deleted successfully");
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  return {
    attributes,
    loading,
    error,
    fetchAttributes,
    createAttribute,
    updateAttribute,
    deleteAttribute,
  };
};

export default useAttributes;
