import { addToCartService ,removeFromCartService,fetchCartService} from "../Services/cart.service.js"
//controller for add to cart
const addToCartController=async(req,res,next)=>{
try {
    const result=await addToCartService(req.user,req.body)
    res.status(201).json({
    message:'product added to cart',
    data:result,
    success:true
    })
} catch (error) {
    next(error)
}
}

//controller for remove from cart
const removeFromCartController=async(req,res,next)=>{
try {
    const result=await removeFromCartService(req.user,req.body);
    res.status(201).json({
        message:'product remove from cart',
        data:result,
        success:true
        })
} catch (error) {
    next(error)
}
}
//controller for fetch cartdata
const fetchCartController=async(req,res,next)=>{
try {
    const cartdata=await fetchCartService(req.user)
    res.status(200).json({
    data:cartdata,
    success:true
    })
} catch (error) {
    next(error)
}

}
export {
addToCartController,
removeFromCartController,
fetchCartController
}