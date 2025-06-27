import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/ui/SubmitButton";
import Formfield from "../../components/ui/FormField";
import { toast } from "react-toastify";

const BrandDetails = ({ editData, refresh, updateBrand }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (editData) {
      setValue("brand_name", editData.brand_name || "");
      setValue("description", editData.description || "");
      setValue("image", editData.image || "");
    }
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedData = { ...editData, ...data };
      await updateBrand(updatedData.id, updatedData);
      toast.success("Brand updated successfully");
      refresh();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update brand");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
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

      <Formfield
        label="Image URL"
        id="image"
        register={register}
        errors={errors}
        placeholder="Enter image URL"
      />

      <SubmitButton isLoading={isSubmitting}>Update</SubmitButton>
    </form>
  );
};

export default BrandDetails;
