import {
  fetchPendingRequestService,
  approvePendingVendorService,
  disableVendorAccountService,
  blockCustomerService,
  unblockCustomerService,
  fetchVendorService,
  fetchOrderService,
  updateOrderStatusService,
  fetchProductsServices,
  deleteProductService,
  fetchAdminDashboardService
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

//controller for fetch vendor 
const  fetchVendorController=async(req,res,next)=>{
try {
  const vendors=await fetchVendorService(req.query);
  return res.status(200).json({
  success:true,
  vendors:vendors.vendors,
  pages:vendors.page ,
  totalPages:vendors.totalPages,
  })
} catch (error) {
  next(error)
}
}

//controller for fetch Order for Admin
const fetchOrderController=async(req,res,next)=>{
try {
  const orders=await fetchOrderService(req.query)
  return res.status(200).json({
  success:true,
  orders:orders.orders,
  page:orders.page,
  totalPages:orders.totalPages
  })
} catch (error) {
  next(error)
}
}

//controller for update order status
const updateOrderStatusController=async(req,res,next)=>{
try {
  await updateOrderStatusService(req.params,req.body)
  return res.status(201).json({
  message:'order status updated',
  success:true
  })
} catch (error) {
  next(error)
}
}

//controller for fetch all products 
const fetchProductsController=async(req,res,next)=>{
try {
  const products=await fetchProductsServices(req.params,req.user)
  return res.status(200).json({
  success:true,
  products:products.products,
  page:products.page,
  totalPages:products.totalPages
  })
} catch (error) {
  next(error)
}
}

//controller for delete product
const deleteProductController=async(req,res,next)=>{
try {
  const deleteProduct=await deleteProductService(req.params)

  return res.status(200).json({
  message:'product deleted',
  success:true,
  product:deleteProduct
  })
} catch (error) {
 next(error) 
}
}

//controller for fetch DashboardDetails
const fetchAdminDashboardController=async(req,res,next)=>{
try {
  const result=await fetchAdminDashboardService()
  return res.status(200).json({
    success: true,
    message: "Dashboard stats fetched successfully",
    stats: result
  })
} catch (error) {
  next(error)
}
}
export {
  fetchPendingRequestController,
  approvePendingVendorController,
  disableVendorAccount,
  blockCustomerController,
  unblockCustomerController,
  fetchVendorController,
  fetchOrderController,
  updateOrderStatusController,
  fetchProductsController,
  deleteProductController,
  fetchAdminDashboardController
};
