import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
 items:[
    {
    productId: {
        type: String,
        required:true
      },
      vendorId: {
        type: String,
      },
      quantity: {
        type:Number,
        default: 0,
      },
    }
 ]
},{timestamps:true});

export const cartModel =
  mongoose.model.cart || mongoose.model("cart", cartSchema);
