import {
  addProductToCart,
  clearCartItem,
  fetchCart,
  removeProductFromCart,
} from "../../services/cartService";
import { useState } from "react";
const useCart = () => {
  const [loading, setLoading] = useState(false);
  //function for fetch cartData
  const fetchCartData = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCart();
      return {
        success: data.success,
        items: data?.data?.items,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };
  //method for addTocart
  const addCart = async (productId) => {
    try {
      const { data } = await addProductToCart(productId);
      return {
        success: data.success,
        items: data?.data?.items,
        message: data.message,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    }
  };
  //method for remove from cart
  const removeCart = async (productId) => {
    try {
      const { data } = await removeProductFromCart(productId);
      return {
        success: data.success,
        items: data?.data?.items,
        message: data.message,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    }
  };
  //method for clear cart item
  const clearCartDataItem = async (productId) => {
    try {
      const { data } = await clearCartItem(productId);
      return {
        success: data.success,
        message: data.message,
        items: data?.data?.items,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    }
  };
  return { fetchCartData, addCart, removeCart, clearCartDataItem, loading };
};

export default useCart;
