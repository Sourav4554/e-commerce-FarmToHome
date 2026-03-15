import { fetchvendorService } from "../Services/vendor.service.js"

//fetch vendor controller
const fetchvendorController=async(req,res,next)=>{
try {
    const vendors=await fetchvendorService()
    if(vendors.length===0){
        throw new AppError('No customers registered',400)
        }
        return res.status(200).json({
        data:vendors,
        success:true
        })
} catch (error) {
    next(error)
}
}

export {
fetchvendorController
}