import { useState } from "react";
import { cashOnDelivery, fetchUserOrder,fetchVendorOrder } from "../../services/orderService";

const useOrder = () => {
  const [loading, setLoading] = useState(false);
  //method for place order
  const placeOrder = async (address) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };
  //method for fetch customer order
  const fetchCustomerOrder = async () => {
    try {
        setLoading(true)
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
  const fetchVendorUserOrder=async()=>{
  try {
    setLoading(true)
    const {data}= await fetchVendorOrder()
    return {
    success:data.success,
    order:data?.data
    }
  } catch (err) {
    console.log(err);
    const message =
      err?.response?.data?.message || "Something wromg try again later";
    return { success: false, message: message };
  }
  finally{
  setLoading(false)
  }}
  return { loading, placeOrder ,fetchCustomerOrder,fetchVendorUserOrder};
};

export default useOrder;
