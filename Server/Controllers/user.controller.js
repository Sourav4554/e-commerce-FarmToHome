import { currentUserService } from "../Services/user.service.js"

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

export {
currentUserController
}