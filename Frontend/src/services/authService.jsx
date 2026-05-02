import api from "../api/axios"
//user login
export const loginUser=(data)=>{
return api.post("/auth/login",data)
}

//user registration
export const registration=(data)=>{
return api.post("/auth/register",data)
}

//user logout

export const userLogOut=()=>{
return api.post('/auth/logout')
}

//profileCompletion
export const profileCompletion=(data)=>{
return api.patch('/auth/completeprofile',data)
}

//update profile
export const updateProfile=(data)=>{
  
return api.patch(`/auth/update-profile`,data)
}