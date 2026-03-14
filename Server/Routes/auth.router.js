import express from "express";
import passport from "../Config/passport.config.js";
import {
  googleAuthController,
  userRegistration,
  userLogin,
  completeProfileController,
} from "../Controllers/auth.controller.js";
import { authvalidationResult } from "../Middlewares/Validators/auth.validater.js";
import { validationErrors } from "../Middlewares/Validators/validationerror.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const authRouter = express.Router();

//user registration
authRouter.post(
  "/register",
  authvalidationResult,
  validationErrors,
  userRegistration
);

//user login
authRouter.post("/login", userLogin);

//google authentication
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//google authentication callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthController
);

//profile completion after googleauth
authRouter.patch("/completeprofile", authMiddleware, completeProfileController);
export default authRouter;
