import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bestSellingData = [
  { id: 22, name: 'Wireless Headphones', price: '₹2,999' },
  { id: 23, name: 'Smart Watch', price: '₹4,999' },
  { id: 24, name: 'Bluetooth Speaker', price: '₹1,999' },
  { id: 25, name: 'Fitness Tracker', price: '₹999' },
  { id: 26, name: 'Gaming Mouse', price: '₹1,499' },
  
];

const BestSellingProducts = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className=" bg-pink-500/10 px-4 sm:px-10 py-10 ">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
        Best Selling Products
      </h2>
      <Slider {...settings}>
        {bestSellingData.map((item) => (
          <div key={item.id} className="px-3">
            <div className="bg-white border border-gray-300 rounded overflow-hidden shadow hover:shadow-lg transition duration-300">
              <img
                src={`https://picsum.photos/id/${item.id}/400/400`}
                alt={item.name}
                className="w-full h-40 p-3 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.name}
                </h3>
                <p className="text-teal-600 font-bold mt-1">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellingProducts;
