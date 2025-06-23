import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useCategories from '../customhooks/categories';


const Menu = () => {
  const { categories = [] } = useCategories();
  const [hovered, setHovered] = useState(null);

  // Group categories: parents and their subcategories
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
      <div className="max-w-7xl mx-auto flex gap-6 py-2 px-4 relative">
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
    </div>
  );
};

export default Menu;
