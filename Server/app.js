import express from 'express'
import { errorHandler } from './Middlewares/errorHandler.js'
import AppError from './Utilities/AppError.js' 
const app=express()

//json middleware
app.use(express.json())

//centralized error handler
app.use(errorHandler)
//initial route 
app.get('/',(_,res)=>{
res.end('server sucessfully running')
})





export default app