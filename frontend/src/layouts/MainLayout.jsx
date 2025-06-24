import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import CookieSettings from '../components/CookieSettings';
import Menu from '../components/Menu';
import Header from '../components/Header';



function MainLayout() {
  return (
    <>
    {/* <Header/> */}
      <Navbar />
      <Menu/>
 
      <main className=' mx-auto'>
        <Outlet /> {/* Nested routes render here */}
      </main>
      <CookieSettings/>
      <Footer/>
    </>
  );
}

export default MainLayout;
