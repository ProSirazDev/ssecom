import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../globalstate/cartcontext";
import Ratings from "../components/Ratings";
import { FaExchangeAlt } from "react-icons/fa";
import ProductReview from "../components/ProductReview";
import { RiRotateLockFill } from "react-icons/ri";
import { FaRotate } from "react-icons/fa6";

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [mainImage, setMainImage] = useState(""); // Added for switching main image

  useEffect(() => {
    axios
      .get(`/api/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);

        const options = res.data.option || [];
        const uniqueSizes = [...new Set(options.map((opt) => opt.size))];
        const uniqueColors = [...new Set(options.map((opt) => opt.color))];

        if (uniqueSizes.length > 0) setSelectedSize(uniqueSizes[0]);
        if (uniqueColors.length > 0) setSelectedColor(uniqueColors[0]);

        // Set initial main image
        setMainImage(res.data.unit_image || "");
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600">Loading product...</div>
    );
  if (!product)
    return (
      <div className="p-10 text-center text-red-500">Product not found.</div>
    );

  const sizes = [...new Set((product?.option || []).map((opt) => opt.size))];
  const colors = [...new Set((product?.option || []).map((opt) => opt.color))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="flex justify-center items-start gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-6">
            {product.image &&
              Object.entries(product.image).map(([key, url]) => (
                <img
                  key={key}
                  src={url}
                  alt={`Thumbnail ${key}`}
                  onClick={() => setMainImage(url)}
                  className={`w-20 h-20 object-cover border cursor-pointer transition 
                  ${
                    mainImage === url
                      ? "border-indigo-500"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
                />
              ))}
          </div>

          {/* Main Image */}
          <div className=" h-[400px] w-full flex justify-center items-center">
            <img
              src={mainImage || "https://via.placeholder.com/600x600"}
              alt={product.product_name}
              className="h-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3 shadow-md rounded-md  py-3 bg-white">
           <div className=" shadow-md p-5 mx-3 space-y-2 bg-gray-50">

                     <h2 className="text-base font-medium text-gray-800">
            {product.product_name}
          </h2>
          <p className="text-base font-medium text-teal-700">
           &#x20B9; {Number(product.price).toFixed(2)}
          </p>

          <p className="text-gray-500 text-sm font-lg">
            {product.description || "No description available."}
          </p>
          <p className="text-gray-700 text-sm font-lg">
            <span className=" ">Brand :</span> {product.brand_name || "Unknown"}
          </p>
          {/* <p className="text-gray-700 text-base font-lg">Model: {product.model || "N/A"}</p> */}

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div className="w-1/3">
              <h3 className="text-sm font-sm mb-1">Select Size</h3>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border border-gray-300 px-2 w-full outline-none"
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Color Selector */}
          {colors.length > 0 && (
            <div>
              <label className="block mb-1 font-sm text-sm">
                Select Color
              </label>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <label key={color} className="cursor-pointer">
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      className="hidden"
                      onChange={() => setSelectedColor(color)}
                      checked={selectedColor === color}
                    />
                    <span
                      style={{ backgroundColor: color.toLowerCase() }}
                      className={`w-4 h-4 rounded-full inline-block border-2 
                        ${
                          selectedColor === color
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      title={color}
                    ></span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
        <div className="w-full gap-x-3 flex ">
         
            <button
            onClick={() => {
              if (!selectedSize || !selectedColor) {
                alert("Please select a size and color");
                return;
              }

              addToCart({
                ...product,
                selectedSize,
                selectedColor,
              });
            }}
            className=" bg-teal-500 text-white py-1 px-5 text-sm hover:bg-teal-600 transition"
          >
            Add to Cart
          </button>
           <button className="bg-black text-white py-1 px-5 ">Wish Me</button>


        </div>
            <div className="flex items-center space-x-2 text-base text-gray-600 ">
       <FaRotate className="text-gray-600 text-xs font-sm" />
            
            <p> Easy {product.returnabledays} days returns and exchange</p>
          </div>
           </div>
          <div className="p-5">
            {product.long_description && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-2">Product Details</h3>
                <div
                  className="text-gray-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: product.long_description }}
                />
              </div>
            )}
          </div>
        
          <ProductReview productId={product.id} />

          {/* Extra Actions */}
          <div className="flex p-5 space-x-4 text-sm text-gray-600 mt-4">
            <button className="hover:text-indigo-600">Save to Wishlist</button>
            <button className="hover:text-indigo-600">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
