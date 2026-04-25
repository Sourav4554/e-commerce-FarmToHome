import React, { useState } from "react";
import useAdmin from "../../hooks/adminHook/useAdmin";
import toast from "react-hot-toast";

const UserTable = ({ users = [], loading = false, fetchCustomers }) => {
  const { blockVendorAc, unblockMethod } = useAdmin();
  const [loadingId, setLoadingId] = useState(null);

  const tableHeadings = [
    "Name",
    "Email",
    "Phone",
    "District",
    "Panchayath",
    "Ward",
    "Actions",
  ];

  // ✅ Block / Unblock customer
  const handleBlock = async (user) => {
    setLoadingId(user._id);

    let response;
    if (!user.blockByAdmin) {
      response = await blockVendorAc(user._id); // same API works
    } else {
      response = await unblockMethod(user._id);
    }

    setLoadingId(null);

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    await fetchCustomers()
    toast.success(response.message);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading customers...</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            {tableHeadings.map((heading) => (
              <th key={heading} className="px-6 py-4 font-medium">
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={tableHeadings.length} className="text-center py-10">
                No customers found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{user.name || "-"}</td>
                <td className="px-6 py-4">{user.email || "-"}</td>
                <td className="px-6 py-4">{user.phone || "N/A"}</td>
                <td className="px-6 py-4">{user.district || "-"}</td>
                <td className="px-6 py-4">{user.panchayth || "-"}</td>
                <td className="px-6 py-4">{user.ward || "-"}</td>

                {/* 🔥 Block / Unblock */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleBlock(user)}
                    className={`px-4 py-2 rounded-lg text-white ${
                      user.blockByAdmin
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {loadingId === user._id
                      ? user.blockByAdmin
                        ? "Unblocking..."
                        : "Blocking..."
                      : user.blockByAdmin
                      ? "Unblock"
                      : "Block"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
