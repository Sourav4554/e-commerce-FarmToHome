import React, { useState } from "react";
import useAdmin from "../../hooks/adminHook/useAdmin";
import toast from "react-hot-toast";

const VendorTable = ({
  vendors = [],
  loading = false,
  activeFilter,
  statusMap,
  fetchRegisteredVendors,
}) => {
  const { acceptRequest, blockVendorAc ,unblockMethod} = useAdmin();
  const [loadingId, setLoadingId] = useState(null);
  const tableHeadings = [
    "Name",
    "Email",
    "Phone",
    "WhatsApp",
    "District",
    "Panchayath",
    "Ward",
    "Actions",
  ];
  //function for approve vendor request
  const approveRequest = async (id) => {
    setLoadingId(id);
    const response = await acceptRequest(id);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    setLoadingId(null);
    fetchRegisteredVendors(statusMap[activeFilter]);
  };

  //method for block vendor
  const handleBlock = async (vendor) => {
    setLoadingId(vendor._id);
    let response;
    if (!vendor?.blockByAdmin) {
      response = await blockVendorAc(vendor._id);
    } else {
      response=await unblockMethod(vendor._id)
    }
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    setLoadingId(null);
    fetchRegisteredVendors(statusMap[activeFilter]);
  };

  if (loading) {
    return (
      <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading vendors...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-sm text-gray-700 bg-gray-50 border-b border-gray-200">
          <tr>
            {tableHeadings.map((heading) => (
              <th key={heading} scope="col" className="px-6 py-4 font-medium">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vendors.length === 0 ? (
            <tr>
              <td
                colSpan={tableHeadings.length}
                className="px-6 py-12 text-center"
              >
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium">No vendors found</p>
                  <p className="text-sm mt-1">Try adjusting your filters</p>
                </div>
              </td>
            </tr>
          ) : (
            vendors.map((vendor) => (
              <tr
                key={vendor._id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {vendor.name || "-"}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {vendor.email || "-"}
                </td>
                <td className="px-6 py-4">{vendor.phone || "N/A"}</td>
                <td className="px-6 py-4">{vendor.whatsapp || "N/A"}</td>
                <td className="px-6 py-4">{vendor.district || "-"}</td>
                <td className="px-6 py-4">{vendor.panchayth || "-"}</td>
                <td className="px-6 py-4">{vendor.ward || "-"}</td>
                {activeFilter === "PendingRequests" ? (
                  <td className="px-6 py-4 text-right flex flex-col sm:flex-row gap-3">
                    <button
                      className={`font-medium py-2 px-4 rounded-lg transition-colors bg-green-600 text-white cursor-pointer`}
                      onClick={() => approveRequest(vendor._id)}
                    >
                      {vendor._id === loadingId ? "Accepting..." : "Accept"}
                    </button>

                    {/* <button
                      className={`font-medium py-2 px-4 rounded-lg transition-colors bg-red-600 text-white cursor-pointer`}
                      onClick={()=>handleBlock(vendor)}
                    >
                     {vendor._id===loading?'Rejecting...':'Reject'}
                    </button> */}
                  </td>
                ) : (
                  <td className="px-6 py-4 text-right">
                    <button
                      className={`font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer ${
                        vendor.blockByAdmin
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                      onClick={() => handleBlock(vendor)}
                    >
                      {/* {vendor.blockByAdmin && vendor._id===loading?'Blocking...': 'Unblock' : 'Block'} */}
                      {vendor._id === loadingId
                        ? vendor.blockByAdmin
                          ? "unblocking..."
                          : "Blocking..."
                        : vendor.blockByAdmin
                        ? "Unblock"
                        : "Block"}
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
