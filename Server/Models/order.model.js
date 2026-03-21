import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  items: {
    type: Array,
    required: true,
  },
  totalAmount: Number,
  orderStatus: {
    type: String,
    enum: ["placed", "cancelled", "delivered"],
    default: "placed",
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  address: {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    panchayath: {
      type: String,
      required: true,
    },

    ward: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    houseName: {
      type: String,
      required: true,
    },

    houseNo: {
      type: String,
      required: true,
    },
  },
},{timestamps:true});

export const orderModel=mongoose.model.order || mongoose.model('order',orderSchema)
