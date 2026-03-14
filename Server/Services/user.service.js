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

//service for update user
export const updateProfileService=async(body,user)=>{
    const {
        name,         
        phone,
        whatsapp,
        district,
        panchayth,
        ward,
      } = body;
      if(!phone || !whatsapp ||  !district || !panchayth || !ward ||!name){
        throw new AppError('Fill all fields',400)
       }
    const newUser=await usermodel.findById(user._id).select("-password")
    if(!newUser){
        throw new AppError('user not found',404)
    }
    newUser.name=name
    newUser.phone=phone
    newUser.whatsapp=whatsapp
    newUser.district=district
    newUser.panchayth=panchayth
    newUser.ward=ward
    const updatedUser=await newUser.save()
    return updatedUser.toObject()
}