import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { vendorRoleMiddleware } from "../Middlewares/vendorrole.middleware.js";
import { addProductController, deleteProductController, fetchProductController,updateProductController,searchProductController } from "../Controllers/product.controller.js";
import { productValidation } from "../Middlewares/Validators/product.validator.js";
import { validationErrors } from "../Middlewares/Validators/validationerror.js";
import { vendorApproveMiddleware } from "../Middlewares/vendorApprove.middleware.js";
import { customerroleMiddleware } from "../Middlewares/customerrole.middleware.js";

const productRouter = express.Router();

//add product route
productRouter.post(
  "/addproduct",
  productValidation,
  validationErrors,
  authMiddleware,
  vendorRoleMiddleware,
  vendorApproveMiddleware,
  addProductController
);

//fetch product route
productRouter.get(
    '/fetch-product',
    authMiddleware,
    vendorRoleMiddleware,
    vendorApproveMiddleware,
    fetchProductController
    )
//delete product route
productRouter.patch(
    '/delete-product/:id',
    authMiddleware,
    vendorRoleMiddleware,
    vendorApproveMiddleware,
    deleteProductController
    )
//update product route
productRouter.patch(
  '/update-product/:id',
  productValidation,
  validationErrors,
  authMiddleware,
  vendorRoleMiddleware,
  vendorApproveMiddleware,
  updateProductController
  )
//search product Route
productRouter.get(
  '/search-product/:id',
  authMiddleware,
  customerroleMiddleware,
  searchProductController
  )

export default productRouter;
