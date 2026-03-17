import { productModel } from "../Models/product.model.js"
import AppError from "../Utilities/AppError.js"

//service for add product 
export const addProductService=async(body,user)=>{
const {
name,
description,
price,
unit,
stock,
category,
image,
}=body
const product=await productModel.create({
name,
description,
price,
unit,
stock,
category,
image,
VendorId:user._id
})
return product.toObject();
}

//service for fetch Product
export const fetchProductService=async(user)=>{
const product=await productModel.find({VendorId:user._id}).lean()
if(!product.length){
throw new AppError('No products available',404)
}

return product
}