import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi'; // Icons for open/close
import useCategories from '../customhooks/categories';

const Menu = () => {
  const { categories = [] } = useCategories();
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const categoryTree = useMemo(() => {
    const parents = categories.filter(cat => !cat.parent_id);
    const children = categories.filter(cat => cat.parent_id);

    return parents.map(parent => ({
      ...parent,
      sub: children.filter(child => child.parent_id === parent.id),
    }));
  }, [categories]);

  return (
    <div className="bg-gradient-to-r from-teal-500 to-teal-700 shadow text-white">
      {/* Mobile toggle button */}
      <div className="flex justify-between items-center px-4 py-2 lg:hidden">
        <h1 className="text-lg font-bold">Categories</h1>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white text-2xl">
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Desktop menu */}
      <div className="max-w-7xl mx-auto gap-6 px-4 py-2 hidden lg:flex relative">
        {categoryTree.map((cat, idx) => (
          <div
            key={cat.id}
            className="relative"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <button className="text-sm font-medium px-2 py-1 border-b-4 border-transparent hover:border-white transition whitespace-nowrap">
              {cat.category_name}
            </button>

            {hovered === idx && cat.sub.length > 0 && (
              <div className="absolute left-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded w-64 z-50">
                <ul className="py-2 text-sm text-gray-800">
                  {cat.sub.map(sub => (
                    <li key={sub.id}>
                      <Link
                        to={`/products/${sub.id}`}
                        className="block px-4 py-2 hover:bg-teal-500 hover:text-white transition"
                      >
                        {sub.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden px-4 pb-4">
          {categoryTree.map(cat => (
            <div key={cat.id} className="mb-2">
              <p className="font-semibold">{cat.category_name}</p>
              {cat.sub.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1">
                  {cat.sub.map(sub => (
                    <li key={sub.id}>
                      <Link
                        to={`/products/${sub.id}`}
                        className="text-sm block text-white hover:underline"
                      >
                        {sub.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
