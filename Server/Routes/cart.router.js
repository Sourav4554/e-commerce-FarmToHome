import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js';
import { customerroleMiddleware } from '../Middlewares/customerrole.middleware.js';
import { addToCartController ,removeFromCartController} from '../Controllers/cart.controller.js';

const cartRouter=express.Router();

//router for add to cart
cartRouter.post('/addcart',authMiddleware,customerroleMiddleware,addToCartController)
//route for remove from cart
cartRouter.post('/removecart',authMiddleware,customerroleMiddleware,removeFromCartController)
export default cartRouter