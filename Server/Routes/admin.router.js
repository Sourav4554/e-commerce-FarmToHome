import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { adminroleMiddleware } from "../Middlewares/adminrole.middleware.js";
import {
  fetchPendingRequestController,
  approvePendingVendorController,
  disableVendorAccount,
  blockCustomerController,
  unblockCustomerController,
  fetchVendorController,
  fetchOrderController,
  updateOrderStatusController,
  fetchProductsController,
  deleteProductController
} from "../Controllers/admin.controller.js";
const adminRouter = express.Router();

//fetch pending request for admin
adminRouter.get(
  "/pending-request",
  authMiddleware,
  adminroleMiddleware,
  fetchPendingRequestController
);

//approve pending request of vendor
adminRouter.patch(
  "/approve-request/:id",
  authMiddleware,
  adminroleMiddleware,
  approvePendingVendorController
);
//disable approved vendor account
adminRouter.patch(
  "/disable-account/:id",
  authMiddleware,
  adminroleMiddleware,
  disableVendorAccount
);
//block customer by admin
adminRouter.patch(
  "/block-customer/:id",
  authMiddleware,
  adminroleMiddleware,
  blockCustomerController
);
//unblock customer by admin
adminRouter.patch(
  "/unblock-customer/:id",
  authMiddleware,
  adminroleMiddleware,
  unblockCustomerController
);

//fetch all vendors for admin
adminRouter.get(
  '/fetch-vendors',
  authMiddleware,
  adminroleMiddleware,
  fetchVendorController
  )

//fetch All Orders for Admin
adminRouter.get(
  '/fetch-orders',
  authMiddleware,
  adminroleMiddleware,
  fetchOrderController
  )

//update order status 
adminRouter.patch(
  '/update-status/:id',
  authMiddleware,
  adminroleMiddleware,
  updateOrderStatusController
  )
//fetch products for admin 
adminRouter.get(
  '/fetch-products',
  authMiddleware,
  adminroleMiddleware,
  fetchProductsController
  )

//delete product 
adminRouter.delete(
  '/delete-product/:id',
  authMiddleware,
  adminroleMiddleware,
  deleteProductController
  )
export default adminRouter;
