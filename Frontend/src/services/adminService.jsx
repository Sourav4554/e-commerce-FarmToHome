import api from "../api/axios";

export const fetchAllVendorsForAdmin = (page, status) => {
  return api.get(`/admin/fetch-vendors`, {
    params: {
      page,
      limit: 5,
      status,
    },
  });
};

export const acceptVendorRequest=(id)=>{
return axios.patch(`/admin/approve-request/${id}`)
}