import {
  fetchAllFarmers,
  fetchNearbyFarmers,
} from "../../services/customerService";
import { useState } from "react";

const useCustomerHook = () => {
  const [loading, setLoading] = useState(false);
  //method for fetch nearest farmer
  const fetchNearestFarmers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchNearbyFarmers();
      return { success: data.success, farmers: data.data };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };
  //method for paginate farmers
  const fetchFarmers = async (page) => {
    try {
      setLoading(true);
      const { data } = await fetchAllFarmers(page);
      console.log(`data inside custoom hook`,data.data.totalPages)
      return {
        success: data?.success,
        farmers: data?.data?.vendors,
        page: data?.data?.page,
        totalPages:data?.data?.totalPages,
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

  return { fetchNearestFarmers, fetchFarmers, loading };
};

export default useCustomerHook;
