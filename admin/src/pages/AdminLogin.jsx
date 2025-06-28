import React, { useState } from 'react';
import axios from '../utils/axiosInstance.js'
import { toast } from 'react-toastify';


const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/admin/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, admin } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', admin.role);
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Left Side Image */}
      <div className="w-1/2 h-full">
        <img
          src='https://picsum.photos/200/300/?blur'
          alt="Admin Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side Login */}
      <div className="w-1/2 h-full flex items-center justify-center bg-gray-50">
        <div className="   w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Admin Login
          </h2>

          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white outline-none rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white outline-none rounded px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition"
            >
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
