import { fetchvendorService,filterService } from "../Services/vendor.service.js"
import AppError from "../Utilities/AppError.js"
//fetch vendor controller
const fetchvendorController=async(req,res,next)=>{
try {
    const vendors=await fetchvendorService(req.query)
    if(vendors.length===0){
        throw new AppError('No customers registered',400)
        }
        console.log(vendors)
        return res.status(200).json({
        data:vendors,
        success:true
        })
} catch (error) {
    next(error)
}
}

//filter controller
const filterController=async(req,res,next)=>{
try {
    const filterResult=await filterService(req.query)
    if(filterResult.length===0){
        throw new AppError('No data available',400)
        }
        return res.status(200).json({
        data:filterResult,
        success:true
        })
} catch (error) {
    next(error)
}
}

export {
fetchvendorController,
filterController
}