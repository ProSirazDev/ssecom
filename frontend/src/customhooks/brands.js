import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/brands");
      setBrands(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch brands");
      toast.error("Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Update a brand
  const updateBrand = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/brands/${id}`, updatedData);
      toast.success("Brand updated successfully");
      fetchBrands();
      return response.data;
    } catch (err) {
      toast.error("Failed to update brand");
      console.error(err);
    }
  };

  // Delete a brand
  const deleteBrand = async (id) => {
    try {
      await axios.delete(`/api/brands/${id}`);
      toast.success("Brand deleted successfully");
      fetchBrands();
    } catch (err) {
      toast.error("Failed to delete brand");
      console.error(err);
    }
  };

  return {
    brands,
    loading,
    error,
    fetchBrands,
    updateBrand,
    deleteBrand,
  };
};

export default useBrands;
