// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      return <Navigate to="/auth/login" />;
    }
    return children;
  } catch (err) {
    console.error('Invalid token:', err);
    return <Navigate to="/auth/login" />;
  }
};

export default PrivateRoute;
