import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SubmitButton from '../../components/ui/SubmitButton';
import Formfield from '../../components/ui/FormField';

// Yup validation schema for main fields:
const schema = yup.object().shape({
  product_name: yup.string().required('Product name is required'),
  description: yup.string(),
  model: yup.string().required('Model is required'),
  sku: yup.string().required('SKU is required'),
  barcode: yup.string(),
  ean: yup.string(),
  price: yup
    .number()
    .typeError('Price must be a number')
    .min(0, 'Price must be >= 0'),
  tag: yup.string(),
  date_available: yup.date().nullable(),
  sort_order: yup.number().integer().min(0),
  quantity: yup.number().integer().min(0),
  subtract: yup.boolean(),
  maxquantity: yup.number().integer().min(0).nullable(),
  minimum: yup.number().integer().min(0),
  returnabledays: yup.number().integer().min(0).nullable(),
  reward_points: yup.number().integer().min(0),
  length: yup.number().min(0).nullable(),
  width: yup.number().integer().min(0).nullable(),
  height: yup.number().integer().min(0).nullable(),
  weight: yup.number().min(0).nullable(),
  shipping: yup.boolean(),
  shipping_charge: yup.number().min(0),
  status: yup.string().oneOf(['active', 'inactive', 'draft']),
  location: yup.string(),
  related_product: yup.string(),
});

const ProductsDetail = ({ editData, refresh, updateProduct }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      product_name: '',
      description: '',
      model: '',
      sku: '',
      barcode: '',
      ean: '',
      price: '',
      tag: '',
      date_available: '',
      sort_order: 0,
      quantity: 0,
      subtract: true,
      maxquantity: null,
      minimum: 1,
      returnabledays: null,
      reward_points: 0,
      length: null,
      width: null,
      height: null,
      weight: null,
      shipping: true,
      shipping_charge: 0,
      status: 'active',
      location: '',
      related_product: '',
    },
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProduct(editData.id, data);
      toast.success('Product updated successfully');
      refresh?.();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2  p-4">
      <Formfield label="Product Name" id="product_name" register={register} errors={errors} />
      <Formfield label="Description" id="description" register={register} errors={errors} />
      <Formfield label="Model" id="model" register={register} errors={errors} />
      <Formfield label="SKU" id="sku" register={register} errors={errors} />
      <Formfield label="Barcode" id="barcode" register={register} errors={errors} />
      <Formfield label="EAN" id="ean" register={register} errors={errors} />
      <Formfield label="Price" id="price" type="number" register={register} errors={errors} />
      <Formfield label="Tag" id="tag" register={register} errors={errors} />
      <Formfield label="Date Available" id="date_available" type="date" register={register} errors={errors} />
      <Formfield label="Sort Order" id="sort_order" type="number" register={register} errors={errors} />
      <Formfield label="Quantity" id="quantity" type="number" register={register} errors={errors} />
      <Formfield label="Substract Stock" id="substract" type="checkbox" register={register} errors={errors} />
      {/* <label>
        <input type="checkbox" {...register('subtract')} />
        Subtract Stock
      </label> */}
      <Formfield label="Max Quantity" id="maxquantity" type="number" register={register} errors={errors} />
      <Formfield label="Minimum" id="minimum" type="number" register={register} errors={errors} />
      <Formfield label="Returnable Days" id="returnabledays" type="number" register={register} errors={errors} />
      <Formfield label="Reward Points" id="reward_points" type="number" register={register} errors={errors} />
      <Formfield label="Length" id="length" type="number" register={register} errors={errors} />
      <Formfield label="Width" id="width" type="number" register={register} errors={errors} />
      <Formfield label="Height" id="height" type="number" register={register} errors={errors} />
      <Formfield label="Weight" id="weight" type="number" register={register} errors={errors} />
      
      <Formfield label="Require Shipping" id="shipping" type="select"   options={[
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
  ]} register={register} errors={errors} />
      {/* <label>
        <input type="checkbox" {...register('shipping')} />
        Requires Shipping
      </label> */}
      <Formfield label="Shipping Charge" id="shipping_charge" type="number" register={register} errors={errors} />
      <Formfield label="Status" id="status" type="select" options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' } ]} register={register} errors={errors}>
       
      </Formfield>
      <Formfield label="Location" id="location" register={register} errors={errors} />
      <Formfield label="Related Product" id="related_product" register={register} errors={errors} />
      <div className="col-span-2">
        <SubmitButton isLoading={isSubmitting}>Update </SubmitButton>
      </div>
    </form>
  );
};

export default ProductsDetail;
