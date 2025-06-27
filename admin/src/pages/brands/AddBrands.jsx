import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import SubmitButton from '../../components/ui/SubmitButton';
import Formfield from '../../components/ui/FormField';
import useBrands from '../../customhook/brands';
import { toast } from 'react-toastify';

// Schema without `image` (it's a file, validated manually)
const schema = yup.object().shape({
  brand_name: yup.string().required("Brand name is required"),
  description: yup.string().required("Description is required"),
});

const AddBrands = ({ refresh }) => {
  const { createBrand } = useBrands();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const fileInput = document.getElementById("image");
      const file = fileInput.files[0];

      if (!file) {
        toast.error("Please select an image");
        return;
      }

      const formData = new FormData();
      formData.append("brand_name", data.brand_name);
      formData.append("description", data.description);
      formData.append("cby", "admin"); // hardcoded
      formData.append("file", file);
      formData.append("folder", "brands");

      await createBrand(formData);

      toast.success("Brand created successfully");
      refresh?.();
      reset();
      setImagePreview(null);
    } catch (err) {
      console.error("Brand creation failed:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <Formfield
        label="Brand Name"
        id="brand_name"
        register={register}
        errors={errors}
        placeholder="Enter brand name"
      />

      <Formfield
        label="Description"
        id="description"
        type="textarea"
        register={register}
        errors={errors}
        placeholder="Enter description"
        rows={1}
      />

      <div className="space-y-1">
        {/* <label htmlFor="image" className="block font-medium">Image</label> */}
        <Formfield
          type="file"
           label="Description"
          id="image"
          register={register}
        errors={errors}
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 px-2 py-1  w-full"
        />
      </div>

      {imagePreview && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Image Preview:</p>
          <img src={imagePreview} alt="Preview" className="w-32 h-auto rounded border" />
        </div>
      )}

      <SubmitButton isLoading={isSubmitting}>Submit</SubmitButton>
    </form>
  );
};

export default AddBrands;
