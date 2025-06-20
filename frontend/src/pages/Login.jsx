import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from '../globalstate/authcontext.jsx'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();  // get setUser from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      toast.success(response.data.message);

      // Save user info in context
      setUser(response.data.user);

      // Optionally save user in localStorage to persist login after refresh
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect or do something else after login
      console.log('Logged in user:', response.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left Image Section */}
      <div className="bg-indigo-100">
        <img
          src="https://picsum.photos/200/300/?blur"
          alt="Login Illustration"
          className="w-full h-[630px] object-cover object-center"
        />
      </div>

      {/* Right Form Section */}
      <div className="p-8 flex items-center justify-center">
        <div className="w-full max-w-md p-6">
          {/* Logo / Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-600">ShopEase</h1>
            <p className="text-gray-500 mt-1">Sign in with your email</p>
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
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
