import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js'
import { customerroleMiddleware } from '../Middlewares/customerrole.middleware.js'
import { addReviewController,fetchReviewController } from '../Controllers/review.controller.js'
const reviewRouter=express.Router()

//router for add review
reviewRouter.post('/add-review/:id',authMiddleware,customerroleMiddleware,addReviewController)

//router for fetch review 
reviewRouter.get('/fetch-review/:id',authMiddleware,customerroleMiddleware,fetchReviewController)

export default reviewRouter