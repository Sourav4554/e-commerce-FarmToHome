
export const adminroleMiddleware=(req,res,next)=>{
if(req.user.role!=='admin'){
 res.status(403).json({
 message:'access denied only admin can change',
 succcess:false
 })
}
next()
}