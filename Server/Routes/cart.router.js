import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js';
import { customerroleMiddleware } from '../Middlewares/customerrole.middleware.js';
import { addToCartController } from '../Controllers/cart.controller.js';

const cartRouter=express.Router();

cartRouter.post('/addcart',authMiddleware,customerroleMiddleware,addToCartController)

export default cartRouter