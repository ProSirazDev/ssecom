import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import CookieSettings from '../components/CookieSettings';



function MainLayout() {
  return (
    <>
      <Navbar />
 
      <main className=' mx-auto'>
        <Outlet /> {/* Nested routes render here */}
      </main>
      <CookieSettings/>
      <Footer/>
    </>
  );
}

export default MainLayout;
