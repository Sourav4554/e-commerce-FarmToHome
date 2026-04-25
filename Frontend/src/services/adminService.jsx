
import api from "../api/axios";

export const fetchAllUsersForAdmin = (page, status,role) => {
  return api.get(`/admin/fetch-vendors`, {
    params: {
      page,
      limit: 5,
      status,
      role
    },
  });
};

export const acceptVendorRequest=(id)=>{
return api.patch(`/admin/approve-request/${id}`)
}

export const blockVendorAccount=(id)=>{
return api.patch(`/admin/disable-account/${id}`)
}

export const unblockUser=(id)=>{
return api.patch(`/admin/unblock-customer/${id}`)
}