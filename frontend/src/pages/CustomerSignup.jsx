import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    mobile: '',
    email: '',
    password: '',
    role_id: '2aa6bcd9-597e-4563-ac01-4f7048cb8f10', // example UUID
    cby: '2aa6bcd9-597e-4563-ac01-4f7048cb8f10',
 
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('🎉 User registered successfully!', { position: 'top-center' });
        setFormData({
          first_name: '',
          middle_name: '',
          last_name: '',
          mobile: '',
          email: '',
          password: '',
          role_id: '2aa6bcd9-597e-4563-ac01-4f7048cb8f10',
          cby: 'Seeder',
        });
      } else {
        toast.error(data.message || '❌ Registration failed', { position: 'top-center' });
      }
    } catch (err) {
      console.error(err);
      toast.error('🚨 An unexpected error occurred', { position: 'top-center' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Customer Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: 'first_name', label: 'First Name' },
            { name: 'middle_name', label: 'Middle Name', optional: true },
            { name: 'last_name', label: 'Last Name' },
            { name: 'mobile', label: 'Mobile' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
          ].map(({ name, label, type = 'text', optional }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={!optional}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
