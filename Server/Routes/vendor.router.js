import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js'
import { fetchvendorController,filterController } from '../Controllers/vendor.controller.js'
import { customerroleMiddleware } from '../Middlewares/customerrole.middleware.js'
const vendorRouter=express.Router()

//fetch vendors for admin and customer
vendorRouter.get('/fetch',authMiddleware,fetchvendorController)

//filtering
vendorRouter.get('/filter',authMiddleware,customerroleMiddleware,filterController)
export default vendorRouter