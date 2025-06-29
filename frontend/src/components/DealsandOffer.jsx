import React, { useEffect, useState } from 'react';

// Dummy product data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    image: 'https://picsum.photos/id/238/200/300',
    price: 49.99,
    oldPrice: 79.99,
  },
  {
    id: 2,
    name: 'Smart Watch',
    image: 'https://picsum.photos/id/237/200/300',
    price: 99.99,
    oldPrice: 149.99,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    image: 'https://picsum.photos/id/239/200/300',
    price: 39.99,
    oldPrice: 59.99,
  },
    {
    id: 3,
    name: 'Bluetooth Speaker',
    image: 'https://picsum.photos/id/240/200/300',
    price: 39.99,
    oldPrice: 59.99,
  },
    {
    id: 3,
    name: 'Bluetooth Speaker',
    image: 'https://picsum.photos/id/241/200/300',
    price: 39.99,
    oldPrice: 59.99,
  },
    {
    id: 3,
    name: 'Bluetooth Speaker',
    image: 'https://picsum.photos/id/242/200/300',
    price: 39.99,
    oldPrice: 59.99,
  },
    {
    id: 3,
    name: 'Bluetooth Speaker',
    image: 'https://picsum.photos/id/243/200/300',
    price: 39.99,
    oldPrice: 59.99,
  },
    {
    id: 3,
    name: 'Bluetooth Speaker',
    image: 'https://picsum.photos/id/244/200/300',
    price: 39.99,
    oldPrice: 59.99,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    image: 'https://picsum.photos/id/244/200/300',
    price: 39.99,
    oldPrice: 59.99,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    image: 'https://picsum.photos/id/244/200/300',
    price: 39.99,
    oldPrice: 59.99,
  },
   
];

const DealsandOffer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const dealEnd = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 hours from now
    const now = new Date().getTime();
    const difference = dealEnd - now;

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className=" py-10    mx-auto">
      {/* <h2 className="text-2xl font-bold mb-6 text-indigo-700">🔥 Deals & Offers</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
        {/* Countdown Timer */}
        <div className="bg-indigo-50 p-6 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">Deal ends in:</h3>
          <div className="text-3xl font-bold text-gray-800">
            {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
          </div>
          <p className="text-sm text-gray-500 mt-2">Hurry up! Limited stock available.</p>
        </div>

        {/* Product List */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-3  rounded shadow hover:shadow-md transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-cover rounded mb-4"
              />
              <h4 className="font-sm text-sm text-gray-800 mb-1 whitespace-nowrap overflow-hidden">{product.name}</h4>
              <div className="text-sm text-gray-600 mb-2">
                <span className="text-green-500 font-bold">Rs {product.price.toFixed(2)}</span>
               <span
  className="line-through ml-2"
  style={{ color: product.oldPriceColor || 'gray' }}
>
  Rs {product.oldPrice.toFixed(2)}
</span>

              </div>
              {/* <button className="mt-2 w-full bg-[#118793] text-white py-1  hover:bg-indigo-700 text-sm">
                Add to Cart
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsandOffer;
