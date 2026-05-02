import { useState } from "react";
import { addReview, fetchReview } from "../../services/reviewService";

export const useReviewHook = () => {
  const [loading, setLoading] = useState(false);
  //method for add review
  const addReviewMethod = async (review, id) => {
    try {
      setLoading(true);
      const { data } = await addReview(review, id);
      return {
        success: data.success,
        message: data.message,
        review: data.review,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };

  //method for fetch review
  const fetchReviewMethod = async (id) => {
    try {
    //   setLoading(true);
      const { data } = await fetchReview(id);
      return {
        success: data.success,
        reviews: data.reviews,
        totalRating: data.totalRating,
        average: data.average,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
    }
  };
  return { addReviewMethod, fetchReviewMethod, loading };
};
