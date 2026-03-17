import {
  fetchPendingRequestService,
  approvePendingVendorService,
  disableVendorAccountService,
  blockCustomerService,
  unblockCustomerService
} from "../Services/admin.service.js";
import AppError from "../Utilities/AppError.js";

//fetch pending vendor request controller
const fetchPendingRequestController = async (req, res, next) => {
  try {
    const pendingRequest = await fetchPendingRequestService();
    res.status(200).json({
      data: pendingRequest,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//controller for approve pending vendor
const approvePendingVendorController = async (req, res, next) => {
  try {
    const approve = await approvePendingVendorService(req.params);
    if (approve) {
      res.status(200).json({
        message: "vendor request approved",
        data: approve,
        success: true,
      });
    } else {
      throw new AppError("not approved something wrong", 401);
    }
  } catch (error) {
    next(error);
  }
};

//controller for disable vendor account
const disableVendorAccount = async (req, res, next) => {
  try {
    const approve = await disableVendorAccountService(req.params);
    if (approve) {
      res.status(200).json({
        message: "vendor account disabled",
        data: approve,
        success: true,
      });
    } else {
      throw new AppError("not disabled something wrong", 401);
    }
  } catch (error) {
    next(error);
  }
};
//controller for block customer
const blockCustomerController = async (req, res, next) => {
  try {
    const blockCustomer = await blockCustomerService(req.params);
    if (blockCustomer) {
      res.status(200).json({
        message: "customer account disabled",
        data: blockCustomer,
        success: true,
      });
    } else {
      throw new AppError("not disabled something wrong", 401);
    }
  } catch (error) {
    next(error);
  }
};

//controller for unBlock customer
const unblockCustomerController = async (req, res, next) => {
  try {
    const unblockCustomer = await unblockCustomerService(req.params);
    if (unblockCustomer) {
      res.status(200).json({
        message: "remove customer account block",
        data: unblockCustomer,
        success: true,
      });
    } else {
      throw new AppError("not disabled something wrong", 401);
    }
  } catch (error) {
    next(error);
  }
};
export {
  fetchPendingRequestController,
  approvePendingVendorController,
  disableVendorAccount,
  blockCustomerController,
  unblockCustomerController,
};
