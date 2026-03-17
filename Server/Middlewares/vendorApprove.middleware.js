import usermodel from "../Models/usermodel.js";
import AppError from "../Utilities/AppError.js";
export const vendorApproveMiddleware = async (req, res, next) => {
    const vendor = await usermodel
      .findById(req.user._id)
      .select("isapproved");
  
    if (!vendor || !vendor.isapproved) {
      return next(new AppError("Vendor not approved", 403));
    }
  
    next();
  };