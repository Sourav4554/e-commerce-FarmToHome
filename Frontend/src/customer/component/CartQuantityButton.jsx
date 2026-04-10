import React, { useContext } from "react";
import { cartContextProvider } from "../../context/CartContext";


const CartQuantityButton = ({ productId }) => {
  const { cartDetail, addToCart,productIdentity,removeFromCart} = useContext(cartContextProvider);
  let item;
  if (cartDetail && cartDetail.length > 0) {
    item = cartDetail.find((cart) => cart.productId._id === productId);
  }
  const quantity = item?.quantity || 0;
  return (
    <div className="flex items-center border border-green-400 rounded-md overflow-hidden w-fit">
      <button className="px-4 py-1 bg-green-200 hover:bg-gray-300 text-lg"
      disabled={productIdentity}
      onClick={()=>removeFromCart(productId)}
      >
        -
      </button>

      <span className="px-4 py-1 text-base font-medium">{productIdentity===productId?'...':quantity}</span>

      <button
        className="px-4 py-1 bg-green-200 hover:bg-gray-300 text-lg"
        onClick={() => addToCart( productId )}
        disabled={productIdentity}
      >
        +
      </button>
    </div>
  );
};

export default CartQuantityButton;
