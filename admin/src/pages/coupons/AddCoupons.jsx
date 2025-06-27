import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SubmitButton from "../../components/ui/SubmitButton";
import Formfield from "../../components/ui/FormField";

import { toast } from "react-toastify";
import useCoupons from "../../customhook/coupon";

// Validation schema
const schema = yup.object().shape({
  coupon_code: yup.string().required("Coupon code is required"),
  discount_type: yup.string().required("Discount type is required"),
  discount_value: yup.number().required("Discount value is required"),
  max_discount: yup.number().required("Max discount is required"),
  minimum_order_value: yup.number().required("Minimum order value is required"),
  valid_from: yup.date().required("Valid from date is required"),
  valid_to: yup.date().required("Valid to date is required"),
});

const AddCoupons = ({ refresh }) => {
  const { createCoupon } = useCoupons();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        cby: "admin", // Hardcoded creator
        is_active: true,
      };

      const res = await createCoupon(payload);
      if (res.success) {
        toast.success("Coupon created successfully");
        refresh?.();
        reset();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to create coupon");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3 grid grid-cols-2">
      <Formfield
        label="Coupon Code"
        id="coupon_code"
        placeholder="SAVE10"
        register={register}
        errors={errors}
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

      <SubmitButton isLoading={isSubmitting}>Submit</SubmitButton>
    </form>
  );
};

export default AddCoupons;
