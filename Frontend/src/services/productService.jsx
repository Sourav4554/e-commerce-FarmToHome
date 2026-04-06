import axios from "../api/axios";


//api call for signed url
export const fetchSignedUrl=()=>{
return axios.get('/product/signed-url')
}

//api call product add seller
export const submitProduct=(data)=>{
return axios.post('/product/addproduct',data)
}

//api call for paginated products for customers
export const paginatedProducts=(page)=>{
return axios.get(`/product/fetch-products?limit=12&page=${page}`)
}