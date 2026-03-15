import usermodel from "../Models/usermodel.js";



//service for fetch vendor
export const fetchvendorService=async()=>{
    const vendors=await usermodel.find({role:'vendor'}).select("-password")
    return vendors;
}

//service for filtering customers

export const filterService=async(query)=>{
const {district,panchayth,ward,search}=query
const filter={
role:'vendor'
}
if(district) filter.district=district
if(panchayth) filter.panchayth=panchayth
if(ward)filter.ward=ward
if(search){
filter.name={$regex:search ,$options:'i'}
}
const filteredProducts=await usermodel.find(filter)
return filteredProducts;
}