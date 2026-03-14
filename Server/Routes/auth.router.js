import express from 'express'
import { userRegistration } from "../Controllers/auth.controller.js";
import { authvalidationResult } from '../Middlewares/Validators/auth.validater.js';
import { validationErrors } from '../Middlewares/Validators/validationerror.js';
import { userLogin } from '../Controllers/auth.controller.js';
const authRouter=express.Router()

//user registration
authRouter.post(
'/register',
authvalidationResult,
validationErrors,
userRegistration
)

//user login
authRouter.post(
 '/login',
 userLogin
)

export default authRouter