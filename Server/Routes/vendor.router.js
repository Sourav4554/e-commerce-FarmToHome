import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js'
import { fetchvendorController } from '../Controllers/vendor.controller.js'

const vendorRouter=express.Router()

//fetch vendors for admin and customer
vendorRouter.get('/fetch',authMiddleware,fetchvendorController)
export default vendorRouter