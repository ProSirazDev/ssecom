import React from 'react';
import {
  ShoppingCart,
  Users,
  DollarSign,
  PackageCheck
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Orders', value: '1,230', icon: <ShoppingCart size={24} />, color: 'bg-emerald-100 text-emerald-700' },
    { title: 'Total Users', value: '540', icon: <Users size={24} />, color: 'bg-blue-100 text-blue-700' },
    { title: 'Revenue', value: '₹4,50,000', icon: <DollarSign size={24} />, color: 'bg-yellow-100 text-yellow-700' },
    { title: 'Products In Stock', value: '890', icon: <PackageCheck size={24} />, color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className={`p-3 rounded-full mr-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <p className="text-gray-500">Recent order data will appear here.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <p className="text-gray-500">Graph or chart will be integrated here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
