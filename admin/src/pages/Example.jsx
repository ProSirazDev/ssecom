import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Formfield from '../../components/ui/FormField';
import SubmitButton from '../../components/ui/SubmitButton';
import { toast } from 'react-toastify';

// Yup Schema
const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive(),
  stock: yup.number().required("Stock is required").integer().min(0),
  image: yup.string().url("Must be a valid URL").required("Image is required"),
  category: yup.string().required("Category is required"),
  brand: yup.string().required("Brand is required"),
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

  // State for options
  const [options, setOptions] = useState([]);
  const [optionForm, setOptionForm] = useState({ color: '', size: '', price: '' });

  // Add option handler
  const addOption = () => {
    const { color, size, price } = optionForm;
    if (!color || !size || !price) {
      toast.error("Please fill all option fields");
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    setOptions([...options, { color, size, price: Number(price) }]);
    setOptionForm({ color: '', size: '', price: '' });
  };

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        options, // include options in submit data
      };
      console.log("Product Submitted:", productData);
      await onCreate?.(productData);
      toast.success("Product added successfully");
      reset();
      setOptions([]);
      setOptionForm({ color: '', size: '', price: '' });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto border border-gray-300 p-4 rounded-md max-w-3xl">
      <Tab.Group>
        <Tab.List className="flex space-x-2 mb-4 bg-gray-100 rounded">
          {['Basic Info', 'Pricing & Stock', 'Media', 'Extra Info', 'Options'].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `px-4 py-2 text-sm font-medium border-b-2 transition ${
                  selected ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Basic Info */}
          <Tab.Panel className="grid grid-cols-2 gap-4">
            <Formfield
              label="Product Name"
              id="name"
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
              rows={1}
            />
          </Tab.Panel>

          {/* Pricing & Stock */}
          <Tab.Panel className="grid grid-cols-2 gap-4">
            <Formfield
              label="Price"
              id="price"
              type="number"
              register={register}
              errors={errors}
              placeholder="Enter price"
            />
            <Formfield
              label="Stock"
              id="stock"
              type="number"
              register={register}
              errors={errors}
              placeholder="Enter stock quantity"
            />
          </Tab.Panel>

          {/* Media */}
          <Tab.Panel className="grid grid-cols-1 gap-4">
            <Formfield
              label="Image URL"
              id="image"
              register={register}
              errors={errors}
              placeholder="https://example.com/image.jpg"
            />
          </Tab.Panel>

          {/* Extra Info */}
          <Tab.Panel className="grid grid-cols-2 gap-4">
            <Formfield
              label="Category"
              id="category"
              register={register}
              errors={errors}
              placeholder="Enter category"
            />
            <Formfield
              label="Brand"
              id="brand"
              register={register}
              errors={errors}
              placeholder="Enter brand name"
            />
          </Tab.Panel>

          {/* Options */}
          <Tab.Panel className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Color"
                value={optionForm.color}
                onChange={(e) => setOptionForm({ ...optionForm, color: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Size"
                value={optionForm.size}
                onChange={(e) => setOptionForm({ ...optionForm, size: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={optionForm.price}
                onChange={(e) => setOptionForm({ ...optionForm, price: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
                min="0"
                step="0.01"
              />
            </div>
            <button
              type="button"
              onClick={addOption}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Option
            </button>

            {/* Options Preview in Grid */}
            {options.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Options Preview</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-2 border">Color</th>
                        <th className="px-3 py-2 border">Size</th>
                        <th className="px-3 py-2 border">Price</th>
                        <th className="px-3 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {options.map((opt, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-3 py-2 border">{opt.color}</td>
                          <td className="px-3 py-2 border">{opt.size}</td>
                          <td className="px-3 py-2 border">₹{opt.price}</td>
                          <td className="px-3 py-2 border">
                            <button
                              type="button"
                              className="text-red-500 text-xs hover:underline"
                              onClick={() => {
                                const newOptions = [...options];
                                newOptions.splice(idx, 1);
                                setOptions(newOptions);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-6">
        <SubmitButton isLoading={isSubmitting}>Add Product</SubmitButton>
      </div>
    </form>
  );
};

export default AddProduct;
