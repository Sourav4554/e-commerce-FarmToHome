import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js'
import { currentUserController } from '../Controllers/user.controller.js'

const userRouter=express.Router()

//router for current user 
userRouter.get('/me',
authMiddleware,
currentUserController
)

export default userRouter