import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/ui/SubmitButton";
import Formfield from "../../components/ui/FormField";
import { toast } from "react-toastify";

const CouponsDetails = ({ editData, refresh, updateCoupon }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (editData) {
      setValue("coupon_code", editData.coupon_code || "");
      setValue("discount_type", editData.discount_type || "");
      setValue("discount_value", editData.discount_value || 0);
      setValue("max_discount", editData.max_discount || 0);
      setValue("minimum_order_value", editData.minimum_order_value || 0);
      setValue("valid_from", editData.valid_from || "");
      setValue("valid_to", editData.valid_to || "");
      setValue("usage_limit", editData.usage_limit || 1);
      setValue("is_active", editData.is_active);
    }
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedData = { ...editData, ...data };
      await updateCoupon(updatedData.id, updatedData);
      toast.success("Coupon updated successfully");
      refresh();
    } catch (error) {
      console.error("Coupon update failed:", error);
      toast.error("Failed to update coupon");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <Formfield
        label="Coupon Code"
        id="coupon_code"
        register={register}
        errors={errors}
        placeholder="SAVE10"
      />

      <Formfield
        label="Discount Type"
        id="discount_type"
        type="select"
        options={[
          { label: "Flat", value: "flat" },
          { label: "Percentage", value: "percentage" },
        ]}
        register={register}
        errors={errors}
      />

      <Formfield
        label="Discount Value"
        id="discount_value"
        type="number"
        register={register}
        errors={errors}
      />

      <Formfield
        label="Max Discount"
        id="max_discount"
        type="number"
        register={register}
        errors={errors}
      />

      <Formfield
        label="Minimum Order Value"
        id="minimum_order_value"
        type="number"
        register={register}
        errors={errors}
      />

      <Formfield
        label="Valid From"
        id="valid_from"
        type="date"
        register={register}
        errors={errors}
      />

      <Formfield
        label="Valid To"
        id="valid_to"
        type="date"
        register={register}
        errors={errors}
      />

      <Formfield
        label="Usage Limit"
        id="usage_limit"
        type="number"
        register={register}
        errors={errors}
      />
{/* 
      <Formfield
        label="Active"
        id="is_active"
        type="checkbox"
        register={register}
      /> */}

      <SubmitButton isLoading={isSubmitting}>Update</SubmitButton>
    </form>
  );
};

export default CouponsDetails;
