import { createContext, useContext, useEffect, useState } from "react";
import { productCustomHook } from "../hooks/productHook/productHook";
import { AuthContextProvide } from "./AuthContext";
export const ProductContextProvide = createContext();

const ProductContext = ({ children }) => {
  const [storeProducts, setStoreProducts] = useState([]);
  const [total,setTotal]=useState('')
  const [stock,setStock]=useState('')
  const [outStock,setOutstock]=useState('')
  const { fetchVendorProducts,productStockCount } = productCustomHook();
 const {userInfo}=useContext(AuthContextProvide)
  //method for fetch Products
  const fetchProducts = async () => {
    const response = await fetchVendorProducts();
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setStoreProducts(response.product);
  };
   //method for fetch Products
   const productCount = async () => {
    const response = await productStockCount();
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setStock(response.stock)
    setOutstock(response.outOfStock)
    setTotal(response.total)
  };
 

  useEffect(() => {
    fetchProducts();
    productCount();
  }, [userInfo]);

  useEffect(()=>{
    console.log(stock,outStock,total)
},[stock,outStock,total])

  const productDetails = {
    storeProducts,
    setStoreProducts,
    fetchProducts,
    stock,
    outStock,
    total,
    productCount
  };
  return (
    <ProductContextProvide.Provider value={productDetails}>
      {children}
    </ProductContextProvide.Provider>
  );
};

export default ProductContext;
