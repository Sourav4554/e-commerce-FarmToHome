import React, { useContext } from "react";
import CartQuantityButton from "./CartQuantityButton";
import { cartContextProvider } from "../../context/CartContext";


const CartSection = () => {
  const { cartDetail, clearCart, removeLoad } =
    useContext(cartContextProvider);
  return (
    <>
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
        Your Cart
      </h1>

      {/* Header (hidden on mobile) */}
      <div className="hidden md:grid grid-cols-7 text-gray-500 font-semibold border-b pb-3 text-center">
        <p>Product</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Action</p>
      </div>

      {/* Item */}

      {cartDetail && cartDetail.length > 0 ? (
        cartDetail.map((item, _) => (
          <div className="border-b py-4" key={item?.productId?._id}>
            {/* Desktop layout */}
            <div className="hidden md:grid grid-cols-7 items-center text-center">
              <img
                src={item?.productId?.image}
                className="w-16 h-16 object-cover rounded-lg mx-auto"
              />
              <p className="font-medium">{item?.productId?.name}</p>
              <p className="text-gray-500">{item?.productId?.category}</p>
              <p className="font-medium">₹{item?.productId?.price}</p>

              <div className="flex justify-center">
                <CartQuantityButton
                  productId={item?.productId?._id}
                  quantity={item?.quantity}
                />
              </div>

              <p className="font-semibold">
                ₹{item?.quantity * item?.productId?.price || 0}
              </p>

              <button
                className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
                disabled={removeLoad}
                onClick={() => clearCart(item?.productId?._id)}
              >
                {removeLoad === item?.productId?._id
                  ? "Removing..."
                  : "Remove"}
              </button>
            </div>
            {/* Mobile layout */}
            <div className="md:hidden flex gap-4">
              <img
                src={item?.productId?.image}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1 space-y-1">
                <p className="font-medium">{item?.productId?.name}</p>
                <p className="text-gray-500">{item?.productId?.category}</p>
                <p className="font-medium">₹{item?.productId?.price}</p>

                <div className="flex items-center justify-between mt-2">
                  <CartQuantityButton
                    productId={item?.productId?._id}
                    // quantity={item?.productId._id}
                  />

                  <p className="font-semibold">
                    ₹{item?.quantity * item?.productId?.price || 0}
                  </p>
                </div>

                <button
                  className="text-red-500 hover:text-red-700  text-sm font-medium cursor-pointer"
                  disabled={removeLoad}
                  onClick={() => clearCart(item?.productId?._id)}
                >
                  {removeLoad === item?.productId?._id
                    ? "Removing..."
                    : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>no data</h1>
      )}
    </>
  );
};

export default CartSection;
