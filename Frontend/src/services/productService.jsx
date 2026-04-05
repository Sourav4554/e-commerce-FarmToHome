import axios from "../api/axios";


//api call for signed url
export const fetchSignedUrl=()=>{
return axios.get('/product/signed-url')
}

export const submitProduct=(data)=>{
return axios.post('/product/addproduct',data)
}