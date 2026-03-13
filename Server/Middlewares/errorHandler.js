
export const errorHandler=(err,req,res,next)=>{
    const statuscode=err.statuscode || 500
    return res.status(statuscode).json({
    success:false,
    message:err.message || 'server error'
    })
}