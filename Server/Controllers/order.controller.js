import { codOrderService } from "../Services/order.service.js"


//controller for cash on delivery
const codOrderController=async(req,res,next)=>{
try {
    const order=await codOrderService(req.user,req.body)
    res.status(201).json({
     message:'order placed',
     data:order,
     success:true
    })
} catch (error) {
    next(error)
}
}


export {
    codOrderController
}