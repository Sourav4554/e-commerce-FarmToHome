import { body } from "express-validator"

export const productValidation=[
    body("name")
    .notEmpty().withMessage("Product name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2-100 characters")
    .trim(),

  // Description
  body("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 5 }).withMessage("Description too short")
    .trim(),

  // Price
  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),

  // Unit
  body("unit")
    .optional()
    .isIn(["kg", "g", "ltr", "ml", "pcs"])
    .withMessage("Invalid unit"),

  // Stock
  body("stock")
    .notEmpty().withMessage("Stock is required")
    .isInt({ min: 0 }).withMessage("Stock must be >= 0"),

  // Category
  body("category")
    .notEmpty().withMessage("Category is required")
    .isLength({ min: 2 }).withMessage("Category too short")
    .trim(),

  // Image (optional but must be valid URL if provided)
  body("image")
    .optional()
    .isURL().withMessage("Image must be a valid URL"),

  // Vendor ID
//   body("VendoreId")
//     .notEmpty().withMessage("Vendor ID is required")
//     .isMongoId().withMessage("Invalid Vendor ID"),

]