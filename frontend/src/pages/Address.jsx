import React, { useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { AuthContext } from '../globalstate/authcontext';

const Address = () => {
  const { user } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    mobile_optional: '',
    address_line1: '',
    address_line2: '',
    landmark: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
    is_default: false,
  });

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`/api/address/${user.usid}`);
      setAddresses(res.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.usid) fetchAddresses();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/address', {
        ...formData,
        usid: user.usid,
        cby: user.firstname,
        uby: user.firstname,
      });
      setShowModal(false);
      fetchAddresses(); // refresh list
    } catch (err) {
      console.error('Failed to add address', err);
    }
  };

  if (loading) return <p>Loading addresses...</p>;

  return (
    <div className="p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-teal-500 ">Saved Addresses</h2>
      <div className='flex items-center px-5 py-1 justify-center gap-x-1 bg-teal-500'>
  <span className='text-white'>&#x2b;</span>
  <button
    onClick={() => setShowModal(true)}
    className="text-white shadow"
  >
    Add
  </button>
</div>

       
      </div>

      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <ul className="space-y-4">
          {addresses.map((addr) => (
            <li key={addr.id} className="border border-gray-300 p-4 rounded shadow-sm">
              <p>
                <strong>{addr.full_name}</strong> ({addr.mobile_optional})
              </p>
              <p>{addr.address_line1}, {addr.address_line2}</p>
              <p>{addr.landmark}</p>
              <p>{addr.city}, {addr.state}, {addr.postal_code}</p>
              <p>{addr.country}</p>
              {addr.is_default && (
                <p className="text-green-600 font-semibold">Default Address</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black opacity-100  flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <h3 className="text-lg font-bold mb-4">Add New Address</h3>
            <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-2">
              <input name="full_name" placeholder="Full Name" className="w-full border p-2 rounded" onChange={handleChange} required />
              <input name="mobile_optional" placeholder="Mobile (optional)" className="w-full border p-2 rounded" onChange={handleChange} />
              <input name="address_line1" placeholder="Address Line 1" className="w-full border p-2 rounded" onChange={handleChange} required />
              <input name="address_line2" placeholder="Address Line 2" className="w-full border p-2 rounded" onChange={handleChange} />
              <input name="landmark" placeholder="Landmark" className="w-full border p-2 rounded" onChange={handleChange} />
              <input name="city" placeholder="City" className="w-full border p-2 rounded" onChange={handleChange} required />
              <input name="state" placeholder="State" className="w-full border p-2 rounded" onChange={handleChange} required />
              <input name="postal_code" placeholder="Postal Code" className="w-full border p-2 rounded" onChange={handleChange} required />
              <input name="country" placeholder="Country" value={formData.country} className="w-full border p-2 rounded" onChange={handleChange} />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="is_default" checked={formData.is_default} onChange={handleChange} />
                Set as default address
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
