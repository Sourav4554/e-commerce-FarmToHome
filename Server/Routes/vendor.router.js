import express from "express";
import {
  fetchvendorController,
  filterController,
  fetchvendorFiltersController,
  fetchVendorDetailsController
} from "../Controllers/vendor.controller.js";

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

//route for fetch vendor Details for customer
vendorRouter.get(
  '/fetchvendor-details/:id',
  fetchVendorDetailsController
  )
export default vendorRouter;
