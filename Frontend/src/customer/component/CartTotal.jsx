import React, { useContext } from "react";
import { cartContextProvider } from "../../context/CartContext";

const CartTotal = () => {
    const {TotalAmount}=useContext(cartContextProvider)
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div></div>

      {/* Cart Total */}
      <div className="bg-gray-50 p-5 md:p-6 rounded-xl shadow-sm">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-primary">
          Cart Total
        </h2>

        <div className="space-y-3 text-sm md:text-base">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₹{TotalAmount || 0}</p>
          </div>

          <div className="flex justify-between">
            <p>PlatformFee</p>
            <p>₹20</p>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>₹{TotalAmount+20  || 0}</p>
          </div>
        </div>

        <button className="bg-primary w-full mt-5 text-white py-2 rounded-lg hover:bg-green-800 transition cursor-pointer">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
