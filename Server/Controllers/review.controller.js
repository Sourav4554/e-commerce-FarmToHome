
import { addReviewService ,fetchReviewService} from "../Services/review.service.js"

//add revire controller
const addReviewController=async(req,res,next)=>{
try {
    const review=await addReviewService(req.body,req.params,req.user)
    return res.status(201).json({
        success:true,
        message:'review adedd',
        review:review
    })
} catch (error) {
    next(error)
}
}

//fetch review controller
const fetchReviewController=async(req,res,next)=>{
try {
    const reviews=await fetchReviewService(req.user,req.params)
    return res.status(200).json({
    success:true,
    reviews:reviews.reviews,
    totalRating:reviews.totalReviewCount,
    average:reviews.averageRating
    })
} catch (error) {
    next(error)
}
}

export {
    addReviewController,
    fetchReviewController
}