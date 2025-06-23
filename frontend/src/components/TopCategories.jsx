import React from 'react';
import useCategories from '../customhooks/categories';
import { Link } from 'react-router-dom';

const TopCategories = () => {
  const { categories } = useCategories();
  const parentCategories = categories.filter(cat => !cat.parent_id);

// Limit to first 8
const filteredCategories = parentCategories.slice(0, 8);

  return (
    <>
    {/* <h2 className="w-44 text-base font-semibold text-white bg-teal-500 px-3 py-1 rounded-tr-2xl rounded-bl-2xl">
          TOP CATEGORIES 🔥
        </h2> */}
         <div className=" mx-auto  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredCategories.map((category) => (
        <Link
          to={`/products/${category.id}`}
          key={category.id}
          className="relative border border-white rounded overflow-hidden shadow-md group transform transition-transform duration-300 hover:scale-105 hover:shadow-xl h-32 sm:h-68 w-full"
    style={{
  backgroundImage: `url(${category.image})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}}

        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#31A3A3] opacity-10  group-hover:opacity-50 transition" />

          {/* Centered Text */}
          <div className="absolute  inset-0 flex items-center justify-center">
            <h4 className="text-white absolute  top-0 right-0 text-xs font-sm z-10 bg-teal-500 rounded-bl-full shadow-2xl px-3 py-1">
              {category.category_name}
            </h4>
          </div>
        </Link>
      ))}
    </div>
        </>
   
  );
};

export default TopCategories;
