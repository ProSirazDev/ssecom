import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import useCategories from '../customhooks/categories';

const Menu = () => {
  const { categories = [] } = useCategories();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef(null);

  const categoryTree = useMemo(() => {
    const parents = categories.filter(cat => !cat.parent_id);
    const children = categories.filter(cat => cat.parent_id);

    return parents.map(parent => ({
      ...parent,
      sub: children.filter(child => child.parent_id === parent.id),
    }));
  }, [categories]);

  const handleMouseEnter = (idx) => {
    clearTimeout(timeoutRef.current);
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIdx(null);
    }, 150); // delay so submenu doesn't vanish instantly
  };

  return (
    <div className="bg-white shadow text-gray-900 relative z-40">
      {/* Mobile Header */}
      <div className="flex justify-between items-center px-4 py-2 lg:hidden">
        <Link to="/" className="flex items-center rounded-full">
          <img
            src="data:image/png;base64,...YOUR_BASE64_LOGO_HERE..."
            alt="Logo"
            className="w-6 h-6 sm:w-14 sm:h-14 object-contain rounded-full"
          />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white text-2xl"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex justify-center px-4 py-1">
        <div className="flex gap-x-3 relative">
          {categoryTree.map((cat, idx) => (
            <div
              key={cat.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-sm font-medium px-2 py-1 border-b-4 border-transparent hover:border-orange-500 transition whitespace-nowrap">
                {cat.category_name}
              </button>

              {hoveredIdx === idx && cat.sub.length > 0 && (
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
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4">
          {categoryTree.map(cat => (
            <div key={cat.id}>
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
