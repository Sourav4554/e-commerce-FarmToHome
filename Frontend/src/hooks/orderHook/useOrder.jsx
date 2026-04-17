import { useState } from "react";
import {
  cashOnDelivery,
  fetchUserOrder,
  fetchVendorOrder,
  razorpayOrder,
  razorpayVerify,
} from "../../services/orderService";

const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [buttonLoad,setButtonLoad]=useState(false)
  //method for place order
  const placeOrder = async (address) => {
    try {
    setButtonLoad(true);
      const { data } = await cashOnDelivery(address);
      return {
        success: data.success,
        order: data.data,
        message: data.message,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setButtonLoad(false);
    }
  };
  //method for fetch customer order
  const fetchCustomerOrder = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUserOrder();
      return {
        success: data.success,
        order: data.order,
        message: data.message,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };

  //method for fetch vendor Order
  const fetchVendorUserOrder = async () => {
    try {
      setLoading(true);
      const { data } = await fetchVendorOrder();
      return {
        success: data.success,
        order: data?.data,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };
  //method for razorpay order
  const onlinePayment = async(address) => {
    try {
      setButtonLoad(true);
      const {data}=await razorpayOrder(address)
      return {
      success:data.success,
      order:data.order
      }
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setButtonLoad(false);
    }
  };

    //verify razorpay payment
  const verifyRazorpayPayment=async(response)=>{
    try {
      setLoading(true)
      const {data}=await razorpayVerify(response)
      return {
      success:data.success,
      message:data.message
      }
    } catch (err) {
      const message =
      err?.response?.data?.message || "Something wromg try again later";
    return { success: false, message: message };
    }finally{
    setLoading(false)
    }
    }
  return {
    loading,
    buttonLoad,
    placeOrder,
    fetchCustomerOrder,
    fetchVendorUserOrder,
    onlinePayment,
    verifyRazorpayPayment
  };
};

export default useOrder;
