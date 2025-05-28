/* eslint-disable react/prop-types */
import React from 'react'




const Formfield = ({ 
 
    label, 
    id, 
    type = "text", 
    register, 
    errors, 
    options = [], 
    placeholder = "", 
    rows = 1 ,
 
  }) => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center border border-gray-300 rounded text-gray-700">
          <label htmlFor={id} className="text-xs border-r border-gray-300 font-medium w-1/3 bg-gray-50 py-3 px-3">
            {label}
          </label>
  
          {/* Handling different input types */}
          {type === "select" ? (
            <select
              id={id}
              {...register(id, { required: `* ${label} is required` })}
              className="block w-2/3 py-2 px-4 border-none outline-none"
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              id={id}
              rows={rows}
              placeholder={placeholder}
              {...register(id, { required: `* ${label} is required` })}
              className="block w-2/3 py-2 px-4 border-none outline-none"
            />
          ) : type === "checkbox" ? (
            <input
              id={id}
              type="checkbox"
               placeholder={placeholder}
              {...register(id)}
              className="ml-2 w-5 h-5"
            />
          ) : type === "radio" ? (
            <div className="flex w-2/3 gap-4 px-4">
              {options.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    {...register(id, { required: `* ${label} is required` })}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              {...register(id, { required: `* ${label} is required` })}
              className="block w-2/3 py-2 px-4 border-none outline-none"
            />
          )}
        </div>
  
        {errors[id] && <p className="text-red-500 text-xs ml-1">{errors[id].message}</p>}
      </div>
    );
  };
export default Formfield;  