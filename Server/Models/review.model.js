// models/reviewModel.js

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);


reviewSchema.index({ customerId: 1, vendorId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);