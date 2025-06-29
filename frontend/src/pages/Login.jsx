import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from '../globalstate/authcontext.jsx'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();  // get setUser from context
  const navigate = useNavigate(); // Assuming you are using react-router-dom for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      toast.success(response.data.message);

      // Save user info in context
      setUser(response.data.user);

      // Optionally save user in localStorage to persist login after refresh
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/my-profile')

      // Redirect or do something else after login
      console.log('Logged in user:', response.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left Image Section */}
      <div className="bg-indigo-100 hidden sm:block">
        <img
          src="https://picsum.photos/200/300/?blur"
          alt="Login Illustration"
          className="w-full h-[630px] object-cover object-center"
        />
      </div>

      {/* Right Form Section */}
      <div className="p-8 flex items-center justify-center">
        <div className="w-full max-w-md p-6 flex flex-col justify-center">
          {/* Logo / Header */}
             <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img
                src="https://res.cloudinary.com/des8x6d4o/image/upload/v1751220354/ssecomlogo_de9nbv.png"
                alt="logo"
                className="w-10 h-10"
              />
                <p className="text-gray-600">Sign in to continue</p>
            </div>
         
          </div>
          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-orange-500  text-base font-medium ml-3 hover:text-teal-600 cursor-pointer">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
