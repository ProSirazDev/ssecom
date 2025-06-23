import React from 'react';
import useCategories from '../customhooks/categories';
import useBrands from '../customhooks/brands';

const Filter = ({ filters, setFilters }) => {

const {categories} =useCategories()
const {brands} =useBrands()

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
      <h2 className="text-lg font-semibold mb-4 text-teal-500">Filters</h2>

      <div className="mb-4">
        <h3 className="font-medium mb-2 text-orange-500">Category</h3>
        {categories.map(cat => (
          <label key={cat.id} className="block text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filters.category.includes(cat.id)}
              onChange={() => handleCheckboxChange('category', cat.id)}
            />{' '}
            {cat.category_name}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2 text-orange-500">Brand</h3>
        {brands.map(brand => (
          <label key={brand.id} className="block text-sm text-gray-700">
            <input
              type="checkbox"
              checked={filters.brand.includes(brand.id)}
              onChange={() => handleCheckboxChange('brand', brand.id)}
            />{' '}
            {brand.brand_name}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2 text-orange-500">Discount</h3>
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
        <h3 className="font-medium mb-2 text-orange-500">Price</h3>
        <input
          type="range"
          min="0"
          max="50000"
          value={filters.price}
          onChange={handlePriceChange}
          className="w-full text-teal-500"
        />
        <p className="text-sm text-gray-600">Up to {filters.price} &#x20B9;</p>
      </div>
    </aside>
  );
};

export default Filter;
