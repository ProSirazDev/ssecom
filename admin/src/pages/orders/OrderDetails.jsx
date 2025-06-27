import React, { useRef, useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { toast } from 'react-toastify';
import useOrders from '../../customhook/orders';

const OrderDetails = ({ orderdata }) => {
  const printRef = useRef();
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('Pending');

  const { fetchOrderByorderId, updateOrder } = useOrders();

  const statusSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
const currentIndex = statusSteps.indexOf(orderStatus);


  useEffect(() => {
    if (!orderdata || !orderdata.id) return;

    const loadOrder = async () => {
      const { success, order: data, error } = await fetchOrderByorderId(orderdata.id);
      if (success) {
        setOrder(data);
        setOrderStatus(data.order_status || 'Pending');
      } else {
        toast.error(error);
      }
    };

    loadOrder();
  }, [orderdata]);

  const handlePrint = () => {
    const printContent = printRef.current;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Order Details</title>');
    printWindow.document.write('<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">');
    printWindow.document.write('</head><body class="p-6">');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleStatusUpdate = async () => {
    try {
      const res = await updateOrder(order.id, { order_status: orderStatus });
      if (res.success) {
        toast.success('Order status updated');
      } else {
        toast.error(res.error || 'Failed to update status');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="px-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Order Details</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-1 rounded flex items-center gap-2 hover:bg-blue-700 print:hidden"
        >
          <Printer size={18} />
          Print
        </button>
      </div>

      <div ref={printRef} className="bg-white shadow-md rounded p-3 space-y-3 text-sm print:text-xs">
        {/* Order Meta */}
        <div className="grid md:grid-cols-2 gap-6 border-b border-gray-300 pb-4">
          <div className="space-y-2">
            <p><strong>Order ID:</strong> #{order.order_id}</p>
            <p><strong>Payment:</strong> {order.payment_method}</p>
            <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
          </div>
          <div className="space-2">
            <label className="block font-semibold">Order Status</label>
   <div className="flex gap-4">
  {statusSteps.map((status, index) => (
    <>
    <button
      key={status}
      disabled={index < currentIndex} // Disable backward steps
      onClick={() => setOrderStatus(status)}
      className={`px-4 py-1 rounded-full cursor-pointer ${
        index === currentIndex
          ? 'bg-green-600 text-white'
          : index > currentIndex
          ? 'bg-gray-200 text-gray-700'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      }`}
    >
      {status} 
    </button>
    </>
  ))}
</div>


            <button
              onClick={handleStatusUpdate}
              className="mt-2 bg-orange-600 text-white px-4 py-1  hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </div>

        {/* Store and Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">From Store</h2>
            <p><strong>Name:</strong> {order.store.store_name}</p>
            <p><strong>Email:</strong> {order.store.email}</p>
            <p><strong>Phone:</strong> {order.store.phone}</p>
            <p><strong>Address:</strong> {order.store.address}, {order.store.store_city}, {order.store.store_state}, {order.store.store_country}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
            {/* <p><strong>Customer ID:</strong> {order.customer_id}</p> */}
            <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-3 py-2 text-left">#</th>
                  <th className="border px-3 py-2 text-left">Product</th>
                  <th className="border px-3 py-2 text-left">Qty</th>
                  <th className="border px-3 py-2 text-left">Price</th>
                  <th className="border px-3 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={item.order_item_id}>
                    <td className="border px-3 py-2">{idx + 1}</td>
                    <td className="border px-3 py-2">{item.product_name}</td>
                    <td className="border px-3 py-2">{item.quantity}</td>
                    <td className="border px-3 py-2">₹{item.unit_price}</td>
                    <td className="border px-3 py-2">₹{item.unit_price * item.quantity}</td>
                  </tr>
                ))}
                <tr className="font-semibold bg-gray-100">
                  <td colSpan={4} className="border px-3 py-2 text-right">Grand Total</td>
                  <td className="border px-3 py-2">₹{order.total_amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
