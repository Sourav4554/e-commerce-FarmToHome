import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import {
  fetchvendorController,
  filterController,
  fetchvendorFiltersController
} from "../Controllers/vendor.controller.js";
import { customerroleMiddleware } from "../Middlewares/customerrole.middleware.js";
const vendorRouter = express.Router();

//fetch vendors for admin and customer
vendorRouter.get("/fetch", fetchvendorController);

//fetch filters districts wards and panchayath of vendors
vendorRouter.get('/fetch-filters',fetchvendorFiltersController)

//filtering
vendorRouter.get(
  "/filter",
  filterController
);
export default vendorRouter;
