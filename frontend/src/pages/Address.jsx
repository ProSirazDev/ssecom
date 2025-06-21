import React, { useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { AuthContext } from '../globalstate/authcontext';

const Address = () => {
  const { user } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`/api/address/${user.id}`);
        setAddresses(res.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchAddresses();
    }
  }, [user]);

  if (loading) return <p>Loading addresses...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <ul className="space-y-4">
          {addresses.map(addr => (
            <li key={addr.id} className="border p-4 rounded shadow-sm">
              <p><strong>{addr.full_name}</strong> ({addr.mobile_optional})</p>
              <p>{addr.address_line1}, {addr.address_line2}</p>
              <p>{addr.landmark}</p>
              <p>{addr.city}, {addr.state}, {addr.postal_code}</p>
              <p>{addr.country}</p>
              {addr.is_default && <p className="text-green-600 font-semibold">Default Address</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Address;
