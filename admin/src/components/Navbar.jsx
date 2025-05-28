import React from 'react';
import { LogOut, User } from 'lucide-react';
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <header className="w-full h-14 bg-emerald-500  shadow fixed top-0 right-0 z-10 flex items-center justify-between px-6">
      {/* Logo */}
    <img src={logo} alt='' className='h-12 w-12 rounded-full bg-white'/>

      {/* Center Area (Optional Links) */}
      <nav className="flex gap-4">
        {/* Add nav links here if needed */}
        {/* <a href="#" className="text-gray-600 hover:text-gray-800">Link</a> */}
      </nav>

      {/* Profile & Logout */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <User size={20} className="text-white" />
        </button>
        <button className="p-2 rounded-full hover:bg-red-100">
          <LogOut size={20} className="text-white" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
