import React from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Menu from '../components/Menu';


function MainLayout() {
  return (
    <>
      <Navbar/>
    
      <main className='left-60  top-14  fixed right-0 scroll-auto '>
        <Outlet /> {/* Nested routes render here */}
      </main>
      <Menu/>
    
    </>
  );
}

export default MainLayout;
