import express from 'express'
import cors from 'cors'
import { errorHandler } from './Middlewares/errorHandler.js'
import authRouter from './Routes/auth.router.js'
import cookieParser from 'cookie-parser'
import userRouter from './Routes/user.router.js'
import vendorRouter from './Routes/vendor.router.js'
import adminRouter from './Routes/admin.router.js'
import productRouter from './Routes/product.router.js'
import cartRouter from './Routes/cart.router.js'
import orderRouter from './Routes/order.router.js'
const app=express()

//json middleware
app.use(express.json())
//cookie parser middlewaer
app.use(cookieParser())
//cors
app.use(cors({
origin:'http://localhost:5173',
credentials: true
}))
//order endpoint
app.use('/api/v1/order',orderRouter)
//cart endpoint
app.use('/api/v1/cart',cartRouter)
//product endpoint
app.use('/api/v1/product',productRouter)
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