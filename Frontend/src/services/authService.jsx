import api from "../api/axios"
//user login
export const loginUser=(data)=>{
return api.post("/auth/login",data)
}