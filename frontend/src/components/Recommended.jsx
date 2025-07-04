import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const Recommended = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="  py-10">
      <div className="flex justify-between items-center px-3 pb-5">
        <h2 className="text-xl sm:text-xl sm:font-semibold text-black px-1 sm:px-3 py-1 rounded-tr-2xl rounded-bl-2xl">
          New Arrivals Products🎈
        </h2>
        <Link
          to="/products"
          className="text-xl sm:text-xl sm:font-semibold text-black px-3 py-1 hover:underline "
        >
          View All
        </Link>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-2 sm:px-4">
{products.slice(0, 10).map(product => {
  const options = Array.isArray(product.option) ? product.option : [];
  const sizes = [...new Set(options.map(opt => opt.size))];
  const colors = [...new Set(options.map(opt => opt.color))];

  return (
    <Link
      to={`/productdetails/${product.id}`}
      key={product.id}
      className="group overflow-hidden bg-white border border-gray-100 shadow hover:shadow-md transition duration-300 block "
    >
      <div className='w-full flex justify-center'><img
        src={product.unit_image || 'https://via.placeholder.com/200x300'}
        alt={product.product_name}
        className=" p-3 h-40 w-40 bg-cover place-items-center bg-center transition-transform duration-500 group-hover:scale-105"
      /></div>

      <div className="p-4 bg-white space-y-2">
        <h3 className="text-md font-semibold text-gray-800 truncate">{product.product_name}</h3>
        {/* <p className="text-sm text-gray-600">{product.model}</p> */}
       

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-gray-600">Sizes:</span>
            {sizes.map(size => (
              <span
                key={size}
                className="px-2 py-0.5 shadow shadow-gray-100 bg-gray-200 rounded-full text-gray-700 "
              >
                {size}
              </span>
            ))}
          </div>
        )}
<div className=' flex justify-between'>
        {colors.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-gray-600">Colors:</span>
            {colors.map(color => (
              <span
                key={color}
                title={color}
                className="w-3 h-3 inline-block rounded-full border border-gray-400"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        )}

         <span className="text-sm font-medium text-green-500 block">&#x20B9; {product.price}</span></div>
        
      </div>
    </Link>
  );
})}


      </section>
    </div>
  );
};

export default Recommended;
