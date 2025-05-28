import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Update a category
  const updateCategory = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/categories/${id}`, updatedData);
      toast.success("Category updated successfully");
      fetchCategories();
      return response.data;
    } catch (err) {
      toast.error("Failed to update category");
      console.error(err);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to delete category");
      console.error(err);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    updateCategory,
    deleteCategory,
  };
};

export default useCategories;
