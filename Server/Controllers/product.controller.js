
import {
  addProductService,
  deleteProductService,
  fetchProductService,
  updateProductService,
  createSignedUrlService,
  searchProductService,
  ProductsForCustomerService,
  fetchSingleProductDetailsService,
  productCountService,
  fetchFarmerProductService
} from "../Services/product.service.js";

//controller for add product
const addProductController = async (req, res, next) => {
  try {
    const productAdedd = await addProductService(req.body, req.user);
    res.status(201).json({
      message: "product Successfully adedd",
      data: productAdedd,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
//control for fetch product
const fetchProductController = async (req, res, next) => {
  try {
    const products = await fetchProductService(req.user);
    res.status(200).json({
      data: products,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//controller for delete Product
const deleteProductController = async (req, res, next) => {
  try {
    const deletedProduct = await deleteProductService(req.user, req.params);
    res.status(200).json({
      message: "product deleted",
      data: deletedProduct,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
//controller for update product
const updateProductController = async (req, res, next) => {
  try {
    const updatedProduct = await updateProductService(
      req.body,
      req.user,
      req.params
    );
    res.status(200).json({
      message: "product updated",
      data: updatedProduct,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
//controller for search product
const searchProductController = async (req, res, next) => {
  try {
    const searchResult = await searchProductService(req.query, req.params);
    res.status(200).json({
      data: searchResult,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//controller for create SignedUrl
const createSignedUrlController = (req, res, next) => {
  try {
    const url = createSignedUrlService();
    return res.status(201).json(
        {
          success: true, 
          timestamp:url.timestamp,
          signature: url.signature,
          apikey:process.env.CLOUDINARY_API_KEY,
          cloudName:process.env.CLOUD_NAME,
          folder:'Farm2Home'
         }
        );
  } catch (error) {
    next(error);
  }
};

//fetch all products for customer controller
const ProductsForCustomerController=async(req,res,next)=>{
try {
  const paginatedProducts=await ProductsForCustomerService(req.query);
  return res.status(200).json({
  success:true,
  products:paginatedProducts.products || [],
  pages:paginatedProducts.page ,
  totalPages:paginatedProducts.totalPages,
  })
} catch (error) {
  next(error)
}
}
//fetch details of a single product 

const fetchSingleProductDetailsController=async(req,res,next)=>{
try {
  const productDetails=await fetchSingleProductDetailsService(req.params);
  return res.status(200).json({
  success:true,
  product:productDetails,
  })
} catch (error) {
  next(error)
}
}

//count product controller
const productCountController=async(req,res,next)=>{
try {
  const productCount=await productCountService(req.user)
  return res.status(200).json({
  success:true,
  total:productCount.total,
  stock:productCount.inStock,
  outOfStock:productCount.outStock,
  })
  
} catch (error) {
  next(error)
}
}
//controller for fetch product based on farmer
const fetchFarmerProductController=async(req,res,next)=>{
try {
  const products=await fetchFarmerProductService(req.params)
  return res.status(200).json({
  success:true,
  products:products
  })
} catch (error) {
  next(error)
}
}

export {
  addProductController,
  fetchProductController,
  deleteProductController,
  updateProductController,
  searchProductController,
  createSignedUrlController,
  ProductsForCustomerController,
  fetchSingleProductDetailsController,
  productCountController,
  fetchFarmerProductController
};
