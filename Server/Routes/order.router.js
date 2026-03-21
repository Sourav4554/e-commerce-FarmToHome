import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js';
import { customerroleMiddleware } from '../Middlewares/customerrole.middleware.js';
import { codOrderController,fetchCustomerOrdersController } from '../Controllers/order.controller.js';
import { validateOrder } from '../Middlewares/Validators/order.validator.js';
import { validationErrors } from '../Middlewares/Validators/validationerror.js';
const orderRouter=express.Router();

//route for cod
orderRouter.post('/cod',validateOrder,validationErrors,authMiddleware,customerroleMiddleware,codOrderController)

//route for fetch customer orders
orderRouter.get('/fetch',authMiddleware,customerroleMiddleware,fetchCustomerOrdersController)
export default orderRouter