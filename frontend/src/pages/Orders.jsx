import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../globalstate/authcontext';
import Ratings from '../components/Ratings';
import { FaBackspace, FaExchangeAlt, FaStar } from 'react-icons/fa';
import Ordertimeline from '../components/Ordertimeline';
import Loader from '../components/Loader';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get(`/api/orders/customer/${user.id}`);
        setOrders(response.data || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const openRatingsModal = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  return (
    <div className=" w-full mx-auto bg-gray-50 py-6 px-4 md:px-8">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        🧾 Your Orders
      </h2>

      {loading ? (
        <div className="flex  justify-center py-10 w-full mx-auto h-screen"><Loader/></div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-10">You have no orders.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div
              key={`${order.order_id}-${idx}`}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {order.order_id}
                </h3>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.cdate).toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center justify-center  pb-2">
              <div className='flex gap-4 items-start '>    <img
                  src={order.unit_image}
                  alt={order.product_name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{order.product_name}</p>
                  <p className="text-xs text-gray-500 mb-1">Brand: {order.brand_name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {order.quantity} × ₹{Number(order.unit_price).toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold mt-2">
                    Total: ₹{(order.quantity * order.unit_price).toFixed(2)}
                  </p>
                </div></div>
            <div className='flex flex-col  mb-12'>
            <p className='text-sm font-medium text-gray-800 mb-1'>Delivery To</p>
            <p className='text-xs font-medium text-gray-800'>Kolkata</p>
            
            </div>
                 <div className='flex justify-end w-full items-center  h-full'><Ordertimeline currentStatus={order.order_status } /></div>
              </div>
             

              <div className='flex w-full justify-end gap-3'>
             {order.order_status === 'Delivered' && (
             <>
               <button className='mt-3  bg-red-500 text-white px-3 py-2 rounded-full items-center gap-2 flex hover:bg-teal-700 text-sm'><span> <FaBackspace/> </span>Return</button>
                  <button
                onClick={() => openRatingsModal(order.id)}
                className="mt-3  bg-teal-600 text-white rounded-full px-3 py-2 items-center gap-2 flex hover:bg-teal-700 text-sm "
              >
                <span> <FaStar/> </span> Review 
              </button></>
             )}

                    {order.order_status != 'Delivered' && (

               <button className='mt-3  bg-yellow-500 text-white px-3 py-2 items-center gap-2 rounded-full flex hover:bg-teal-700 text-sm'><span> <FaBackspace/> </span>Cancel</button>
             )}
               
           
            
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-black opacity-90 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Review Product</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">✖</button>
            </div>
            <Ratings productId={selectedProductId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
