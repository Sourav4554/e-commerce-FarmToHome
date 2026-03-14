
import jwt from 'jsonwebtoken'
import AppError from '../Utilities/AppError.js'
import usermodel from '../Models/usermodel.js'
export const authMiddleware=async (req,res,next)=>{
  try {
   const {token}=req.cookies
   if(!token){
   throw new AppError('Access denined Unautharized',401)
   }
   const tokenDecode=jwt.verify(token,process.env.JWTSECRET)
   const user=await usermodel.findById(tokenDecode.userId)
   if(!user){
   throw new AppError('User not found',404)
   }
   req.user=user;
   next()
  } catch (error) {
   next(error)
  }
}