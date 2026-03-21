import mongoose from "mongoose";
import { cartModel } from "../Models/cart.Model.js";
import { productModel } from "../Models/product.model.js";
import { orderModel } from "../Models/order.model.js";
import AppError from "../Utilities/AppError.js";

//service for cash on delivery
export const codOrderService = async (user, body) => {
  const { address } = body;
  //find cartdata
  const cartItems = await cartModel.findOne({ customerId: user._id });
  if (!cartItems || cartItems.items.length === 0) {
    throw new AppError("cart is empty", 400);
  }

  const productIdes = cartItems.items.map(
    (product) => new mongoose.Types.ObjectId(product.productId)
  );

  //fetch all products in cart
  const products = await productModel
    .find({ _id: { $in: productIdes } })
    .lean();

  const productMap = new Map();

  products.forEach((p) => {
    productMap.set(p._id.toString(), p);
  });

  let totalAmount = 0;
  const orders = cartItems.items.map((item) => {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new AppError("product not found", 404);
    }
    if (product.stock < item.quantity) {
      throw new AppError(`${product.name} out of stock`);
    }
    totalAmount += product.price * item.quantity;
    return {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      category: product.category,
      vendorId: product.VendorId,
      quantity: item.quantity,
    };
  });

  const createOrder = await orderModel.create({
    customerId: user._id,
    items: orders,
    totalAmount: totalAmount,
    paymentMethod: "COD",
    address: address,
  });
  await cartModel.updateOne({ customerId: user._id }, { $set: { items: [] } });
  return createOrder;
};

//service for fetch customer orders
export const fetchCustomerOrdersService = async (user) => {
  const customerOrders = await orderModel.find({ customerId: user._id }).lean();
  if (customerOrders.length === 0) {
    throw new AppError("orders didnt available", 404);
  }
  return customerOrders;
};

//service for fetch customer orders
export const fetchVendorOrderService = async (user) => {
  const vendorOrders = await orderModel.aggregate([
    {
      $match: {
        "items.vendorId": user._id,
      },
    },
    {
      $project: {
        customerId: 1,
        totalAmount: 1,
        orderStatus: 1,
        paymentMethod: 1,
        paymentStatus: 1,
        address: 1,

        items: {
          $filter: {
            input: "$items",
            as: "item",
            cond: {
              $eq: ["$$item.vendorId", user._id],
            },
          },
        },
      },
    },
  ]);
  return vendorOrders
};
