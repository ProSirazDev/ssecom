import React, { useState } from 'react';

const BecomeSeller = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Seller Signup:', form);
    alert('Thank you for signing up as a seller!');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Become a Seller</h1>
        <p className="text-lg max-w-2xl mx-auto">Join our platform and start selling to thousands of customers today.</p>
      </section>

      {/* Content Section */}
      <section className="flex flex-col md:flex-row justify-center items-start gap-10 px-6 py-12 max-w-6xl mx-auto">
        {/* Benefits */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Why Sell With Us?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Reach a wider audience</li>
            <li>Easy-to-use seller dashboard</li>
            <li>Fast payouts</li>
            <li>Dedicated support</li>
          </ul>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
