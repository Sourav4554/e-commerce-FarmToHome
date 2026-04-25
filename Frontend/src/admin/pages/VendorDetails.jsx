import React, { useEffect, useState } from "react";
import VendorTable from "../component/VendorTable";
import useAdmin from "../../hooks/adminHook/useAdmin";
import Pagination from "../../components/Pagination";
const VendorDetails = () => {
  const { fetchUsers, loading } = useAdmin();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // Keep original data separate from filtered data
  const [originalVendors, setOriginalVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [activeFilter, setActiveFilter] = useState("RegisteredVendors");
  const [error, setError] = useState(null);

  const filterOptions = [
    { id: "RegisteredVendors", text: "Registered Vendors" },
    { id: "PendingRequests", text: "Pending Requests" },
    { id: "DisabledAccounts", text: "Disabled Accounts" },
  ];

  const statusMap = {
    RegisteredVendors: "approved",
    PendingRequests: "pending",
    DisabledAccounts: "blocked",
  };
  // Fetch vendors on mount must be Registered vendors
  const fetchRegisteredVendors = async (status) => {
    const response = await fetchUsers(page, status);
    if (!response.success) {
      setError(response.message);
      return;
    }
    setTotalPages(response.totalPages);
    setPage(response.page);
    setOriginalVendors(response.vendors);
    setFilteredVendors(response.vendors);
  };
  useEffect(() => {
    fetchRegisteredVendors(statusMap[activeFilter]);
  }, [page, activeFilter]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setPage(1);
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-6 bg-gray-50">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Vendor Details
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all vendors and requests
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleFilterChange(option.id)}
              className={`px-5 py-2 rounded-xl text-sm font-medium shadow-sm transition cursor-pointer ${
                activeFilter === option.id
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <VendorTable
        vendors={filteredVendors}
        loading={loading}
        setFilteredVendors={setFilteredVendors}
        activeFilter={activeFilter}
        statusMap={statusMap}
        fetchRegisteredVendors={fetchRegisteredVendors}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        loading={loading}
      />
    </div>
  );
};

export default VendorDetails;
