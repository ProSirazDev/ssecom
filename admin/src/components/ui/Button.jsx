import React from 'react';

const Button = ({ children,  onClick, isLoading = false, disabled = false, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`
        px-4 py-2 rounded 
        bg-emerald-600 text-white 
        hover:bg-emerald-700 disabled:opacity-50 
        transition duration-200 ease-in-out
        ${className}
      `}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
