import { cloudinary } from "../Config/cloudinary.config.js";
import { productModel } from "../Models/product.model.js";
import AppError from "../Utilities/AppError.js";

//service for add product
export const addProductService = async (body, user) => {
  const { name, description, price, unit, stock, category, image } = body;
  const product = await productModel.create({
    name,
    description,
    price,
    unit,
    stock,
    category,
    image,
    VendorId: user._id,
  });
  return product.toObject();
};

//service for fetch Product
export const fetchProductService = async (user) => {
  const product = await productModel
    .find({ VendorId: user._id, isDelete: false })
    .sort({ createdAt: -1 })
    .lean();
  if (!product.length) {
    throw new AppError("No products available", 404);
  }

  return product;
};

//service for delete product
export const deleteProductService = async (user, params) => {
  const product = await productModel.findById({ _id: params.id });
  if (product.VendorId.toString() !== user._id.toString()) {
    throw new AppError("access denied", 403);
  }
  product.isDelete = true;
  const updatedProduct = await product.save();
  return updatedProduct;
};

//service for update product
export const updateProductService = async (body, user, params) => {
  const product = await productModel.findById({ _id: params.id });
  if (product.VendorId.toString() !== user._id.toString()) {
    throw new AppError("access denied", 403);
  }
  const updatedProduct = await productModel.findByIdAndUpdate(params.id, body, {
    returnDocument: "after",
  });
  if (!updatedProduct) {
    throw new AppError("Update failed", 400);
  }
  return updatedProduct.toObject();
};

//service for search product
export const searchProductService = async (query, params) => {
  const filter = {};
  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
    filter.VendorId = params.id;
  }
  if (Object.values(filter).length === 0) {
    return [];
  }
  const searchProduct = await productModel.find(filter).lean();
  return searchProduct;
};

//service for signed url
export const createSignedUrlService = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  const params = {
    timestamp,
    folder: "Farm2Home",
  };
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );
  return { signature, timestamp };
};

//service for fetch paginated products for customer

export const ProductsForCustomerService = async (query) => {
  const limit = query.limit || 12;
  const page = Number(query.page) || 1;
  if (!limit || !page) {
    throw new AppError("query not provided", 401);
  }
  const skip = (page - 1) * limit;
  const totalPages = await productModel.countDocuments();
  const products = await productModel
    .find({isDelete:false})
    .limit(limit)
    .skip(skip)
    .sort({ createAt: -1 })
    .populate("VendorId");

  return { products, page, totalPages: Math.ceil(totalPages / limit) };
};

//service for find products details
export const fetchSingleProductDetailsService = async (params) => {
  const { id } = params;
  if (!id) {
    throw new AppError("id required", 401);
  }
  const productDetail = await productModel.findById(id).populate("VendorId");
  if (!productDetail) {
    throw new AppError("no product ", 404);
  }
  return productDetail;
};

//services for product count
export const productCountService = async (user) => {
  const [total, inStock, outStock] = await Promise.all([
    productModel.countDocuments({ isDelete: false, VendorId: user._id }),
    productModel.countDocuments({
      stock: { $gt: 0 },
      isDelete: false,
      VendorId: user._id,
    }),
    productModel.countDocuments({
      stock: { $eq: 0 },
      isDelete: false,
      VendorId: user._id,
    }),
  ]);

  return { total, inStock, outStock };
};
