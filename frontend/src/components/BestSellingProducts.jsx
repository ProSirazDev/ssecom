import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from '../utils/axiosInstance';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get('/api/products/bestselling');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching best-selling products:', error);
      }
    };

    fetchBestSellers();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="bg-pink-500/10 px-4 sm:px-10 py-10">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
        Best Selling Products
      </h2>
      <Slider {...settings}>
        {products.map((item, index) => (
          <div key={item.id} className="px-3">
          <div className='bg-white border border-gray-300 rounded overflow-hidden shadow hover:shadow-lg transition duration-300'>
            <Link to={`/productdetails/${item.id}`} >
              <img
                src={item.unit_image || `https://picsum.photos/id/${index + 22}/400/400`}
                alt={item.name}
                className="w-full h-40 p-3 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-base font-medium text-gray-700 truncate">
                  {item.product_name}
                </h3>
                <p className="text-teal-600 font-semibold mt-1">₹{item.price}</p>
              </div>
            </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellingProducts;
