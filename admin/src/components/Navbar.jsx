import React, { useEffect, useState } from 'react';
import { LogOut, User } from 'lucide-react';
import logo from '../assets/logo.png';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode(token); // decode the JWT
        const { email, name } = decoded;

        // Optional: If you include name or firstname/lastname in token
        const decodename = name || email;

        setUsername(decodename);
      } catch (err) {
        console.error('Invalid token:', err);
        setUsername('Admin');
      }
    } else {
      setUsername('Admin'); // fallback if no token
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth/login');
    toast.success('Logged out successfully');
   
  };

  return (
    <header className="w-full h-14 bg-emerald-500 shadow fixed top-0 right-0 z-10 flex items-center justify-between px-6">
      <img src='https://res.cloudinary.com/des8x6d4o/image/upload/v1751220354/ssecomlogo_de9nbv.png' alt="" className="h-12 w-12 rounded-full bg-white" />

      <nav className="flex gap-4">
        {/* Optional nav links */}
      </nav>

      <div className="flex items-center space-x-4 text-white">
        <span className="text-sm font-medium">{username}</span>
        <User size={20} />
        <button onClick={handleLogout} className="p-2 rounded-full hover:bg-red-100">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
