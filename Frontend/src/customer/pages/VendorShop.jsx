import React, { useState } from 'react';
import { Star, MapPin, Calendar, MessageCircle, ShoppingCart, StarIcon } from 'lucide-react';
import VendorDetail from '../component/VendorDetail';
import VendorProducts from '../component/VendorProducts';

const VendorShop = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });


  // Sample products data
  const products = [
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      price: 45,
      image: "https://images.unsplash.com/photo-1546470427-227a7c5e20e7?w=400&h=400&fit=crop",
      unit: "kg"
    },
    {
      id: 2,
      name: "Kerala Red Rice",
      price: 120,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      unit: "kg"
    },
    {
      id: 3,
      name: "Fresh Ginger",
      price: 180,
      image: "https://images.unsplash.com/photo-1599909533640-5a7e78ee4e7f?w=400&h=400&fit=crop",
      unit: "kg"
    },
    {
      id: 4,
      name: "Coconut Oil (Premium)",
      price: 350,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
      unit: "liter"
    },
    {
      id: 5,
      name: "Organic Spinach",
      price: 35,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
      unit: "bundle"
    },
    {
      id: 6,
      name: "Fresh Curry Leaves",
      price: 25,
      image: "https://images.unsplash.com/photo-1596040033229-a0b55ee8defd?w=400&h=400&fit=crop",
      unit: "bunch"
    },
    {
      id: 7,
      name: "Tapioca (Kappa)",
      price: 40,
      image: "https://images.unsplash.com/photo-1628348135518-0f5f7e1cb3b5?w=400&h=400&fit=crop",
      unit: "kg"
    },
    {
      id: 8,
      name: "Organic Jaggery",
      price: 90,
      image: "https://images.unsplash.com/photo-1599909533540-b5eb1cb6b34a?w=400&h=400&fit=crop",
      unit: "kg"
    }
  ];

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      userName: "Priya Nair",
      rating: 5,
      comment: "Excellent quality products! The vegetables are always fresh and organic. Highly recommended!",
      date: "2 weeks ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      userName: "Rajesh Kumar",
      rating: 4,
      comment: "Good service and quality. Delivery was on time. Prices are reasonable.",
      date: "1 month ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      userName: "Anjali Thomas",
      rating: 5,
      comment: "Best organic store in the area! The coconut oil is pure and aromatic. Will order again.",
      date: "1 month ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Review submitted:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '' });
  };

  const StarRating = ({ rating, size = 'sm' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/30">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Vendor Profile Card */}
     
         <VendorDetail/>
        {/* Products Section */}
        
        <VendorProducts/>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Customer Reviews
              </h2>
              <p className="text-gray-600">
                See what our customers are saying about us
              </p>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="contact-btn text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl whitespace-nowrap self-start sm:self-auto"
            >
              {showReviewForm ? 'Cancel' : 'Add Review'}
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="animate-slide-in mb-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-emerald-100">
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
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
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
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Tell us about your experience with this vendor..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="add-to-cart-btn text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="review-card bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={review.avatar}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {review.userName}
                        </h4>
                        <span className="text-gray-500 text-sm">{review.date}</span>
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
                className="contact-btn text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl inline-block"
              >
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorShop;