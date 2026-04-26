import { useState } from "react";
import {
  acceptVendorRequest,
  blockVendorAccount,
  fetchAdminOrders,
  fetchAllUsersForAdmin,
  unblockUser,
} from "../../services/adminService";

const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  //fetch filtered vendors for admin
  const fetchUsers = async (page, status, role) => {
    try {
      setLoading(true);

      const { data } = await fetchAllUsersForAdmin(page, status, role);
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

  //method for fetch admin orders
  const fetchAOrders = async (page) => {
    try {
      setLoading(true);
      const { data } = await fetchAdminOrders(page);
      return {
      success:data.success,
      page:data.page,
      totalPages:data.totalPages,
      orders:data.orders
      }
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
    fetchUsers,
    loading,
    acceptRequest,
    buttonLoading,
    blockVendorAc,
    unblockMethod,
    fetchAOrders
  };
};

export default useAdmin;
