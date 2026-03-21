import { codOrderService,fetchCustomerOrdersService,fetchVendorOrderService} from "../Services/order.service.js"


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

//controller for fetch customer orders
const fetchCustomerOrdersController=async(req,res,next)=>{
try {
    const customerOrders=await fetchCustomerOrdersService(req.user)
    res.status(200).json({
    data:customerOrders,
    success:true
    })
} catch (error) {
    next(error)
}
}

//controller for fetch vendor orders
const fetchVendorOrderController=async(req,res,next)=>{
try {
    const vendorOrders=await fetchVendorOrderService(req.user)
    res.status(200).json({
        data:vendorOrders,
        success:true
        })
} catch (error) {
    next(error)
}
}

export {
    codOrderController,
    fetchCustomerOrdersController,
    fetchVendorOrderController
}