import { useState, useEffect, createContext, useContext, useMemo } from "react";
import useCart from "../hooks/cartHook/useCart";
import { AuthContextProvide } from "./AuthContext";
import toast from "react-hot-toast";

export const cartContextProvider = createContext(null);

const CartContext = ({ children }) => {
  const [cartDetail, setCartDetail] = useState([]);
  const [productIdentity, setProductIdentify] = useState(null);
  const [removeLoad, setRemoveLoad] = useState(null);
  const { fetchCartData, addCart, removeCart, clearCartDataItem } = useCart();
  const { userInfo } = useContext(AuthContextProvide);

  //method for addtocart
  const addToCart = async (productId) => {
    try {
      setProductIdentify(productId);
      const response = await addCart(productId);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      setCartDetail(response.items);
    } finally {
      setProductIdentify(null);
    }
  };

  //method for removetocart
  const removeFromCart = async (productId) => {
    try {
      setProductIdentify(productId);
      const response = await removeCart(productId);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      setCartDetail(response.items);
    } finally {
      setProductIdentify(null);
    }
  };

  //method for clear CartData

  const clearCart = async (productId) => {
    try {
      setRemoveLoad(productId);
      const response = await clearCartDataItem(productId);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      setCartDetail(response.items);
    } finally {
      setRemoveLoad(null);
    }
  };

  useEffect(() => {
    //fetch cartData
    const loadCart = async () => {
      if(!userInfo)return 
      const result = await fetchCartData();
      if (!result.success) {
        console.log(result.message);
        // setCartDetail([])
      }
      setCartDetail(result.items);
    };
    loadCart();
  }, [userInfo]);

  //method for calculating total amount
  const TotalAmount = useMemo(() => {
    if (cartDetail && cartDetail.length > 0) {
      return cartDetail.reduce((total, item) => {
        return (total += item?.productId?.price * item?.quantity);
      }, 0);
    }
  }, [cartDetail]);

  useEffect(() => {
    console.log(cartDetail);
  }, [cartDetail]);

  const cartData = {
    cartDetail,
    setCartDetail,
    addToCart,
    removeFromCart,
    clearCart,
    TotalAmount,
    productIdentity,
    removeLoad,
  };
  return (
    <cartContextProvider.Provider value={cartData}>
      {children}
    </cartContextProvider.Provider>
  );
};

export default CartContext;
