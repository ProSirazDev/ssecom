import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-emerald-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/dashboard"
        className="bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-emerald-600 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Notfound;
