import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance';
import { toast } from "react-toastify";

const useProduct = () => {
 const [products, setProducts] = useState({ products: [] });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      const data = res.data;

   setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new product
  const createProduct = async (productData) => {
    try {
      const res = await axios.post("/api/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
     setProducts((prev) => [...(Array.isArray(prev) ? prev : []), { ...productData, id: res.data.id }]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  // Update an existing product
  const updateProduct = async (id, productData) => {
    try {
      await axios.put(`/api/products/${id}`, productData);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...productData } : product))
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Deleted Successfully");
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProduct;
