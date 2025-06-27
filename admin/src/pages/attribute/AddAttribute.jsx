import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Formfield from '../../components/ui/FormField';
import SubmitButton from '../../components/ui/SubmitButton';
import { toast } from 'react-toastify';
import useAttributes from '../../customhook/attributes';

const schema = yup.object().shape({
  attribute_name: yup.string().required('Attribute name is required'),
});

const AddAttribute = ({ refresh }) => {
  const { createAttribute } = useAttributes();
  const [valueInput, setValueInput] = useState('');
  const [values, setValues] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addValue = () => {
    const trimmed = valueInput.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) {
      toast.warn('Value already added');
      return;
    }
    setValues((prev) => [...prev, trimmed]);
    setValueInput('');
  };

  const removeValue = (index) => {
    setValues((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (values.length === 0) {
      toast.error('Please add at least one attribute value');
      return;
    }

    try {
      const payload = {
        attribute_name: data.attribute_name,
        attribute_value: values, // already an array
      };

      await createAttribute(payload);

      toast.success('Attribute added successfully');
      reset();
      setValues([]);
      setValueInput('');
      refresh?.();
    } catch (error) {
      console.error('Error adding attribute:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3 space-y-4">
      <Formfield
        label="Attribute Name"
        id="attribute_name"
        register={register}
        errors={errors}
        placeholder="e.g. Size"
      />

      <div className="space-y-1">
        <label htmlFor="value_input" className="block font-medium">
          Add Attribute Values
        </label>
        <div className="flex gap-2">
          <input
            id="value_input"
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder='e.g. "S", "M", "L"'
            className="border border-gray-300 px-2 py-1 w-full rounded"
          />
          <button
            type="button"
            onClick={addValue}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {values.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-medium mb-1">Added Values:</p>
          <div className="flex flex-wrap gap-2">
            {values.map((val, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {val}
                <button
                  type="button"
                  onClick={() => removeValue(index)}
                  className="text-red-500 hover:text-red-700 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <SubmitButton isLoading={isSubmitting}>Add Attribute</SubmitButton>
    </form>
  );
};

export default AddAttribute;
