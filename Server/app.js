import express from 'express'
import { errorHandler } from './Middlewares/errorHandler.js'
import authRouter from './Routes/auth.router.js'
import cookieParser from 'cookie-parser'
import userRouter from './Routes/user.router.js'
import vendorRouter from './Routes/vendor.router.js'
import adminRouter from './Routes/admin.router.js'
const app=express()

//json middleware
app.use(express.json())
//cookie parser middlewaer
app.use(cookieParser())
//admin endpoint
app.use('/api/v1/admin',adminRouter)
//vendor endpoint
app.use('/api/v1/vendor',vendorRouter)
//user endpoint
app.use('/api/v1/user',userRouter)
//authentication endpoint
app.use('/api/v1/auth',authRouter)
//centralized error handler
app.use(errorHandler)
//initial route 
app.get('/',(_,res)=>{
res.end('server sucessfully running')
})





export default app