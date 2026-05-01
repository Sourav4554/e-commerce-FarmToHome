import mongoose from "mongoose";
import { orderModel } from "../Models/order.model.js";
import usermodel from "../Models/usermodel.js";
import AppError from "../Utilities/AppError.js";
import { productModel } from "../Models/product.model.js";

//fetch pending vendor request service
export const fetchPendingRequestService = async () => {
  const pendingRequest = await usermodel
    .find({ role: "vendor", isapproved: false })
    .select("-password");
  if (pendingRequest.length === 0) {
    throw new AppError("No pending request", 404);
  }
  return pendingRequest;
};

//service for approve pending vendor
export const approvePendingVendorService = async (params) => {
  if (!params) {
    throw new AppError("Please pass id", 400);
  }
  const approve = await usermodel.findByIdAndUpdate(
    { _id: params.id },
    { isapproved: true },
    { returnDocument: "after" }
  );
  return approve.toObject();
};

//service for disable vendor account
export const disableVendorAccountService = async (params) => {
  const approve = await usermodel.findByIdAndUpdate(
    { _id: params.id },
    { blockByAdmin: true },
    { returnDocument: "after" }
  );
  return approve.toObject();
};

export const blockCustomerService = async (params) => {
  const approve = await usermodel.findByIdAndUpdate(
    { _id: params.id },
    { blockByAdmin: true },
    { returnDocument: "after" }
  );
  return approve.toObject();
};

//unblock customer service
export const unblockCustomerService = async (params) => {
  const approve = await usermodel.findByIdAndUpdate(
    { _id: params.id },
    { blockByAdmin: false },
    { returnDocument: "after" }
  );
  return approve.toObject();
};
//fetch vendors for user
export const fetchVendorService = async (query) => {
  const limit = Number(query.limit) || 4;
  const page = Number(query.page) || 1;
  const status = query.status;
  const role = query.role;
  const filter = {
    role: role || "vendor",
  };
  if (status === "approved") {
    filter.isapproved = true;
    filter.blockByAdmin = false;
  } else if (status === "pending") {
    filter.isapproved = false;
  } else if (status === "blocked") {
    filter.blockByAdmin = true;
  }
  const skip = (page - 1) * limit;
  const totalPages = await usermodel.countDocuments(filter);

  const vendors = await usermodel
    .find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  return { vendors, page, totalPages: Math.ceil(totalPages / limit) };
};

//fetch Orders for admin
export const fetchOrderService = async (query) => {
  const limit = Number(query.limit) || 4;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * limit;
  const totalPages = await orderModel.countDocuments();
  const orders = await orderModel
    .find({})
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  if (!orders.length) {
    throw new AppError("Order not found", 404);
  }
  return { orders, page, totalPages: Math.ceil(totalPages / limit) };
};

//service for update order status
export const updateOrderStatusService = async (params, body) => {
  const { id } = params;
  const { status } = body;
  const orderId = new mongoose.Types.ObjectId(id);
  const order = await orderModel.findById(orderId);
  if (status === "delivered" && order.paymentMethod === "COD") {
    order.paymentStatus = true;
  }
  order.orderStatus = status;

  await order.save();
};

//service to fetch products for admin
export const fetchProductsServices = async (params,user) => {
  const limit = Number(params.limit) || 6;
  const page = Number(params.page) || 1;
  const skip = (page - 1) * limit;
  const totalCount = await productModel.countDocuments({ isDelete: false });
  const products = await productModel
    .find({ isDelete: false })
    .populate('VendorId')
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  if (!products.length) {
    throw new AppError("product not found ", 404);
  }
  return { products, page, totalPages: Math.ceil(totalCount / limit) };
};
