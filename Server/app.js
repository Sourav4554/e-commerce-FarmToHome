import express from 'express'
import { errorHandler } from './Middlewares/errorHandler.js'
import authRouter from './Routes/auth.router.js'
const app=express()

//json middleware
app.use(express.json())
//authentication endpoint
app.use('/api/v1/auth',authRouter)
//centralized error handler
app.use(errorHandler)
//initial route 
app.get('/',(_,res)=>{
res.end('server sucessfully running')
})





export default app