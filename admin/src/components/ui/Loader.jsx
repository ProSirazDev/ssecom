// src/components/Loader.js
import React from "react";
import './Loader.css'

const Loader = () => {


  const spinnerStyle = {
    width: "70px",
    height: "70px",
    border: "6px solid #f3f3f3", // Light grey
    borderTop: "6px solid #E17100", // Blue color for spinning part
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div  className="w-full h-screen  flex items-center justify-center">
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;
