import mongoose from "mongoose";
import crypto from "crypto";
import { cartModel } from "../Models/cart.Model.js";
import { productModel } from "../Models/product.model.js";
import { orderModel } from "../Models/order.model.js";
import AppError from "../Utilities/AppError.js";
import { RazorpayInstance } from "../Config/razorpay.config.js";
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
    const product = productMap.get(item.productId.toString());
    if (!product) {
      throw new AppError("product not found", 404);
    }
    if (product.stock < item.quantity) {
      throw new AppError(`${product.name} out of stock`);
    }
    totalAmount += product.price * item.quantity + 20;
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

  //reduce the stock in productModel
  await productModel.bulkWrite(
    cartItems.items.map((item) => ({
      updateOne: {
        filter: {
          _id: item.productId,
        },
        update: {
          $inc: {
            stock: -item.quantity,
          },
        },
      },
    }))
  );

  await cartModel.updateOne({ customerId: user._id }, { $set: { items: [] } });
  return createOrder;
};

//service for razorpay order
export const razorpayService = async (user, body) => {
  const { address } = body;
  const cartData = await cartModel.findOne({ customerId: user._id });
  if (!cartData || cartData.items.length === 0) {
    throw new AppError("cart is empty", 400);
  }

  const productIdes = cartData.items.map(
    (product) => new mongoose.Types.ObjectId(product.productId)
  );
  const products = await productModel.find({ _id: { $in: productIdes } });
  const productMap = new Map();

  products.forEach((p) => {
    productMap.set(p._id.toString(), p);
  });

  let totalAmount = 0;

  const orders = cartData.items.map((item) => {
    const product = productMap.get(item.productId.toString());

    if (!product) {
      throw new AppError("product not found", 404);
    }
    if (product.stock < item.quantity) {
      throw new AppError(`${product.name} out of stock`);
    }
    totalAmount += product.price * item.quantity + 20;

    return {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      category: product.category,
      vendorId: product.VendorId,
      quantity: item.quantity,
    };
  });
  const createOrder = new orderModel({
    customerId: user._id,
    items: orders,
    totalAmount: totalAmount,
    paymentMethod: "ONLINE",
    address: address,
  });
  const options = {
    currency: "INR",
    amount: totalAmount * 100,
    receipt: createOrder._id,
  };
  const order = await RazorpayInstance.orders.create(options);
  console.log(order.id);
  createOrder.razorpayOrderId = order.id;
  await createOrder.save();
  return order;
};

//service for verify razorpay order
export const paymentVerificationSevice = async (body, user) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    throw new AppError("Invalid Signature", 400);
  }
  const orderInfo = await RazorpayInstance.orders.fetch(razorpay_order_id);
  console.log(orderInfo.id);
  if (orderInfo.status === "paid") {
    await orderModel.updateOne(
      { razorpayOrderId: orderInfo.id },
      {
        paymentStatus: true,
        razorpaySignature: razorpay_signature,
        razorpayPaymentId: razorpay_payment_id,
      }
    );
    const cartItems = await cartModel.findOne({ customerId: user._id });
    //reduce the stock in productModel
    await productModel.bulkWrite(
      cartItems.items.map((item) => ({
        updateOne: {
          filter: {
            _id: item.productId,
          },
          update: {
            $inc: {
              stock: -item.quantity,
            },
          },
        },
      }))
    );

    await cartModel.updateOne(
      { customerId: user._id },
      { $set: { items: [] } }
    );
  }
};

//service for fetch customer orders
export const fetchCustomerOrdersService = async (user) => {
  const customerOrders = await orderModel.find({ customerId: user._id }).lean();
  if (customerOrders.length === 0) {
    throw new AppError("orders didnt available", 404);
  }
  return customerOrders;
};

//service for fetch vendor orders
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
  return vendorOrders;
};
