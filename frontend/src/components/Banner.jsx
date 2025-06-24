import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'; // or use <a> if needed

const ImageSlider = () => {
  const images = [
    {
      src: 'https://belle-demo-2.myshopify.com/cdn/shop/files/demo6-slide1_2000x.jpg?v=1719993533',
      title: 'Shop the Summer Collection',
      link: '/summer-collection',
    },
    {
      src: 'https://belle-demo.myshopify.com/cdn/shop/files/demo2-banner1_2000x.jpg?v=1720620173',
      title: 'Explore New Arrivals',
      link: '/new-arrivals',
    },
    {
      src: 'https://belle-demo-2.myshopify.com/cdn/shop/files/dummy16_2000x.jpg?v=1720008873',
      title: 'Luxury Home Decor',
      link: '/home-decor',
    },
    {
      src: 'https://belle-demo.myshopify.com/cdn/shop/files/demo2-banner2_2000x.jpg?v=1720620312',
      title: 'Top Beauty Picks',
      link: '/beauty',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full h-[150px] md:h-[600px] overflow-hidden">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[150px] md:h-[600px] overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full bg-cover bg-center "
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white text-center px-4">
              <h2 className="text-xl md:text-xl font-sm mb-4 text-white font-serif  ">{item.title}</h2>
              <Link
                to={item.link}
                className="bg-white text-black px-5 py-1  hover:bg-gray-200 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
