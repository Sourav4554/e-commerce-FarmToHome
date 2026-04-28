import { codOrderService,paymentVerificationSevice,fetchCustomerOrdersService,paymentFailureService,fetchVendorOrderService,razorpayService} from "../Services/order.service.js"


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

//controller for razorpy online payment
const razorpayController=async(req,res,next)=>{
try {
    const razorpayResponse=await razorpayService(req.user,req.body);
    return res.status(200).json({
    success:true,
    order:razorpayResponse
    })
} catch (error) {
    next(error)
}
}

//payment verification controller
const paymentVerificationController=async(req,res,next)=>{
 try {
    await paymentVerificationSevice(req.body,req.user)
    return res.status(201).json({
    success:true,
    message:'order created'
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
    order:customerOrders,
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

//controller for handling payment failure 
const paymentFailureController=async(req,res,next)=>{
try {
    await paymentFailureService(req.body)
    return res.status(400).json({
    success:true,
    message:'Payment failed'
    })
} catch (error) {
    next(error)
}
}
export {
    codOrderController,
    fetchCustomerOrdersController,
    fetchVendorOrderController,
    razorpayController,
    paymentVerificationController,
    paymentFailureController
}