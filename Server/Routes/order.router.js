import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js';
import { customerroleMiddleware } from '../Middlewares/customerrole.middleware.js';
import { codOrderController } from '../Controllers/order.controller.js';
const orderRouter=express.Router();

//route for cod
orderRouter.post('/cod',authMiddleware,customerroleMiddleware,codOrderController)


export default orderRouter