
export const vendorRoleMiddleware=(req,res,next)=>{

    if(req.user.role!=='vendor'){
        res.status(403).json({
            message:'access denied only vendor can acesss',
            succcess:false
            })
        }
    next()
}
