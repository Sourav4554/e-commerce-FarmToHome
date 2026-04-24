import api from "../api/axios";

export const fetchNearbyFarmers = () => {
  return api.get("/user/fetch-vendor");
};

export const fetchAllFarmers = (page) => {
  return api.get(`/vendor/fetch?limit=8&page=${page}`);
};

export const fetchFilters = () => {
  return api.get(`/vendor/fetch-filters`);
};

export const fetchFilteredFarmers = (data) => {
  return api.get(
    `/vendor/filter?ward=${data?.ward}&district=${data?.district}&panchayth=${data?.panchayth}&search=${data?.search}`
  );
};

export const fetchVendorDetails=(id)=>{
 return api.get(`/vendor/fetchvendor-details/${id}`)
}
