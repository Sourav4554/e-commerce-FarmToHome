import { useState } from "react";
import {
  acceptVendorRequest,
  blockVendorAccount,
  fetchAllVendorsForAdmin,
  unblockUser
} from "../../services/adminService";

const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  //fetch filtered vendors for admin
  const fetchAllVndors = async (page, status) => {
    try {
      setLoading(true);

      const { data } = await fetchAllVendorsForAdmin(page, status);
      return {
        success: data.success,
        vendors: data.vendors,
        totalPages: data.totalPages,
        page: data.pages,
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

  //const accept pending requests
  const acceptRequest = async (id) => {
    try {
      setLoading(true);
      setButtonLoading(true);
      const { data } = await acceptVendorRequest(id);
      return {
        success: data.success,
        vendor: data.data,
        message: data.message,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  };
  //method for block vendor account
  const blockVendorAc = async (id) => {
    try {
      setLoading(true);
      const { data } = await blockVendorAccount(id);
      return {
        success: data.success,
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
  //method for unblook user
  const unblockMethod = async (id) => {
    try {
      setLoading(true);
      const { data } = await unblockUser(id);
      return {
        success: data.success,
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
  return {
    fetchAllVndors,
    loading,
    acceptRequest,
    buttonLoading,
    blockVendorAc,
    unblockMethod
  };
};

export default useAdmin;
