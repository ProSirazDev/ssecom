import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import axios from 'axios';
import { useSearch } from '../globalstate/searchcontext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    discount: [],
    price: 50000,
  });

  const [page, setPage] = useState(1);
  const [limit] = useState(20); // Products per page
  const [total, setTotal] = useState(0);

  const { id } = useParams();
  const { searchTerm } = useSearch();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`/api/products`, {
        params: {
          limit,
          offset: (page - 1) * limit,
          search: searchTerm // <-- pass search term
        }
      });
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, searchTerm]);

  const handleFilter = (p) => {
    const matchesCategory = filters.category.length
      ? filters.category.includes(p.category_id)
      : true;
    const matchesBrand = filters.brand.length
      ? filters.brand.includes(p.brand_id)
      : true;
    const matchesDiscount = filters.discount.length
      ? filters.discount.some(d => p.discount >= parseInt(d))
      : true;
    const matchesPrice = p.price <= filters.price;
    const matchesParam = id ? (p.category_id === id || p.brand_id === id) : true;
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      (p.product_name && p.product_name.toLowerCase().includes(searchLower)) ||
      (p.model && p.model.toLowerCase().includes(searchLower));

    return (
      matchesCategory &&
      matchesBrand &&
      matchesDiscount &&
      matchesPrice &&
      matchesParam &&
      matchesSearch
    );
  };

  const filteredProducts = products.filter(handleFilter);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="grid grid-cols-12 gap-6 px-6 py-8 bg-[#f9f9f9]">
      <Filter filters={filters} setFilters={setFilters} />

      <section className="col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            // Extract unique sizes and colors from product.option if available and is array
            const options = Array.isArray(product.option) ? product.option : [];
            const sizes = [...new Set(options.map(opt => opt.size).filter(Boolean))];
            const colors = [...new Set(options.map(opt => opt.color).filter(Boolean))];

            return (
              <Link
                to={`/productdetails/${product.id}`}
                key={product.id}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4"
              >
                <div className="h-48 bg-gray-100 mb-4 overflow-hidden">
                  <img
                    src={product.unit_image || 'https://via.placeholder.com/200x300'}
                    alt={product.product_name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <h3 className="text-base font-semibold mb-1 text-gray-900 truncate">
                  {product.product_name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">{product.model}</p>
{/* Sizes */}
{sizes.length > 0 && (
  <div className="flex flex-wrap items-center gap-2 text-xs">
    <span className="font-semibold text-gray-600">Sizes:</span>
    {sizes.map(size => (
      <span
        key={size}
        className="px-2 py-0.5 shadow shadow-gray-100 bg-gray-200 rounded-full text-gray-700 "
      >
        {size}
      </span>
    ))}
  </div>
)}

{/* Colors */}
{colors.length > 0 && (
  <div className="flex items-center gap-2 text-xs">
    <span className="font-semibold text-gray-600">Colors:</span>
    {colors.map(color => (
      <span
        key={color}
        title={color}
        className="w-3 h-3 inline-block rounded-full border border-gray-300"
        style={{ backgroundColor: color.toLowerCase() }}
      />
    ))}
  </div>
)}


                <div className="flex justify-between items-center">
                  <span className="text-black font-semibold">Rs {product.price}</span>
                  {/* Removed Add to Cart button */}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination Controls */}
        { totalPages >= 2 && (
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center gap-1">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 cursor-pointer hover:bg-gray-200 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1))
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) {
                    acc.push('...');
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-2">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1 border rounded cursor-pointer ${
                        page === p ? 'bg-[#31A3A3] text-white' : 'bg-white text-gray-700'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1 cursor-pointer hover:bg-gray-200 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
