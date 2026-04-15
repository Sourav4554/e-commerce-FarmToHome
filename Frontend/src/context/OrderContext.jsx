import { createContext, useContext, useEffect, useState } from "react";
import useOrder from "../hooks/orderHook/useOrder";
import { AuthContextProvide } from "./AuthContext";

export const orderContextProvider = createContext(null);

const OrderContext = ({ children }) => {
  const { userInfo } = useContext(AuthContextProvide);
  const [customerOrder, setCustomerOrder] = useState([]);
  const { fetchCustomerOrder,fetchVendorUserOrder} = useOrder();
  const orderData = {
    customerOrder,
    setCustomerOrder,
  };
  useEffect(() => {
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
    fetchOrders();
  }, [userInfo]);

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
