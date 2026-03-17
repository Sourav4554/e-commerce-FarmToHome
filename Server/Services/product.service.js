import { productModel } from "../Models/product.model.js"
import usermodel from "../Models/usermodel.js"
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
image
}=body
const checkApproval=await usermodel.findById(user._id).select('isapproved -_id')
if(!checkApproval.isapproved){
throw new AppError('Admin not yet accept your request',400)
}
const product=await productModel.create({
name,
description,
price,
unit,
stock,
category,
image
})
if(!product){
throw new AppError('product not adedd',400)
}
return product.toObject()
}