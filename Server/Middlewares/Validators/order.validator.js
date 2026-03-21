import {body} from 'express-validator'

export const validateOrder = [
    // 📦 address validations
    body("address.name")
      .notEmpty().withMessage("Name is required"),
  
    body("address.phone")
      .notEmpty().withMessage("Phone is required")
      .matches(/^[0-9]{10}$/).withMessage("Invalid phone number"),
  
    body("address.district")
      .notEmpty().withMessage("District is required"),
  
    body("address.panchayath")
      .notEmpty().withMessage("Panchayath is required"),
  
    body("address.ward")
      .notEmpty().withMessage("Ward is required"),
  
    body("address.pincode")
      .notEmpty().withMessage("Pincode is required")
      .matches(/^[0-9]{6}$/).withMessage("Invalid pincode"),
  
    body("address.houseName")
      .notEmpty().withMessage("House name is required"),
  
    body("address.houseNo")
      .notEmpty().withMessage("House number is required"),
  ];