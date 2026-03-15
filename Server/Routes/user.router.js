import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { adminroleMiddleware } from "../Middlewares/adminrole.middleware.js";
import {
  currentUserController,
  updateProfileController,
  deleteProfileController,
  fetchCustomerController,
} from "../Controllers/user.controller.js";

const userRouter = express.Router();

//router for current user
userRouter.get("/me", authMiddleware, currentUserController);

//router for update profile
userRouter.patch("/update", authMiddleware, updateProfileController);
//delete user account
userRouter.delete("/delete", authMiddleware, deleteProfileController);
//fetch all customers for admin
userRouter.get(
  "/fetch",
  authMiddleware,
  adminroleMiddleware,
  fetchCustomerController
);
export default userRouter;
