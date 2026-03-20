import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js';
import { customerroleMiddleware } from '../Middlewares/customerrole.middleware.js';
import { addToCartController ,removeFromCartController,fetchCartController,clearCartController} from '../Controllers/cart.controller.js';

const cartRouter=express.Router();

//router for add to cart
cartRouter.post('/addcart',authMiddleware,customerroleMiddleware,addToCartController)
//route for remove from cart
cartRouter.delete('/removecart',authMiddleware,customerroleMiddleware,removeFromCartController)
//fetch cartdata
cartRouter.get('/fetch',authMiddleware,customerroleMiddleware,fetchCartController)
//clear cart data
cartRouter.delete('/clear',authMiddleware,customerroleMiddleware,clearCartController)
export default cartRouter