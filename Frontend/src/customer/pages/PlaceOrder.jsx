import React, { useContext, useEffect, useState } from "react";

import OrderAddress from "../component/OrderAddress";
import Checkout from "../component/Checkout";
import { cartContextProvider } from "../../context/CartContext";
import toast from "react-hot-toast";
import useOrder from "../../hooks/orderHook/useOrder";
import { useNavigate } from "react-router-dom";
import { orderContextProvider } from "../../context/OrderContext";
import Loader from "../../components/Loader";

export default function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { cartDetail, setCartDetail } = useContext(cartContextProvider);
  const { setCustomerOrder, fetchOrders } = useContext(orderContextProvider);
  const navigate = useNavigate();
  const {
    placeOrder,
    onlinePayment,
    verifyRazorpayPayment,
    loading,
    buttonLoad,
    cancelRazorpayPayment,
  } = useOrder();
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

  //verifying razorpay payment
  const verifyPayment = async (res) => {
    const response = await verifyRazorpayPayment(res);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    await fetchOrders();
    //setCustomerOrder((prev) => ([...(prev || []), response.order]));
    navigate("/order", { replace: true });
    setCartDetail([]);
    return;
  };

  //cancell razorpay payment
  const cancelPayment = async (res) => {
    const response = await cancelRazorpayPayment(res);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    await fetchOrders();
    navigate("/placeorder", { replace: true });
    return;
  };

  //handling payment of razorpay
  const handlingPayment = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Farm2Home",
      description: "order payment",
      order_id: order.id,
      handler: async (response) => {
        await verifyPayment(response);
      },
      modal: {
        ondismiss: () => {
          toast.error(`payment incompleted`);
        },
      },
      theme: {
        color: "#22c55e",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", async (response) => {
      await cancelPayment(response?.error?.metadata.order_id);
    });
    razorpay.open();
  };


  

  //method for Order product
  const placeOrderMethod = async () => {
    if (cartDetail.length <= 0) {
      toast("Cart is empty.Please Add Products to Cart");
      return;
    }
    for (let key in orderAddress) {
      if (orderAddress[key].trim() === "") {
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
      setCustomerOrder((prev) => [...(prev || []), response.order]);
      await fetchOrders();
      navigate("/order", { replace: true });
      setCartDetail([]);
      return;
    } else {
      const response = await onlinePayment(orderAddress);
      if (!response.success) {
        console.log(response.message);
        return;
      }
      handlingPayment(response.order);
    }
  };
  useEffect(() => {
    console.log(orderAddress);
  }, [orderAddress]);

  if (loading) {
    return <Loader />;
  }
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
            loading={buttonLoad}
          />
          {/* RIGHT SECTION - Order Summary */}
        </div>
      </div>
    </div>
  );
}
