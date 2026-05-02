import mongoose from "mongoose";
import reviewModel from "../Models/review.model.js";
import AppError from "../Utilities/AppError.js";

//service for add review
export const addReviewService = async (body, params, user) => {
  const { comment, rating } = body;
  const { id } = params;
  const Id = new mongoose.Types.ObjectId(id);
  if (!rating || rating < 1 || rating > 5) {
    throw new AppError("Rating must be between 1 and 5", 401);
  }
  const existingReview = await reviewModel.findOne({
    customerId: user._id,
    vendorId: Id,
  });
  if (existingReview) {
    throw new AppError("Already review adedd", 401);
  }
  const review = await reviewModel.create({
    customerId: user._id,
    vendorId: Id,
    rating: rating,
    comment: comment,
  });

  return review;
};

//services for fetchReview
export const fetchReviewService = async (user, params) => {
  const id = new mongoose.Types.ObjectId(params.id);
  const reviews = await reviewModel
    .find({ vendorId: id })
    .populate("customerId", "name avatar")
    .sort({ createdAt: -1 });

  const totalReviewCount = reviews.length;

  const totalRating = reviews.reduce((sum, item) => {
    return sum + item.rating;
  }, 0);

  const averageRating =
    totalReviewCount === 0 ? 0 : totalRating / totalReviewCount;
  return { reviews, averageRating, totalReviewCount };
};
