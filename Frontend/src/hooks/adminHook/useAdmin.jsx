import { useState } from "react";
import {
  acceptVendorRequest,
  blockVendorAccount,
  fetchAdminOrders,
  fetchAllUsersForAdmin,
  fetchProducts,
  unblockUser,
  updateStatus,
  deleteProduct,
  fetchDashBoardDetails,
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
        success: data.success,
        page: data.page,
        totalPages: data.totalPages,
        orders: data.orders,
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

  //method for update order status
  const updateOrderStatuss = async (id, status) => {
    try {
      const { data } = await updateStatus(id, status);
      return {
        success: data.success,
        message: data.message,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
    }
  };

  //method for fetch all products for admin
  const fetchAdminProducts = async (page) => {
    try {
      setLoading(true);
      const { data } = await fetchProducts(page);
      return {
        success: data.success,
        page: data.page,
        totalPages: data.totalPages,
        products: data.products,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };
  //delete product method
  const deleteWrongProduct = async (id) => {
    try {
      const { data } = await deleteProduct(id);
      return {
        success: data.success,
        message: data.message,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    }
  };
  //method for fetch dashbaord
  const fetchDashboard = async () => {
    try {
      const { data } = await fetchDashBoardDetails();
      return {
        success: data.success,
        message: data.message,
        stats:data.stats
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    }
  };
  return {
    fetchUsers,
    loading,
    acceptRequest,
    buttonLoading,
    blockVendorAc,
    unblockMethod,
    fetchAOrders,
    updateOrderStatuss,
    fetchAdminProducts,
    deleteWrongProduct,
    fetchDashboard,
  };
};

export default useAdmin;
