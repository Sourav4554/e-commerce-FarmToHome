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

//api call for fetch product detailss
export const fetchProductDetails=(id)=>{
return axios.get(`/product/product-display/${id}`)
}

//api call for list vendor products 
export const listVendorProducts=()=>{
return axios.get(`/product/fetch-product`)
}

//api call for delete product
export const deleteProduct=(id)=>{
return axios.delete(`/product/delete-product/${id}`)
}

//api call for update product
export const updateProduct=(id,product)=>{
return axios.patch(`/product/update-product/${id}`,product)
}