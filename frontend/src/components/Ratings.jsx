import React, { useState, useEffect } from "react";
import axios from '../utils/axiosInstance';
import { useContext } from "react";
import { AuthContext } from "../globalstate/authcontext";

const Ratings = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
const {user}= useContext(AuthContext); // Assuming you have an AuthContext to get user info
  // Fetch reviews and rating on mount
  useEffect(() => {
    // fetchReviews();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, rating, comment } = formData;
    if (!name || !rating || !comment) return;

    try {
      await axios.post("/api/reviews", {
        user_id: user.usid, // Replace with actual user ID from auth,
        productId,
        rating,
        comment,
      });
      fetchReviews();
      fetchRatingSummary();
      setFormData({ name: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const Star = ({ filled }) => (
    <svg
      className={`w-5 h-5 ${filled ? "text-yellow-500" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09L5.5 12.27.845 7.91l6.22-.91L10 1l2.935 6 6.22.91-4.655 4.36L15.878 18z" />
    </svg>
  );

  return (
    <div className="py-5 bg-white rounded">
      <h2 className="text-2xl font-semibold mb-4">Ratings & Reviews</h2>

      <div className="flex items-center mb-6">
        <span className="text-3xl font-bold mr-2">{averageRating.toFixed(1)}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} filled={i <= Math.round(averageRating)} />
          ))}
        </div>
        {/* <span className="ml-2 text-sm text-gray-500">({reviews.length} reviews)</span> */}
      </div>

    {user && (  <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Your name"
          className="w-full border border-gray-300 px-4 py-2 rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setFormData({ ...formData, rating: star })}
            >
              <Star filled={star <= formData.rating} />
            </button>
          ))}
        </div>
        <textarea
          placeholder="Your review"
          className="w-full border border-gray-300 px-4 py-2 rounded"
          rows="3"
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        />
        <button
       
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>)}

      {/* <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex items-center mb-1">
              <span className="font-semibold mr-2">{review.user_name || review.name}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} filled={i <= review.rating} />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Ratings;
