import { addProductService,deleteProductService,fetchProductService } from "../Services/product.service.js";



//controller for add product 
const addProductController=async(req,res,next)=>{
try {
    const productAdedd=await addProductService(req.body,req.user)
    res.status(201).json({
    message:'product Successfully adedd',
    data:productAdedd,
    success:true
    })
} catch (error) {
    next(error)
}
}
//control for fetch product
const fetchProductController=async(req,res,next)=>{
try {
    const products=await fetchProductService(req.user)
    res.status(200).json({
    data:products,
    success:true
    })
} catch (error) {
    next(error)
}
}

//controller for delete Product
const deleteProductController=async(req,res,next)=>{
try {
    const deletedProduct=await deleteProductService(req.user,req.params)
    res.status(200).json({
    message:'product deleted',
    data:deletedProduct,
    success:true
    })
} catch (error) {
    next(error)
}
}
export {
    addProductController,
    fetchProductController,
    deleteProductController
}