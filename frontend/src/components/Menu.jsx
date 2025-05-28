import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Electronics',
    image: 'https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100',
    link: '/category/electronics',
    subCategories: ['Mobiles', 'Laptops', 'Cameras'],
  },
  {
    name: 'Clothing',
    image: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100',
    link: '/category/clothing',
    subCategories: ['Men', 'Women', 'Kids'],
  },
  {
    name: 'Home & Garden',
    image: 'https://rukminim2.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100',
    link: '/category/home',
    subCategories: ['Furniture', 'Decor', 'Kitchen'],
  },
  {
    name: 'Home & Garden',
    image: 'https://rukminim2.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100',
    link: '/category/home',
    subCategories: ['Furniture', 'Decor', 'Kitchen'],
  },
  {
    name: 'Home & Garden',
    image: 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100',
    link: '/category/home',
    subCategories: ['Furniture', 'Decor', 'Kitchen'],
  },
  {
    name: 'Home & Garden',
    image: 'https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100',
    link: '/category/home',
    subCategories: ['Furniture', 'Decor', 'Kitchen'],
  },


];

const Menu = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <nav className=" py-2 ">
      <div className=" mx-auto px-4 relative">
        <ul className="flex flex-wrap justify-center gap-6">
          {categories.map((cat, index) => (
            <li
              key={cat.name}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                to={cat.link}
                className="flex flex-col items-center text-center text-gray-700 hover:text-indigo-600 transition"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10  rounded mb-1"
                />
                <span className="text-sm">{cat.name}</span>
              </Link>

              {/* Subcategory Dropdown */}
              {hoveredIndex === index && cat.subCategories?.length > 0 && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-44 bg-white  shadow-md rounded-md z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    {cat.subCategories.map((sub, i) => (
                      <li key={i}>
                        <Link
                          to={`${cat.link}/${sub.toLowerCase()}`}
                          className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
