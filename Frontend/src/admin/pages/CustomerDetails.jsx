import React, { use, useEffect, useState } from "react";
import UserTable from "../component/UserTable";
import useAdmin from "../../hooks/adminHook/useAdmin";
import Pagination from "../../components/Pagination";

const CustomerDetails = () => {
  const { fetchUsers, loading } = useAdmin();

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Active");

  const filterOptions = [
    { id: "Active", text: "Active Customers" },
    { id: "Blocked", text: "Blocked Customers" },
  ];

  const statusMap = {
    Active: "approved",
    Blocked: "blocked",
  };

  const fetchCustomers = async () => {
    const response = await fetchUsers(
      page,
      statusMap[activeFilter],
      "customer"
    );

    if (!response.success) return;

    setUsers(response.vendors);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div className="p-6 bg-gray-50">
        <h1 className="text-2xl font-semibold">Customer Details</h1>

        <div className="flex gap-3 mt-4">
          {filterOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => handleFilterChange(item.id)}
              className={`px-5 py-2 rounded-xl ${
                activeFilter === item.id
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <UserTable users={users} loading={loading} role="customer" fetchCustomers={fetchCustomers}/>

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default CustomerDetails;
