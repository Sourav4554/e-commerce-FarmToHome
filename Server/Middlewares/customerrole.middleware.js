
export const customerroleMiddleware=(req,res,next)=>{
    if(req.user.role!=='customer'){
     res.status(403).json({
     message:'access denied only customer can acess',
     succcess:false
     })
    }
    next()
    }