import {
  fetchAllFarmers,
  fetchFilters,
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
    console.log('working')
    try {
      setLoading(true);
      const { data } = await fetchAllFarmers(page);
      // console.log(`data inside custoom hook`,data.data.totalPages)
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
  }
    // method for fetch filter details
    const filterDetails=async()=>{
    try {
      setLoading(true)
      const {data}=await fetchFilters()
      return {
        success: data?.success,
        district: data?.district,
        panchayth: data?.panchayth,
        ward:data?.ward,
      };
    } catch (err) {

      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    }finally{
    setLoading(false)
    }
    }
  

  return { fetchNearestFarmers, fetchFarmers,filterDetails, loading };
};

export default useCustomerHook;
