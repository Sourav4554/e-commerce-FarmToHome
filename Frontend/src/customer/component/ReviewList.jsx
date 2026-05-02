import React from 'react'
import { Star } from "lucide-react";
const ReviewList = ({reviews=[],StarRating,setShowReviewForm}) => {
  return (
    <>
     {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="review-card bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={review?.customerId?.avatar}
                      alt={review?.customerId?.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md shrink-0"
                    />
                    <div className="grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {review?.customerId?.name}
                        </h4>
                        <span className="text-gray-500 text-sm">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                      <p className="text-gray-700 leading-relaxed mt-3">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to review this vendor
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="contact-btn cursor-pointer bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl inline-block"
              >
                Write a Review
              </button>
            </div>
          )}
    </>
  )
}

export default ReviewList