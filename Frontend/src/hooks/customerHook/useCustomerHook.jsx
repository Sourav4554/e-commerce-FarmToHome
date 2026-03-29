import { fetchNearbyFarmers } from "../../services/customerService";
import { useState } from "react";

const useCustomerHook =() => {
  const [loading, setLoading] = useState(false);
  //method for fetch nearest farmer
  const fetchNearestFarmers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchNearbyFarmers();
      console.log('data' ,data)
      return { success: data.success, farmers: data.data };
    } catch (err) {
        console.log(err)
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };

  return { fetchNearestFarmers, loading,  };
};

export default useCustomerHook;
