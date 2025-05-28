import React from 'react';
import useCategories from '../customhooks/categories';

const Filter = ({ filters, setFilters }) => {

const {categories} =useCategories()

  const handleCheckboxChange = (section, value) => {
    setFilters(prev => {
      const sectionArray = prev[section];
      return {
        ...prev,
        [section]: sectionArray.includes(value)
          ? sectionArray.filter(v => v !== value)
          : [...sectionArray, value],
      };
    });
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({
      ...prev,
      price: parseInt(e.target.value),
    }));
  };

  return (
    <aside className="col-span-3 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Category</h3>
        {['Electronics', 'Clothing', 'Home & Garden'].map(cat => (
          <label key={cat} className="block text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filters.category.includes(cat)}
              onChange={() => handleCheckboxChange('category', cat)}
            />{' '}
            {cat}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Brand</h3>
        {['Nike', 'Samsung', 'LG'].map(brand => (
          <label key={brand} className="block text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filters.brand.includes(brand)}
              onChange={() => handleCheckboxChange('brand', brand)}
            />{' '}
            {brand}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Discount</h3>
        {['60', '50', '40'].map(discount => (
          <label key={discount} className="block text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filters.discount.includes(discount)}
              onChange={() => handleCheckboxChange('discount', discount)}
            />{' '}
            {discount}%
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Price</h3>
        <input
          type="range"
          min="0"
          max="50000"
          value={filters.price}
          onChange={handlePriceChange}
          className="w-full"
        />
        <p className="text-sm text-gray-600">Up to ${filters.price}</p>
      </div>
    </aside>
  );
};

export default Filter;
