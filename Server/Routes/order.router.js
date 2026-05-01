import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { customerroleMiddleware } from "../Middlewares/customerrole.middleware.js";
import {
  codOrderController,
  paymentVerificationController,
  fetchCustomerOrdersController,
  fetchVendorOrderController,
  razorpayController,
  paymentFailureController,
  cancelOrderController
} from "../Controllers/order.controller.js";
import { validateOrder } from "../Middlewares/Validators/order.validator.js";
import { validationErrors } from "../Middlewares/Validators/validationerror.js";
import { vendorRoleMiddleware } from "../Middlewares/vendorrole.middleware.js";
const orderRouter = express.Router();

//route for cod
orderRouter.post(
  "/cod",
  validateOrder,
  validationErrors,
  authMiddleware,
  customerroleMiddleware,
  codOrderController
);

//route for fetch customer orders
orderRouter.get(
  "/customer-order",
  authMiddleware,
  customerroleMiddleware,
  fetchCustomerOrdersController
);

//route for fetch vendor orders
orderRouter.get(
  "/vendor-order",
  authMiddleware,
  vendorRoleMiddleware,
  fetchVendorOrderController
);

//route for online razorpay payment
orderRouter.post(
  "/online",
  validateOrder,
  validationErrors,
  authMiddleware,
  customerroleMiddleware,
  razorpayController
);

//handle payment failure
orderRouter.delete(
  "/payment-failure",
  authMiddleware,
  customerroleMiddleware,
  paymentFailureController
);

//handle payment verification
orderRouter.post(
  "/verify-payment",
  authMiddleware,
  customerroleMiddleware,
  paymentVerificationController
);

//handling cancel order
orderRouter.patch(
  '/cancel-order/:id',
  authMiddleware,
  customerroleMiddleware,
  cancelOrderController
  )
export default orderRouter;
