import { useState } from "react";
import { fetchAllVendorsForAdmin } from "../../services/adminService";

const useAdmin=()=>{
const [loading, setLoading] = useState(false);

//const fetch all vendors for admin
 const fetchAllVndors=async(page,status)=>{
   try {
    setLoading(true)
    const {data}=await fetchAllVendorsForAdmin(page,status);
    return {
    success:data.success,
    vendors:data.vendors,
    totalPages:data.totalPages,
    page:data.pages
    }
   } catch (err) {
    console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
   }finally{
    setLoading(false)
}
  }

return {fetchAllVndors,loading}
}


export default useAdmin