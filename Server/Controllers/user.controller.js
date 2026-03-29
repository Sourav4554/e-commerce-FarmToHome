import {
  currentUserService,
  updateProfileService,
  deleteProfileService,
  fetchCustomerService,
  fetchNearbyVendorService
} from "../Services/user.service.js";
import AppError from "../Utilities/AppError.js";

//find user controller
const currentUserController = async (req, res, next) => {
  try {
    const currentUser = await currentUserService(req.user);
    return res.status(200).json({
      message: "user returned",
      data: currentUser,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//update user profile
const updateProfileController = async (req, res, next) => {
  try {
    const updatedProfile = await updateProfileService(req.body, req.user);
    return res.status(201).json({
      message: "profile updated",
      data: updatedProfile,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//controller for delete profile
const deleteProfileController = async (req, res, next) => {
  try {
    const deleted = await deleteProfileService(req.user);
    if (deleted) {
      res.status(201).json({
        message: "accout deleted",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

//controller for fetch all customers for admin
const fetchCustomerController=async(req,res,next)=>{
try {
    const customers=await fetchCustomerService();
    if(customers.length===0){
    throw new AppError('No customers registered',400)
    }
    return res.status(200).json({
    data:customers,
    success:true
    })
} catch (error) {
    next(error)
}
}

//controller for fetch nearby vendors for customer
const fetchNearbyVendorController=async(req,res,next)=>{
try {
  const nearbyVendor=await fetchNearbyVendorService(req.user)
  return res.status(200).json({
    data:nearbyVendor,
    success:true
    })
} catch (error) {
  next(error)
}
}
export {
  currentUserController,
  updateProfileController,
  deleteProfileController,
  fetchCustomerController,
  fetchNearbyVendorController
};
