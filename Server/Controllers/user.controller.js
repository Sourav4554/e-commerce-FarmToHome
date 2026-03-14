import { currentUserService,updateProfileService } from "../Services/user.service.js"

//find user controller
const currentUserController=async(req,res,next)=>{
try {
    const currentUser=await currentUserService(req.user)
    return res.status(200).json({
    message:'user returned',
    data:currentUser,
    success:true
    })
} catch (error) {
    next(error)
}
}

//update user profile
const updateProfileController=async(req,res,next)=>{
try {
    const updatedProfile=await updateProfileService(req.body,req.user)
    return res.status(201).json({
    message:'profile updated',
    data:updatedProfile,
    success:true
    })
} catch (error) {
    next(error)
}
}
export {
currentUserController,
updateProfileController
}