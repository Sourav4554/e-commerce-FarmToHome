import React from "react";
import CartSection from "../component/CartSection";
import CartTotal from "../component/CartTotal";

const Cart = () => {
  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-6 flex justify-center">
      <div className="w-full max-w-6xl rounded-2xl p-4 md:p-6 shadow-md bg-white">
        <CartSection />
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;
