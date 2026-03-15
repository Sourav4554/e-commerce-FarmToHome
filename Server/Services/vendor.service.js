import usermodel from "../Models/usermodel.js";



//service for fetch vendor
export const fetchvendorService=async()=>{
    const vendors=await usermodel.find({role:'vendor'}).select("-password")
    return vendors;
}