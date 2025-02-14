import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { useAuth } from "../contexts/authContext";
import { jwtDecode } from "jwt-decode";
import { submitReview } from "../utils/api"; 

const ReviewModal = ({ isOpen, onClose, bookId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const decoded = jwtDecode(token);
      return decoded.userId || decoded._id;
    } catch (error) {
      console.error("Error getting userId:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        throw new Error("Authentication information not found");
      }

      console.log("Submitting review with userId:", userId);

      const reviewData = await submitReview(bookId, userId, rating, comment); 
      onReviewSubmitted(reviewData.addReview);
      onClose();
      setRating(0);
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-semibold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please log in to share your thoughts about this book.</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-semibold">Share Your Thoughts</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-amber-50 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-lg font-serif font-medium text-gray-700">Your Rating</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-serif font-medium text-gray-700">Your Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full rounded-lg border-2 border-amber-100 p-4 text-base outline-none focus:border-amber-300 transition-colors"
              placeholder="What did you think about this book?"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-amber-600 bg-white border-2 border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !rating || !comment}
              className="px-6 py-3 text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Share Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;