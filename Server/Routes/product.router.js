import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { vendorRoleMiddleware } from "../Middlewares/vendorrole.middleware.js";
import { addProductController } from "../Controllers/product.controller.js";
import { productValidation } from "../Middlewares/Validators/product.validator.js";
import { validationErrors } from "../Middlewares/Validators/validationerror.js";

const productRouter = express.Router();

productRouter.post(
  "/addproduct",
  productValidation,
  validationErrors,
  authMiddleware,
  vendorRoleMiddleware,
  addProductController
);

export default productRouter;
