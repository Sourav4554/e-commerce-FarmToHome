import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import VendorDetail from "../component/VendorDetail";
import VendorProducts from "../component/VendorProducts";
import AddReview from "../component/AddReview";
import ReviewList from "../component/ReviewList";
import { useReviewHook } from "../../hooks/reviewHook/useReview";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const VendorShop = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { addReviewMethod, loading, fetchReviewMethod } = useReviewHook();
  const [reviews, setReviews] = useState([]);
  const [totalReviews,setTotalReviews]=useState(0)
  const [average,setAverage]=useState(0)
  const { id } = useParams();
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
  });

  const fetchVendorReview = async () => {
    const response = await fetchReviewMethod(id);
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setReviews(response.reviews);
    setTotalReviews(response.totalRating)
    setAverage(response.average)
  };

  useEffect(() => {
    fetchVendorReview();
  }, [id]);
 

  //submit review method
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const response = await addReviewMethod(id, newReview);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: "" });
    await fetchVendorReview();
  };

  const StarRating = ({ rating, size = "sm" }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
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

        <VendorDetail 
        average={average}
        totalReviews={totalReviews}
        />
        {/* Products Section */}

        <VendorProducts />

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
              className="contact-btn text-white bg-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl whitespace-nowrap self-start sm:self-auto"
            >
              {showReviewForm ? "Cancel" : "Add Review"}
            </button>
          </div>

          {/* Review Form */}
          <AddReview
            showReviewForm={showReviewForm}
            newReview={newReview}
            setNewReview={setNewReview}
            handleSubmitReview={handleSubmitReview}
            loading={loading}
          />
          {/* Reviews List */}
          <ReviewList
            reviews={reviews}
            StarRating={StarRating}
            setShowReviewForm={setShowReviewForm}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorShop;
