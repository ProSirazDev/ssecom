import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Notfound from './pages/Notfound';
import Dashboard from './pages/Dashboard';
import Products from './pages/products/Products';
import Brands from './pages/brands/Brands';
  import { Bounce, ToastContainer } from 'react-toastify';
  

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Categories from './pages/categories/Categories';
import Weightclass from './pages/weightclass/Weightclass';
import Heightclass from './pages/heightclass/Heightclass';
import LengthClass from './pages/lengthclass/LengthClass';
import Attribute from './pages/attribute/Attribute';
import Orders from './pages/orders/Orders';
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
     
    
    <Router>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      <Routes>
        {/* All pages under MainLayout */}
        <Route path="/" element={<MainLayout />}>
               <Route index element={<Dashboard />} />
           <Route path="products" element={<Products/>} />
           <Route path="categories" element={<Categories/>} />
            <Route path="brands" element={<Brands/>} />
              <Route path="attributes" element={<Attribute/>} />
                <Route path="orders" element={<Orders/>} />
            <Route path="weight-class" element={<Weightclass/>} />
            <Route path="height-class" element={<Heightclass/>} />
            <Route path="length-class" element={<LengthClass/>} />
          <Route path="*" element={<Notfound/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
