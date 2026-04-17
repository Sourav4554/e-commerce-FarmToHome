import axios from '../api/axios'


export const cashOnDelivery=(address)=>{
return axios.post('/order/cod',{address})
}

export const fetchUserOrder=()=>{
return axios.get('/order/customer-order')
}

export const fetchVendorOrder=()=>{
return axios.get(`/order/vendor-order`)
}

export const razorpayOrder=(address)=>{
return axios.post(`/order/online`,{address})
}

export const razorpayVerify=(response)=>{
return axios.post(`/order/verify-payment`,response)
}