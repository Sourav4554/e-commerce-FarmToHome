import axios from "../api/axios";
//function to fetch cartData
export const fetchCart = () => {
  return axios.get("/cart/fetch");
};

//function for addToCArt
export const addProductToCart = (productId) => {
  return axios.post("/cart/addcart", { productId });
};

//function for removeFrom Cart
export const removeProductFromCart = (productId) => {
  return axios.delete("/cart/removecart", { data: { productId } });
};

//function for clear cartItem
export const clearCartItem=(productId)=>{
  return axios.delete('/cart/clear',{data:{productId}})
}