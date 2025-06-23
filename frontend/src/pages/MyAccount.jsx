import React, { useContext } from 'react';
import { AuthContext } from '../globalstate/authcontext';

const MyAccount = () => {
  const { user } = useContext(AuthContext); // user should have: firstname, lastname, email, mobile, etc.

  if (!user) return <div>Loading...</div>;

  const fullName = `${user.firstname} ${user.lastname}`;

  return (
    <div className=" bg-gray-50 flex items-center py-10 justify-center p-4">
      <div className="bg-white shadow-xl rounded p-6 sm:p-8 max-w-md w-full">
        <div className="flex items-center space-x-6">
          <img
            className="w-20 h-20 rounded-full border-4 border-blue-200 shadow-sm"
            src={`https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random`}
            alt="User avatar"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{fullName}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span className="font-medium">Mobile:</span>
            <span>{user.mobile || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Status:</span>
            <span>{user.status === 'true' ? 'Active' : 'Inactive'}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="px-4 py-2  bg-teal-600 text-white hover:bg-teal-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
