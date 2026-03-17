import usermodel from "../Models/usermodel.js";
import AppError from "../Utilities/AppError.js";

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
  return approve.toObject()
};

//service for disable vendor account
export const disableVendorAccountService=async(params)=>{
      const approve = await usermodel.findByIdAndUpdate(
        { _id: params.id },
        { isapproved: false },
        { returnDocument: "after" }
      );
      return approve.toObject()
}

export const blockCustomerService=async(params)=>{
  const approve = await usermodel.findByIdAndUpdate(
    { _id: params.id },
    {  blockByAdmin: true },
    { returnDocument: "after" }
  );
  return approve.toObject()
}

//unblock customer service
export const unblockCustomerService=async(params)=>{
  const approve = await usermodel.findByIdAndUpdate(
    { _id: params.id },
    {  blockByAdmin: false },
    { returnDocument: "after" }
  );
  return approve.toObject()
}