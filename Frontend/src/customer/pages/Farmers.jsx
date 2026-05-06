import React, { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import FarmersHero from "../component/FarmersHero";
import Pagination from "../../components/Pagination";
import useCustomerHook from "../../hooks/customerHook/useCustomerHook";

const Farmers = () => {
  const { fetchFarmers, filterFarmers } = useCustomerHook();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [vendors, setVendors] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredData, setFilteredData] = useState({
    ward: "",
    panchayth: "",
    district: "",
    search: "",
  });
  const checkIsFiltering =
    filteredData.ward ||
    filteredData.panchayth ||
    filteredData.district ||
    filteredData.search;
  //method for fetch paginated farmers
  const fetchPaginatedFarmers = async (page) => {
    setLoading(true)
    const response = await fetchFarmers(page);
    if (!response.success) {
      console.log(response.message);
      setLoading(false)
      return;
    }
    setTotalPages(response.totalPages);
    setPage(response.page);
    setVendors(response.farmers);
    setLoading(false)
  };

  //method for fetch filtered farmers
  const fetchFilteredFarmers = async (filteredData) => {
    setLoading(true)
    const response = await filterFarmers(filteredData);
    if (!response.success) {
      console.log(response.message);
      setVendors([]);
      setLoading(false)
      return;
    }
    setLoading(false)
    setVendors(response.farmers);
  };
  useEffect(() => {
    if (checkIsFiltering) {
      fetchFilteredFarmers(filteredData);
      setPage(1);
    } else {
      fetchPaginatedFarmers(page);
    }
  }, [page, filteredData]);



  return (
    <>
      <FarmersHero
        vendors={vendors}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        loading={loading}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        loading={loading}
      />
    </>
  );
};

export default Farmers;
