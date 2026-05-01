import React, { useContext } from "react";
import CartSection from "../component/CartSection";
import CartTotal from "../component/CartTotal";
import { cartContextProvider } from "../../context/CartContext";
import EmptyCart from "../../components/EmptyCart";
const Cart = () => {
const {cartDetail}=useContext(cartContextProvider)
console.log(cartDetail.length<=0?'render empty':'render cart')
  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-6 flex justify-center">
      {
      cartDetail && cartDetail.length<=0?(
        <EmptyCart/>
        ):(
          <div className="w-full max-w-6xl rounded-2xl p-4 md:p-6 shadow-md bg-white">
          <CartSection />
          <CartTotal />
        </div>
          )
      
      }
     
    </div>
  );
};

export default Cart;
