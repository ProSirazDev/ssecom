import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance';
import { toast } from "react-toastify";

const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
console.log(brands);

  // Fetch all brands
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/brands");
      console.log("res",res.data);
      
      setBrands(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

const createBrand = async (brandData) => {
  try {
    const res = await axios.post("/api/brands", brandData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Use backend response to update state if needed
    setBrands((prev) => [...prev, { ...res.data.brand }]); // assuming backend returns brand

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
};

  // Update an existing brand
  const updateBrand = async (id, brandData) => {
    try {
      await axios.put(`/api/brands/${id}`, brandData);
      setBrands((prev) =>
        prev.map((brand) => (brand.id === id ? { ...brand, ...brandData } : brand))
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  // Delete a brand
  const deleteBrand = async (id) => {
    try {
      await axios.delete(`/api/brands/${id}`);
      setBrands((prev) => prev.filter((brand) => brand.id !== id));
      toast.success('Deleted SUccessfully')
      return { success: true };

    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return {
    brands,
    loading,
    error,
    createBrand,
    updateBrand,
    deleteBrand,
  };
};

export default useBrands;
