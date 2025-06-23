import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../utils/axiosInstance';
import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';



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
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };



// inside your component
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('/api/auth/register', formData);

    toast.success('🎉 User registered successfully!', { position: 'top-center' });
    navigate('/login'); // Redirect to login page after successful registration

    setFormData({
      firstname: '',
      middlename: '',
      lastname: '',
      mobile: '',
      email: '',
      password: '',
      role_id: '2aa6bcd9-597e-4563-ac01-4f7048cb8f10',
      cby: 'Seeder',
    });
  } catch (err) {
    console.error(err);
    const message = err.response?.data?.message || '❌ Registration failed';
    toast.error(message, { position: 'top-center' });
  }
};

  return (
   <div className="min-h-screen flex">
  <ToastContainer />

  {/* Left Side Image */}
  <div className="hidden md:block w-1/2">
    <img
      src="https://picsum.photos/200/300/?blur" // 🔁 Replace with your actual image path
      alt="Signup visual"
      className="object-cover w-full max-h-screen"
    />
  </div>

  {/* Right Side Form */}
  <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">
    <div className="p-8 w-full max-w-2xl">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Customer Signup
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-2 gap-3">
 {[
  {
    name: 'firstname',
    label: 'First Name',
    icon: <FaUser className="text-gray-400" />,
  },
  {
    name: 'middlename',
    label: 'Middle Name',
    optional: true,
    icon: <FaUser className="text-gray-400" />,
  },
  {
    name: 'lastname',
    label: 'Last Name',
    icon: <FaUser className="text-gray-400" />,
  },
  {
    name: 'mobile',
    label: 'Mobile',
    icon: <FaPhone className="text-gray-400" />,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: <FaEnvelope className="text-gray-400" />,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    icon: <FaLock className="text-gray-400" />,
  },
].map(({ name, label, type = 'text', optional, icon }) => (
  <div key={name} className="col-span-2 md:col-span-1">
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-2.5">{icon}</span>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={!optional}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>
))}

     <div className="col-span-2 space-y-3">
  <button
    type="submit"
    className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
  >
    Register
  </button>
  Already have an account? <span className='text-teal-500 ml-4 text-lg font-medium '><Link to='/login'>Signin</Link></span></div>

      </form>
    </div>
  </div>
</div>

  );
};

export default CustomerSignup;
