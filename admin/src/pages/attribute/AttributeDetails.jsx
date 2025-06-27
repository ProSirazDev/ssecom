import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/ui/SubmitButton";
import Formfield from "../../components/ui/FormField";
import { toast } from "react-toastify";

const AttributeDetails = ({ editData, refresh, updateAttribute }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const [values, setValues] = useState([]);

  useEffect(() => {
    if (editData) {
      setValue("attribute_name", editData.attribute_name || "");
      try {
        setValues(Array.isArray(editData.attribute_value) ? editData.attribute_value : []);
      } catch {
        setValues([]);
      }
    }
  }, [editData, setValue]);

  const handleAddValue = () => {
    setValues((prev) => [...prev, ""]);
  };

  const handleRemoveValue = (index) => {
    toast.info(" Are You Sure?");
    setValues((prev) => prev.filter((_, i) => i !== index));
  };

  const handleValueChange = (index, newValue) => {
    const updated = [...values];
    updated[index] = newValue;
    setValues(updated);
  };

  const onSubmit = async (data) => {
    try {
      const trimmedValues = values.map((v) => v.trim()).filter(Boolean);

      const updatedData = {
        ...editData,
        attribute_name: data.attribute_name,
        attribute_value: trimmedValues,
      };

      await updateAttribute(updatedData.id, updatedData);
      toast.success("Attribute updated successfully");
      refresh();
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
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

      <div>
        <label className="block font-medium mb-1">Attribute Values</label>
        {values.map((val, index) => (
          <div key={index} className="flex flex-wrap gap-x-2  gap-y-2  px-3">
            <div className="flex  items-center"><input
              type="text"
              value={val}
              onChange={(e) => handleValueChange(index, e.target.value)}
              className="border border-gray-200 w-auto rounded px-2 py-1 "
              placeholder={`Value ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveValue(index)}
              className="text-red-500 font-semibold hover:text-red-700 flex place-items-end "
            >
              ✕
            </button></div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddValue}
          className="mt-2 text-blue-500 hover:underline text-sm"
        >
          + Add More
        </button>
      </div>

      <SubmitButton isLoading={isSubmitting}>Update</SubmitButton>
    </form>
  );
};

export default AttributeDetails;
