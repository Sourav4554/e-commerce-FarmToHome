import usermodel from "../Models/usermodel.js"
import AppError from "../Utilities/AppError.js"


//service for fetching current user
export const currentUserService=async(user)=>{
const newUser=await usermodel.findById(user._id).select("-password")
if(!newUser){
throw new AppError('user not found',404)
}
return newUser.toObject()
}