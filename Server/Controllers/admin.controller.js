import { fetchPendingRequestService,approvePendingVendorService,disableVendorAccountService } from "../Services/admin.service.js"
import AppError from "../Utilities/AppError.js"


//fetch pending vendor request controller
const fetchPendingRequestController=async(req,res,next)=>{
try {
    const pendingRequest=await fetchPendingRequestService()
    res.status(200).json({
    data:pendingRequest,
    success:true
    })
} catch (error) {
    next(error)
}
}

//controller for approve pending vendor
const approvePendingVendorController=async(req,res,next)=>{
try {
    const approve=await approvePendingVendorService(req.params)
    if(approve){
    res.status(200).json({
    message:'vendore request approved',
    data:approve,
    success:true
    })
    }else{
    throw new AppError('not approved something wrong',401)
    }
} catch (error) {
    next(error)
}
}

//controller for disable vendor account
const disableVendorAccount=async(req,res,next)=>{
    try {
        const approve=await disableVendorAccountService(req.params)
        if(approve){
        res.status(200).json({
        message:'vendor account disabled',
        data:approve,
        success:true
        })
        }else{
        throw new AppError('not disabled something wrong',401)
        }
    } catch (error) {
        next(error)
    }
    }
export {
    fetchPendingRequestController,
    approvePendingVendorController,
    disableVendorAccount
}