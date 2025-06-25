import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import Loader from './Loader';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/brands");
        setBrands(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className=" bg-teal-500/10 p-2 sm:p-10">
    <img src='https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/fd925b2138ecf9b9.jpeg?q=20' alt='brND' className=' h-36 w-full'/>
      {/* <h2 className="w-fit text-base font-semibold text-white bg-teal-500 px-4 mx-4 py-1 rounded-tr-2xl rounded-bl-2xl mb-6">
        TOP BRANDS 🔥
      </h2> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5  ">
        {/* Left Image */}
        <div className="w-full h-full">
          <img
            src="https://img.freepik.com/free-vector/premium-collection-badge-design_53876-63011.jpg?semt=ais_hybrid&w=740"
            alt="Top Brands"
            className="w-full h-full object-contain rounded "
          />
        </div>

        {/* Right Brand List */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading ? (
            <div className="flex  justify-center py-10 w-full mx-auto h-screen"><Loader/></div>
          ) : error ? (
            <p className="col-span-full text-center text-red-600">Error: {error}</p>
          ) : (
            brands.map((brand) => (
              <Link
                to={`/products/${brand.id}`}
                key={brand.id}
                className="flex flex-col items-center justify-center bg-white rounded-lg shadow hover:shadow-md transition p-2"
              >
                <img
                  src={brand.image}
                  alt={brand.brand_name}
                  className="w-full h-24 object-contain mb-2"
                />
                <h4 className="text-sm font-semibold text-center text-gray-700 truncate">
                  {brand.brand_name}
                </h4>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Brands;
