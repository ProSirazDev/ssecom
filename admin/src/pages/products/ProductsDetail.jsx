// Updated ProductDetails.jsx (Edit Mode)

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Tab } from '@headlessui/react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'react-toastify';

import Formfield from '../../components/ui/FormField';
import SubmitButton from '../../components/ui/SubmitButton';
import useAttributes from '../../customhook/attributes';
import useBrands from '../../customhook/brands';
import useCategories from '../../customhook/categories';
import useHeightClasses from '../../customhook/heightclass';
import useLengthClasses from '../../customhook/lengthclass';
import useWeightClasses from '../../customhook/weightclass';

const schema = yup.object().shape({
  product_name: yup.string().required('Product name is required'),
  model: yup.string().required('Model is required'),
  sku: yup.string().required('SKU is required'),
  price: yup.number().required().min(0),
  quantity: yup.number().min(0),
  weight: yup.number().min(0),
  length: yup.number().min(0),
  width: yup.number().min(0),
  height: yup.number().min(0),
  shipping_charge: yup.number().min(0),
  minimum: yup.number().min(0),
  maxquantity: yup.number().min(0),
  returnabledays: yup.number().min(0),
  reward_points: yup.number().min(0),
});

const ProductDetails = ({ editData, updateProduct, refresh }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [longDescription, setLongDescription] = useState('');
  const [unitImage, setUnitImage] = useState(null);
  const [unitImagePreview, setUnitImagePreview] = useState(null);
  const [options, setOptions] = useState([]);

  const [optionForm, setOptionForm] = useState({ color: '', size: '', quantity: '', price: '', discount: '' });

  const { attributes } = useAttributes();
  const { brands } = useBrands();
  const { categories } = useCategories();
  const { heights } = useHeightClasses();
  const { lengths } = useLengthClasses();
  const { weights } = useWeightClasses();

  const colorAttr = attributes?.find(attr => attr.attribute_name === 'Colors');
  const sizeAttr = attributes?.find(attr => attr.attribute_name === 'Size');
  const colorOptions = colorAttr?.attribute_value || [];
  const sizeOptions = sizeAttr?.attribute_value || [];

  useEffect(() => {
    if (editData) {
      reset(editData);
      setLongDescription(editData.long_description || '');
      if (editData.unit_image) setUnitImagePreview(editData.unit_image_url);
      if (editData.option) {
        try {
          const parsed = JSON.parse(editData.option);
          if (Array.isArray(parsed)) setOptions(parsed);
        } catch (e) {}
      }
    }
  }, [editData, reset]);

  const handleUnitImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUnitImage(file);
      setUnitImagePreview(URL.createObjectURL(file));
    }
  };

  const addOption = () => {
    const { color, size, quantity, price, discount } = optionForm;
    if (!color || !size || !price) return toast.error('Color, Size, and Price required');
    setOptions([...options, { color, size, quantity, price, discount }]);
    setOptionForm({ color: '', size: '', quantity: '', price: '', discount: '' });
  };

  const removeOption = (i) => {
    const newList = [...options];
    newList.splice(i, 1);
    setOptions(newList);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) formData.append(key, data[key]);
      formData.append('long_description', longDescription);
      if (options.length > 0) formData.append('option', JSON.stringify(options));
      if (unitImage) {
        formData.append('file', unitImage);
        formData.append('folder', 'products');
      }
      await updateProduct(editData.id, formData);
      toast.success('Product updated');
      refresh?.();
    } catch (e) {
      toast.error(e.message || 'Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full border p-4 rounded">
      <Tab.Group>
        <Tab.List className="flex space-x-2 mb-4 bg-gray-100 p-1">
          {['Basic Info', 'Inventory', 'Dimensions', 'Shipping', 'Media', 'Options'].map(tab => (
            <Tab key={tab} className={({ selected }) => `w-full py-2 text-sm font-medium ${selected ? 'bg-white text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}>{tab}</Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="grid grid-cols-2 gap-4">
            <Formfield label="Product Name" id="product_name" register={register} errors={errors} />
            <Formfield label="Description" id="description" register={register} errors={errors} />
            <div className="col-span-2">
              <ReactQuill value={longDescription} onChange={setLongDescription} theme="snow" />
            </div>
            <Formfield label="Model" id="model" register={register} errors={errors} />
            <Formfield label="SKU" id="sku" register={register} errors={errors} />
            <Formfield label="Brand" id="brand_id" type="select" options={brands.map(b => ({ value: b.id, label: b.brand_name }))} register={register} errors={errors} />
            <Formfield label="Category" id="category_id" type="select" options={categories.map(c => ({ value: c.id, label: c.category_name }))} register={register} errors={errors} />
          </Tab.Panel>

          <Tab.Panel className="grid grid-cols-2 gap-4">
            <Formfield label="Price" id="price" type="number" register={register} errors={errors} />
            <Formfield label="Quantity" id="quantity" type="number" register={register} errors={errors} />
            <Formfield label="Minimum Qty" id="minimum" type="number" register={register} errors={errors} />
            <Formfield label="Max Qty" id="maxquantity" type="number" register={register} errors={errors} />
            <Formfield label="Returnable Days" id="returnabledays" type="number" register={register} errors={errors} />
            <Formfield label="Reward Points" id="reward_points" type="number" register={register} errors={errors} />
          </Tab.Panel>

          <Tab.Panel className="grid grid-cols-2 gap-4">
            <Formfield label="Length Class" id="length_class_id" type="select" options={lengths.map(x => ({ value: x.id, label: x.title }))} register={register} errors={errors} />
            <Formfield label="Length" id="length" type="number" register={register} errors={errors} />
            <Formfield label="Height Class" id="height_class_id" type="select" options={heights.map(x => ({ value: x.id, label: x.title }))} register={register} errors={errors} />
            <Formfield label="Height" id="height" type="number" register={register} errors={errors} />
            <Formfield label="Weight Class" id="weight_class_id" type="select" options={weights.map(x => ({ value: x.id, label: x.title }))} register={register} errors={errors} />
            <Formfield label="Weight" id="weight" type="number" register={register} errors={errors} />
            <Formfield label="Width" id="width" type="number" register={register} errors={errors} />
          </Tab.Panel>

          <Tab.Panel className="grid grid-cols-2 gap-4">
            <Formfield label="Shipping Charge" id="shipping_charge" type="number" register={register} errors={errors} />
            <Formfield label="Status" id="status" type="select" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} register={register} errors={errors} />
            <Formfield label="Date Available" id="date_available" type="date" register={register} errors={errors} />
            <Formfield label="Location" id="location" register={register} errors={errors} />
          </Tab.Panel>

          <Tab.Panel className="grid grid-cols-2 gap-4">
            <Formfield label="Tag" id="tag" register={register} errors={errors} />
            <Formfield label="Related Product" id="related_product" register={register} errors={errors} />
            <div className="space-y-2">
              <label>Unit Image</label>
              <input type="file" accept="image/*" onChange={handleUnitImageChange} />
              {unitImagePreview && <img src={unitImagePreview} className="w-32 h-32 object-contain" alt="Preview" />}
            </div>
          </Tab.Panel>

          <Tab.Panel className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              <select value={optionForm.color} onChange={(e) => setOptionForm({ ...optionForm, color: e.target.value })} className="border rounded px-2 py-1">
                <option value="">Color</option>
                {colorOptions.map((color, i) => <option key={i} value={color}>{color}</option>)}
              </select>
              <select value={optionForm.size} onChange={(e) => setOptionForm({ ...optionForm, size: e.target.value })} className="border rounded px-2 py-1">
                <option value="">Size</option>
                {sizeOptions.map((size, i) => <option key={i} value={size}>{size}</option>)}
              </select>
              <input type="number" placeholder="Qty" value={optionForm.quantity} onChange={(e) => setOptionForm({ ...optionForm, quantity: e.target.value })} className="border rounded px-2 py-1" />
              <input type="number" placeholder="Price" value={optionForm.price} onChange={(e) => setOptionForm({ ...optionForm, price: e.target.value })} className="border rounded px-2 py-1" />
              <input type="number" placeholder="Discount" value={optionForm.discount} onChange={(e) => setOptionForm({ ...optionForm, discount: e.target.value })} className="border rounded px-2 py-1" />
              <button type="button" onClick={addOption} className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
            </div>
            {options.length > 0 && (
              <table className="w-full text-sm">
                <thead><tr><th>Color</th><th>Size</th><th>Qty</th><th>Price</th><th>Discount</th><th></th></tr></thead>
                <tbody>
                  {options.map((opt, i) => (
                    <tr key={i}>
                      <td>{opt.color}</td><td>{opt.size}</td><td>{opt.quantity}</td><td>{opt.price}</td><td>{opt.discount}</td>
                      <td><button onClick={() => removeOption(i)} className="text-red-500">Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div className="mt-4 flex justify-end">
        <SubmitButton isLoading={isSubmitting}>Update Product</SubmitButton>
      </div>
    </form>
  );
};

export default ProductDetails;
