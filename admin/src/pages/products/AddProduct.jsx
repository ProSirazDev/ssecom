import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Formfield from '../../components/ui/FormField';
import SubmitButton from '../../components/ui/SubmitButton';
import { toast } from 'react-toastify';
import useBrands from '../../customhook/brands';
import useCategories from '../../customhook/categories';
import useHeightClasses from '../../customhook/heightclass';
import useLengthClasses from '../../customhook/lengthclass';
import useWeightClasses from '../../customhook/weightclass';
import useProduct from '../../customhook/products';
import useAttributes from '../../customhook/attributes';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const schema = yup.object().shape({
  product_name: yup.string().required("Product name is required"),
  model: yup.string().required("Model is required"),
  sku: yup.string().required("SKU is required"),
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

const AddProduct = ({ onCreate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [options, setOptions] = useState([]);
  const [longDescription, setLongDescription] = useState('');

  const [optionForm, setOptionForm] = useState({ 
    color: '', 
    size: '', 
    quantity: '', 
    price: '', 
    discount: '' 
  });
  const [unitImage, setUnitImage] = useState(null);
  const [unitImagePreview, setUnitImagePreview] = useState(null);
  
  const { attributes } = useAttributes();
  const { brands } = useBrands();
  const { categories } = useCategories();
  const { heights } = useHeightClasses();
  const { lengths } = useLengthClasses();
  const { weights } = useWeightClasses();
  const { createProduct } = useProduct();

  // Get color and size options from attributes
  const colorAttr = attributes?.find(attr => attr.attribute_name === "Colors");
  const sizeAttr = attributes?.find(attr => attr.attribute_name === "Size");
  const colorOptions = colorAttr?.attribute_value || [];
  const sizeOptions = sizeAttr?.attribute_value || [];

  const handleUnitImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUnitImage(file);
      setUnitImagePreview(URL.createObjectURL(file));
    } else {
      setUnitImage(null);
      setUnitImagePreview(null);
    }
  };

  const addOption = () => {
    const { color, size, quantity, price, discount } = optionForm;
    
    if (!color || !size || !price) {
      toast.error("Please fill all required option fields");
      return;
    }
    
    if (isNaN(price) || Number(price) <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    setOptions([...options, { 
      color, 
      size, 
      quantity: quantity || 0, 
      price: Number(price), 
      discount: discount || 0 
    }]);
    
    setOptionForm({ 
      color: '', 
      size: '', 
      quantity: '', 
      price: '', 
      discount: '' 
    });
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // Append all form data
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
        
      }
      formData.append('long_description', longDescription);
      
      // Append options as JSON string
      if (options.length > 0) {
        formData.append("option", JSON.stringify(options));
      }
      
      // Append unit image if exists
      if (unitImage) {
        formData.append("file", unitImage);
        formData.append("folder", "products");
      }

      // Default values
      formData.append("cby", "admin");
      formData.append("status", "active");
      formData.append("shipping", "yes");
      formData.append("subtract", "yes");

      await createProduct(formData);
      
      toast.success("Product added successfully");
      reset();
      setOptions([]);
      setOptionForm({ 
        color: '', 
        size: '', 
        quantity: '', 
        price: '', 
        discount: '' 
      });
      setUnitImage(null);
      setUnitImagePreview(null);
      onCreate?.();
    } catch (error) {
      console.error("Product creation error:", error);
      toast.error(error.message || "Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto border border-gray-300 p-4 rounded-md">
      <Tab.Group>
        <Tab.List className="flex space-x-2 mb-4 bg-gray-100 rounded-md p-1">
          {['Basic Info', 'Inventory & Pricing', 'Dimensions & Weight', 'Shipping & Availability', 'Media & Others', 'Options'].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full py-2 text-sm font-medium rounded-md transition ${
                  selected ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-blue-500'
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          {/* --- BASIC INFO --- */}
          <Tab.Panel className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Formfield 
              label="Product Name" 
              id="product_name" 
              register={register} 
              errors={errors} 
              placeholder="Enter product name"
            />
  
            <Formfield 
              label="Description" 
              id="description" 
              type="textarea" 
              register={register} 
              errors={errors} 
              placeholder="Enter product description"
              rows={3}
            />
                      <div className="col-span-2">
  {/* <label className="block mb-1 font-medium text-gray-700">Long Description</label> */}
  <ReactQuill
    value={longDescription}
    onChange={setLongDescription}
    theme="snow"
    className="bg-white"
  />
</div>
            <Formfield 
              label="Model" 
              id="model" 
              register={register} 
              errors={errors} 
              placeholder="Enter model number"
            />
            <Formfield 
              label="SKU" 
              id="sku" 
              register={register} 
              errors={errors} 
              placeholder="Enter SKU"
            />
            <Formfield 
              label="Brand" 
              type="select" 
              options={brands.map(brand => ({
                value: brand.id,
                label: brand.brand_name
              }))} 
              id="brand_id" 
              register={register} 
              errors={errors}
            />
            <Formfield 
              label="Category" 
              type="select" 
              options={categories.map(category => ({
                value: category.id,
                label: category.category_name
              }))} 
              id="category_id" 
              register={register} 
              errors={errors}
            />
          </Tab.Panel>

          {/* --- INVENTORY & PRICING --- */}
          <Tab.Panel className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Formfield 
              label="Barcode" 
              id="barcode" 
              register={register} 
              errors={errors} 
              placeholder="Enter barcode"
            />
            <Formfield 
              label="EAN" 
              id="ean" 
              register={register} 
              errors={errors} 
              placeholder="Enter EAN"
            />
            <Formfield 
              label="Price" 
              id="price" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter price"
              step="0.01"
            />
            <Formfield 
              label="Quantity" 
              id="quantity" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter quantity"
            />
            <Formfield 
              label="Discount (JSON)" 
              id="discount" 
              type="textarea" 
              register={register} 
              errors={errors} 
              placeholder="Enter discount structure"
              rows={2}
            />
            <Formfield 
              label="In Stock" 
              id="stock_status_id" 
              type="select"
              options={[
                { value: 'in_stock', label: 'In Stock' },
                { value: 'out_of_stock', label: 'Out of Stock' },
                { value: 'preorder', label: 'Preorder' }
              ]}
              register={register} 
              errors={errors}
            />
            {/* <Formfield 
              label="Subtract Stock" 
              type="checkbox" 
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ]} 
              id="subtract"  
              register={register} 
              errors={errors} 
            /> */}
            <Formfield
  label="Subtract Stock"
  type="select"
  options={[
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ]}
  id="subtract"
  register={register}
  errors={errors}
/>

            <Formfield 
              label="Minimum Quantity" 
              id="minimum" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter minimum quantity"
            />
            <Formfield 
              label="Max Quantity" 
              id="maxquantity" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter maximum quantity"
            />
            <Formfield 
              label="Returnable Days" 
              id="returnabledays" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter returnable days"
            />
            <Formfield 
              label="Reward Points" 
              id="reward_points" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter reward points"
            />
          </Tab.Panel>

          {/* --- DIMENSIONS & WEIGHT --- */}
          <Tab.Panel className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Formfield 
              label="Length Class" 
              type="select" 
              options={lengths.map(length => ({
                value: length.id, 
                label: length.title
              }))} 
              id="length_class_id" 
              register={register} 
              errors={errors} 
            />
            <Formfield 
              label="Length" 
              id="length" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter length"
              step="0.01"
            />
            <Formfield 
              label="Height Class" 
              type="select"  
              options={heights.map(height => ({
                value: height.id, 
                label: height.title
              }))} 
              id="height_class_id" 
              register={register} 
              errors={errors} 
            />
            <Formfield 
              label="Height" 
              id="height" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter height"
              step="0.01"
            />
            <Formfield 
              label="Weight Class" 
              type="select" 
              options={weights.map(weight => ({
                value: weight.id, 
                label: weight.title
              }))} 
              id="weight_class_id" 
              register={register} 
              errors={errors} 
            />
            <Formfield 
              label="Weight" 
              id="weight" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter weight"
              step="0.01"
            />
            <Formfield 
              label="Width" 
              id="width" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter width"
              step="0.01"
            />
          </Tab.Panel>

          {/* --- SHIPPING & AVAILABILITY --- */}
          <Tab.Panel className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Formfield 
              label="Shipping" 
              id="shipping" 
              type="checkbox" 
              register={register} 
              errors={errors} 
            />
            <Formfield 
              label="Shipping Charge" 
              id="shipping_charge" 
              type="number" 
              register={register} 
              errors={errors} 
              placeholder="Enter shipping charge"
              step="0.01"
            />
            <Formfield 
              label="Date Available" 
              id="date_available" 
              type="date" 
              register={register} 
              errors={errors} 
            />
            <Formfield 
              label="Location" 
              id="location" 
              register={register} 
              errors={errors} 
              placeholder="Enter location"
            />
            <Formfield
              label="Status"
              id="status"
              type="select"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
              register={register}
              errors={errors}
            />
          </Tab.Panel>

          {/* --- MEDIA & OTHERS --- */}
          <Tab.Panel className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Formfield 
              label="Tag" 
              id="tag" 
              register={register} 
              errors={errors} 
              placeholder="Enter tags (comma separated)"
            />
            <Formfield 
              label="Related Product" 
              id="related_product" 
              register={register} 
              errors={errors} 
              placeholder="Enter related product IDs"
            />
            <Formfield 
              label="Image (JSON)" 
              id="image" 
              type="textarea" 
              register={register} 
              errors={errors} 
              placeholder="Enter image JSON"
              rows={3}
            />
            
            <div className="space-y-2">
              <label htmlFor="unit_image" className="block text-sm font-medium text-gray-700">
                Unit Image
              </label>
              <input
                type="file"
                id="unit_image"
                accept="image/*"
                onChange={handleUnitImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {unitImagePreview && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Image Preview:</p>
                  <img 
                    src={unitImagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-contain rounded border mt-1"
                  />
                </div>
              )}
            </div>
          </Tab.Panel>

          {/* --- OPTIONS --- */}
          <Tab.Panel className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
              <select
                value={optionForm.color}
                onChange={(e) => setOptionForm({ ...optionForm, color: e.target.value })}
                className="col-span-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Color</option>
                {colorOptions.map((color, i) => (
                  <option key={i} value={color}>{color}</option>
                ))}
              </select>

              <select
                value={optionForm.size}
                onChange={(e) => setOptionForm({ ...optionForm, size: e.target.value })}
                className="col-span-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Size</option>
                {sizeOptions.map((size, i) => (
                  <option key={i} value={size}>{size}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Quantity"
                value={optionForm.quantity}
                onChange={(e) => setOptionForm({ ...optionForm, quantity: e.target.value })}
                className="col-span-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                min="0"
                step="1"
              />
              
              <input
                type="number"
                placeholder="Price"
                value={optionForm.price}
                onChange={(e) => setOptionForm({ ...optionForm, price: e.target.value })}
                className="col-span-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
              
              <input
                type="number"
                placeholder="Discount %"
                value={optionForm.discount}
                onChange={(e) => setOptionForm({ ...optionForm, discount: e.target.value })}
                className="col-span-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                min="0"
                max="100"
                step="1"
              />
              
              <button
                type="button"
                onClick={addOption}
                className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
              >
                <span>Add Option</span>
              </button>
            </div>

            {/* Options Preview Table */}
            {options.length > 0 && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {options.map((opt, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{opt.color}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{opt.size}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{opt.quantity}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${opt.price.toFixed(2)}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{opt.discount}%</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => removeOption(idx)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-6 flex justify-end">
        <SubmitButton isLoading={isSubmitting} className="px-6 py-2">
          Add Product
        </SubmitButton>
      </div>
    </form>
  );
};

export default AddProduct;