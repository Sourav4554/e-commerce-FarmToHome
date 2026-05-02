import React from "react";
import { Star } from "lucide-react";
const AddReview = ({ showReviewForm, setNewReview, newReview ,handleSubmitReview,loading}) => {
  return (
    <>
      {showReviewForm && (
        <div className="animate-slide-in mb-8 bg-linear-to-br from-emerald-50 to-white rounded-2xl p-6 border border-emerald-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Share Your Experience
          </h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= newReview.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="Tell us about your experience with this vendor..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="add-to-cart-btn text-white cursor-pointer bg-green-600  px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl"
              disabled={loading}
            >
             {loading?'Submitting...':'Submit Review'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddReview;
