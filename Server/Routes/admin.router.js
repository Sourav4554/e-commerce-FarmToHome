import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { adminroleMiddleware } from "../Middlewares/adminrole.middleware.js";
import {
  fetchPendingRequestController,
  approvePendingVendorController,
  disableVendorAccount,
  blockCustomerController,
  unblockCustomerController
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
export default adminRouter;
