import React, { useContext, useEffect, useState } from "react";
import OrderAddress from "../component/OrderAddress";
import Checkout from "../component/Checkout";
import { cartContextProvider } from "../../context/CartContext";
import toast from "react-hot-toast";
import useOrder from "../../hooks/orderHook/useOrder";
import { useNavigate } from "react-router-dom";
import { orderContextProvider } from "../../context/OrderContext";

export default function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { cartDetail, setCartDetail } = useContext(cartContextProvider);
  const {customerOrder, setCustomerOrder}=useContext(orderContextProvider)
  const navigate = useNavigate();
  const { placeOrder, loading } = useOrder();
  const [orderAddress, setOrderAddress] = useState({
    name: "",
    phone: "",
    district: "",
    panchayath: "",
    ward: "",
    pincode: "",
    houseName: "",
    houseNo: "",
  });

  //method for Order product
  const placeOrderMethod = async () => {
    if (cartDetail.length <= 0) {
      toast("Cart is empty.Please Add Products to Cart");
      return;
    }
    for (let key in orderAddress) {
      if (orderAddress[key].trim()=== "") {
        toast("Please fill the delivery Address Form");
        return;
      }
    }
    if (paymentMethod === "COD") {
      const response = await placeOrder(orderAddress);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      setCustomerOrder((prev) => ([...(prev || []), response.order]));
      navigate("/order", { replace: true });
      setCartDetail([]);
    }
  };
useEffect(()=>{
console.log(orderAddress)
},[orderAddress])
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT SECTION - Checkout Form */}
          <OrderAddress
            orderAddress={orderAddress}
            setOrderAddress={setOrderAddress}
          />
          <Checkout
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            placeOrderMethod={placeOrderMethod}
          />
          {/* RIGHT SECTION - Order Summary */}
        </div>
      </div>
    </div>
  );
}
