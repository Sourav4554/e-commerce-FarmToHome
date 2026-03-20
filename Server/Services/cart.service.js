import { cartModel } from "../Models/cart.Model.js";
import { productModel } from "../Models/product.model.js";
import AppError from "../Utilities/AppError.js";

//service for add to Cart
export const addToCartService = async (user, body) => {
  const { productId } = body;
  if (!productId) {
    throw new AppError("product id not found", 400);
  }
  //fetch product

  const product = await productModel
    .findById({ _id: productId })
    .select("VendorId stock");
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  //fetch cart for stock checking
  const cart = await cartModel.findOne({
    customerId: user._id,
    "items.productId": productId,
  });
  if (cart) {
    const cartproduct = cart.items.find((p) => p.productId === productId);

    let existingQuatinty = cartproduct.quantity;

    if (existingQuatinty + 1 > product.stock) {
      throw new AppError("Out of stock", 400);
    }
  } else {
    if (product.stock < 1) {
      throw new AppError("Out of stock", 400);
    }
  }

  //update quantity if item already in cart
  const result = await cartModel.updateOne(
    { customerId: user._id, "items.productId": productId },
    {
      $inc: { "items.$.quantity": 1 },
    }
  );

  //add new product to cart if not exist
  if (result.matchedCount === 0) {
    await cartModel.updateOne(
      { customerId: user._id },
      {
        $push: {
          items: {
            productId,
            vendorId: product.VendorId.toString(),
            quantity: 1,
          },
        },
      },
      { upsert: true }
    );
  }

  const updatedCart = await cartModel
    .findOne({
      customerId: user._id,
    })
    .lean();

  return updatedCart;
};

//service for remove from cart
export const removeFromCartService = async (user, body) => {
  const { productId } = body;
  if (!productId) {
    throw new AppError("product id not found", 400);
  }

  const result = await cartModel.updateOne(
    {
      customerId: user._id,
      "items.productId": productId,
      "items.quantity": { $gt: 1 },
    },
    {
      $inc: { "items.$.quantity": -1 },
    }
  );
  if (result.modifiedCount === 0) {
    const exist = await cartModel.exists({
      customerId: user._id,
      "items.productId": productId,
    });
    if (!exist) {
      throw new AppError("Cart item not found", 404);
    }
    await cartModel.updateOne(
      {
        customerId: user._id,
      },
      {
        $pull: { items: { productId: productId } },
      }
    );
  }
  return cartModel
    .findOne({
      customerId: user._id,
    })
    .lean();
};

//service for fetch cart data
export const fetchCartService = async (user) => {
  const result = await cartModel.findOne({ customerId: user._id }).lean();
  if (!result) {
    throw new AppError("No cartdata available", 404);
  }
  return result;
};

//service for clear cartData
export const clearCartService = async (user) => {
 const result= await cartModel.updateOne(
    {
      customerId: user._id,
    },
    { $set: { items: [] } }
  );
 
};
