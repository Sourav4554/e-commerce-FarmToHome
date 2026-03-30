import api from "../api/axios";

export const fetchNearbyFarmers = () => {
  return api.get("/user/fetch-vendor");
};

export const fetchAllFarmers = (page) => {
  return api.get(`/vendor/fetch?limit=8&page=${page}`);
};
