import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bestSellingData = [
  { id: 27, name: 'Wireless Headphones', price: '₹2,999' },
  { id: 28, name: 'Smart Watch', price: '₹4,999' },
  { id: 29, name: 'Bluetooth Speaker', price: '₹1,999' },
  { id: 30, name: 'Fitness Tracker', price: '₹999' },
  { id: 31, name: 'Gaming Mouse', price: '₹1,499' },
   { id: 32, name: 'Gaming Mouse', price: '₹1,499' },
    { id: 33, name: 'Gaming Mouse', price: '₹1,499' },
     { id: 34, name: 'Gaming Mouse', price: '₹1,499' },
];

const BestSellingBrands = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="bg-white px-4 sm:px-10 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Best Selling Brands
      </h2>
      <Slider {...settings}>
        {bestSellingData.map((item) => (
          <div key={item.id} className="px-4">
            <div className="  flex flex-col items-center text-center p-4 h-full">
              <img
                src={`https://picsum.photos/id/${item.id}/400/400`}
                alt={item.name}
                className="w-32 h-32 bg-cover bg-center rounded-full mb-4  "
              />
              <h3 className="text-sm font-sm text-black">
                {item.name}
              </h3>
              {/* <p className="text-teal-600 font-bold">{item.price}</p> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellingBrands;
