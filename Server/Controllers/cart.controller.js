import { addToCartService } from "../Services/cart.service.js"

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

export {
addToCartController
}