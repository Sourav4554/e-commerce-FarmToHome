import { createContext, useContext, useEffect, useState } from "react";
import useOrder from "../hooks/orderHook/useOrder";
import { AuthContextProvide } from "./AuthContext";

export const orderContextProvider = createContext(null);

const OrderContext = ({ children }) => {
  const { userInfo } = useContext(AuthContextProvide);
  const [customerOrder, setCustomerOrder] = useState([]);
  const { fetchCustomerOrder,fetchVendorUserOrder,loading} = useOrder();
 
  const fetchOrders = async () => {
    if (!userInfo) return;
    let response;
    if (userInfo && userInfo.role === "customer") {
      response = await fetchCustomerOrder();
    } else {
      response=await fetchVendorUserOrder()
      console.log(response)
    }
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setCustomerOrder(response.order);
  };

  useEffect(() => {
    
    fetchOrders();
  }, [userInfo]);

  const orderData = {
    customerOrder,
    setCustomerOrder,
    loading,
    fetchOrders,
    
  };

  useEffect(() => {
    console.log(customerOrder);
  }, [customerOrder]);

  return (
    <orderContextProvider.Provider value={orderData}>
      {children}
    </orderContextProvider.Provider>
  );
};

export default OrderContext;
