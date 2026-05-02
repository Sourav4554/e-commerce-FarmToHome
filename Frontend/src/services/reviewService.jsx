import api from '../api/axios'


//service for add review

export const addReview=(id,review)=>{
return api.post(`/review/add-review/${id}`,review)
}

//service for fetchReviews
export const fetchReview=(id)=>{
return api.get(`/review/fetch-review/${id}`)
}