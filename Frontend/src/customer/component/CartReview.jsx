import React, { useContext } from "react";
import CartReviewProduct from "./CartReviewProduct";
import { cartContextProvider } from "../../context/CartContext";

const CartReview = () => {
  const { cartDetail } = useContext(cartContextProvider);
  return (
    <div className="space-y-4 overflow-y-auto max-h-56 pr-3 ">
      {cartDetail && cartDetail.length > 0 ? (
        cartDetail.map((item) => (
          <CartReviewProduct
            key={item?.productId?._id}
            image={item?.productId?.image}
            name={item?.productId?.name}
            category={item?.productId?.category}
            price={item?.productId?.price}
            quantity={item.quantity}
          />
        ))
      ) : (
        <h1>hi</h1>
      )}
    </div>
  );
};

export default CartReview;
