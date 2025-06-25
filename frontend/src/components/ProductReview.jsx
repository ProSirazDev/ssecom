import axios from '../utils/axiosInstance';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';

const ProductReview = ({productId}) => {
 const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  
  useEffect(() => {
    fetchReviews();
    fetchRatingSummary();
  }, [productId]);

   const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/${productId}/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
  
    const fetchRatingSummary = async () => {
      try {
        const res = await axios.get(`/api/reviews/${productId}/rating`);
        setAverageRating(parseFloat(res.data.average_rating || 0));
      } catch (err) {
        console.error("Error fetching rating:", err);
      }
    };
    const Star = ({ filled }) => (
    <svg
      className={`w-5 h-5 ${filled ? "text-orange-500" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09L5.5 12.27.845 7.91l6.22-.91L10 1l2.935 6 6.22.91-4.655 4.36L15.878 18z" />
    </svg>);
  return (
       <div className="space-y-4 p-5">
       <div className="flex flex-row items-center  mb-6">
        <span className="text-3xl text-green-700 font-medium  mr-2">{averageRating.toFixed(1)} </span> 
        <span className='text-lg text-green-700 font-medium mr-2'> <FaStar/> </span>
        {/* <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star className='text-yellow-400' key={i} filled={i <= Math.round(averageRating)} />
          ))}
        </div> */}
        <span className="ml-2 text-sm font-medium text-gray-500">({reviews.length} reviews)</span>
      </div>
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <div className="flex items-center mb-1">
              <span className="font-medium text-sm text-gray-500 mr-2">{review.user_name || review.name}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} filled={i <= review.rating} />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div> 
  )
}

export default ProductReview