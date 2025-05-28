import React, { useState, useEffect } from 'react';
import SubmitButton from '../../components/ui/SubmitButton';
import { toast } from 'react-toastify';

const BrandDetails = ({ editData, refresh,updateBrand }) => {
  const [brand, setBrand] = useState({
    brand_name: '',
    description: '',
    image: '',
  });

  

  useEffect(() => {
    if (editData) {
      setBrand(editData); // Pre-fill the form with selected row data
    }
  }, [editData]);

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can call an update API here if not already handled via AgGrid
    console.log("Updated Brand:", brand);
     updateBrand(brand.id, brand);
     toast.success("Updated Successfully")
    refresh(); // Close drawer and refresh parent
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
     

      <div className="mb-3">
        <label className="block text-sm">Brand Name</label>
        <input
          type="text"
          name="brand_name"
          value={brand.brand_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm">Description</label>
        <input
          type="text"
          name="description"
          value={brand.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm">Image</label>
        <input
          type="text"
          name="image"
          value={brand.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>


      <SubmitButton >Update</SubmitButton>
    </form>
  );
};

export default BrandDetails;
