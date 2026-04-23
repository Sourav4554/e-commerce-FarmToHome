import axios from "../api/axios";

export const fetchAllVendorsForAdmin = (page, status) => {
  return axios.get(`/admin/fetch-vendors`, {
    params: {
      page,
      limit: 6,
      status,
    },
  });
};
