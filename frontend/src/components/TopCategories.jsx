import React from 'react';
import useCategories from '../customhooks/categories';
import { Link } from 'react-router-dom';

const TopCategories = () => {
  const { categories } = useCategories();
  const parentCategories = categories.filter(cat => !cat.parent_id);

  // Limit to first 8
  const filteredCategories = parentCategories.slice(0, 8);

  return (
    <section className="mx-auto bg-orange-500/10 p-5 ">
      <h2 className="text-xl sm:text-xl font-semibold text-gray-800 mb-6">
        Shop by Categories 
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 ">
        {filteredCategories.map((category) => (
          <Link
            to={`/products/${category.id}`}
            key={category.id}
            className="group flex flex-col items-center hover:scale-105 transform transition duration-300"
          >
            <div className=" w-36 h-36 rounded-full overflow-hidden shadow-md border-2 border-teal-200 group-hover:border-orange-400 transition">
              <img
                src={category.image}
                alt={category.category_name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm sm:text-sm font-medium text-gray-700 group-hover:text-orange-600 text-center">
              {category.category_name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
