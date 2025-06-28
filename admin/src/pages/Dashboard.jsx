import React from 'react';
import {
  ShoppingCart,
  Users,
  DollarSign,
  PackageCheck,
} from 'lucide-react';
import useDashboard from '../customhook/dashboard';
import useOrders from '../customhook/orders';
import Charts from './Charts';

const Dashboard = () => {
  const { dashboardData, loading, error } = useDashboard();
  const { orders: ordersData, loading: ordersLoading, error: ordersError } = useOrders();

  // Safely extract array from object if needed
  const recentOrders = Array.isArray(ordersData?.orders) ? ordersData.orders : ordersData;

  const stats = [
    {
      title: 'Total Orders',
      value: loading ? '...' : dashboardData?.total_orders ?? 0,
      icon: <ShoppingCart size={24} />,
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Total Users',
      value: loading ? '...' : dashboardData?.total_customers ?? 0,
      icon: <Users size={24} />,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Revenue',
      value: loading ? '...' : `₹${dashboardData?.total_revenue?.toLocaleString() ?? '0'}`,
      icon: <DollarSign size={24} />,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      title: 'Products Sold',
      value: loading ? '...' : dashboardData?.total_products_sold ?? 0,
      icon: <PackageCheck size={24} />,
      color: 'bg-purple-100 text-purple-700',
    },
  ];

  return (
    <div className="w-full min-h-screen p-3 bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-3 ">Dashboard Overview</h1>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 mb-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center p-4 bg-white rounded shadow hover:shadow-md transition"
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
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          {ordersLoading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : ordersError ? (
            <p className="text-red-500">Error: {ordersError}</p>
          ) : recentOrders && recentOrders.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {[...recentOrders]
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5)
                .map((order) => (
                  <li key={order.id} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">#{order.order_id}</p>
                        <p className="text-sm text-gray-500">{order.customer_name || 'Unnamed Customer'}</p>
                        {order.created_at && (
                          <p className="text-xs text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">
                          ₹{Number(order.total_amount).toLocaleString()}
                        </p>
                        <p
                          className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${
                            order.order_status === 'delivered'
                              ? 'bg-green-100 text-green-700'
                              : order.order_status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {order.order_status}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent orders found.</p>
          )}
        </div>

        {/* Sales Chart Placeholder */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <Charts/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
