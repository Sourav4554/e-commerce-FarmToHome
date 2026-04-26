import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  MapPin,
  Phone,
  User,
  CreditCard,
  Home,
} from "lucide-react";
import useAdmin from "../../hooks/adminHook/useAdmin";
import Pagination from "../../components/Pagination";
import DeliveryStatus from "../component/DeliveryStatus";

const AdminOrder = () => {
  const { fetchAOrders ,loading} = useAdmin();

  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // ─── Status configuration ────────────────────────────────────────────────
  const statusConfig = {
    placed: {
      label: "Placed",
      color: "bg-gray-100 text-gray-700 border-gray-300",
    },
    confirmed: {
      label: "Confirmed",
      color: "bg-blue-100 text-blue-700 border-blue-300",
    },
    collecting: {
      label: "Collecting",
      color: "bg-purple-100 text-purple-700 border-purple-300",
    },
    packed: {
      label: "Packed",
      color: "bg-indigo-100 text-indigo-700 border-indigo-300",
    },
    out_for_delivery: {
      label: "Out for Delivery",
      color: "bg-orange-100 text-orange-700 border-orange-300",
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-700 border-green-300",
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-700 border-red-300",
    },
  };

  const statusOptions = Object.keys(statusConfig);



  /** paymentStatus from backend is a boolean */
  const formatPaymentStatus = (status) => (status ? "Paid" : "Pending");

  /** paymentMethod from backend may be uppercase ("ONLINE", "COD") */
  const formatPaymentMethod = (method = "") =>
    method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();

  /** Group items by vendorId so the vendor panel is still meaningful */
  const groupItemsByVendor = (items = []) => {
    const groups = {};
    items.forEach((item) => {
      const key = item.vendorId;
      if (!groups[key]) groups[key] = { vendorId: key, items: [] };
      groups[key].items.push(item);
    });
    return Object.values(groups);
  };

  // ─── Derived state ────────────────────────────────────────────────────────
  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((o) => o.orderStatus === activeFilter);

  const getStatusCount = (status) =>
    status === "all"
      ? orders.length
      : orders.filter((o) => o.orderStatus === status).length;

  // ─── Actions ──────────────────────────────────────────────────────────────
  const toggleExpanded = (id) =>
    setExpandedOrderId((prev) => (prev === id ? null : id));

  const updateOrderStatus = (orderId, newStatus) =>
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, orderStatus: newStatus } : o
      )
    );

  // ─── Data fetching ────────────────────────────────────────────────────────
  const fetchAdminOrder = async () => {
    const response = await fetchAOrders(page);
    if (!response.success) {
      console.error(response.message);
      return;
    }
    setOrders(response.orders);
    setPage(response.page);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    fetchAdminOrder();
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading orders...</span>
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full p-4 md:p-2">
      <div className="max-w-8xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Order Details</h1>
          <p className="text-slate-600 text-sm">
            Manage and track all customer orders
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-4 border border-slate-200">
          <div className="flex flex-wrap gap-3">
            {/* All */}
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeFilter === "all"
                  ? "bg-green-600 text-white shadow-lg shadow-slate-900/30 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105"
              }`}
            >
              All Orders
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeFilter === "all"
                    ? "bg-white text-slate-900"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {getStatusCount("all")}
              </span>
            </button>

            {/* Per-status */}
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === status
                    ? "bg-green-600 text-white shadow-lg shadow-slate-900/30 scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105"
                }`}
              >
                {statusConfig[status].label}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeFilter === status
                      ? "bg-white text-slate-900"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {getStatusCount(status)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              No orders found
            </h3>
            <p className="text-slate-500">
              No orders match the selected filter.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            {/* ── Desktop Table ── */}
            <div className="hidden lg:block overflow-x-scroll">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                    {[
                      "Order ID",
                      "Customer",
                      "Date",
                      "Items",
                      "Payment",
                      "Status",
                      "Total",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="text-left py-4 px-6 text-sm font-bold text-slate-700 uppercase tracking-wider"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <React.Fragment key={order._id}>
                      {/* Main row */}
                      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6">
                          <span className="font-mono font-semibold text-slate-900 text-xs">
                            {order._id.slice(0, 6)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-900">
                            {order.address.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {order.address.phone}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-slate-700">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm">
                            {order.items.reduce(
                              (sum, i) => sum + i.quantity,
                              0
                            )}{" "}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-900">
                            {formatPaymentMethod(order.paymentMethod)}
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              order.paymentStatus
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            {formatPaymentStatus(order.paymentStatus)}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-lg border font-semibold text-sm ${
                              statusConfig[order.orderStatus]?.color
                            }`}
                          >
                            {statusConfig[order.orderStatus]?.label ??
                              order.orderStatus}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-slate-900 text-lg">
                            ₹{order.totalAmount.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => toggleExpanded(order._id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all hover:shadow-lg font-semibold"
                          >
                            {expandedOrderId === order._id ? (
                              <>
                                <ChevronUp className="w-4 h-4" /> Close
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" /> View
                              </>
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {expandedOrderId === order._id && (
                        <tr>
                          <td
                            colSpan="8"
                            className="bg-linear-to-br from-slate-50 to-blue-50 p-6"
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Shipping Address */}
                              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <h3 className="text-lg font-bold text-slate-900">
                                    Shipping Address
                                  </h3>
                                </div>
                                <div className="space-y-3 text-sm text-slate-700">
                                  <div className="flex items-start gap-2">
                                    <Home className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                    <span>
                                      {order.address.houseNo},{" "}
                                      {order.address.houseName}
                                    </span>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                    <span>
                                      Ward {order.address.ward},{" "}
                                      {order.address.panchayath},{" "}
                                      {order.address.district} —{" "}
                                      {order.address.pincode}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <Phone className="w-4 h-4" />
                                    <span className="font-medium">
                                      {order.address.phone}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <User className="w-4 h-4" />
                                    <span className="font-medium">
                                      {order.address.name}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-green-100 rounded-lg">
                                    <Package className="w-5 h-5 text-green-600" />
                                  </div>
                                  <h3 className="text-lg font-bold text-slate-900">
                                    Order Items
                                  </h3>
                                </div>
                                <div className="space-y-3">
                                  {order.items.map((item) => (
                                    <div
                                      key={item._id}
                                      className="pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                                    >
                                      <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                          <p className="font-semibold text-slate-900">
                                            {item.name}
                                          </p>
                                          <p className="text-sm text-slate-500">
                                            Qty: {item.quantity} × ₹
                                            {item.price.toFixed(2)}
                                          </p>
                                          <p className="text-xs text-slate-400 capitalize">
                                            {item.category}
                                          </p>
                                        </div>
                                        <span className="font-bold text-slate-900">
                                          ₹
                                          {(item.quantity * item.price).toFixed(
                                            2
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="pt-3 mt-3 border-t-2 border-slate-200">
                                    <div className="flex justify-between items-center">
                                      <span className="font-bold text-slate-900 text-lg">
                                        Total
                                      </span>
                                      <span className="font-bold text-slate-900 text-xl">
                                        ₹{order.totalAmount.toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-sm">
                                      <CreditCard className="w-4 h-4 text-slate-500" />
                                      <span className="text-slate-600">
                                        {formatPaymentMethod(
                                          order.paymentMethod
                                        )}{" "}
                                        —{" "}
                                        <span
                                          className={
                                            order.paymentStatus
                                              ? "text-green-600"
                                              : "text-orange-600"
                                          }
                                        >
                                          {formatPaymentStatus(
                                            order.paymentStatus
                                          )}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Vendor Details (grouped by vendorId) */}
                              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="p-2 bg-purple-100 rounded-lg">
                                    <User className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <h3 className="text-lg font-bold text-slate-900">
                                    Vendor Details
                                  </h3>
                                </div>
                                <div className="space-y-4">
                                  {groupItemsByVendor(order.items).map(
                                    (group) => (
                                      <div
                                        key={group.vendorId}
                                        className="p-4 bg-linear-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200"
                                      >
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                                          Vendor ID
                                        </p>
                                        <p className="font-mono text-xs text-slate-700 break-all mb-3">
                                          {group.vendorId}
                                        </p>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                          Products
                                        </p>
                                        <ul className="space-y-1">
                                          {group.items.map((item) => (
                                            <li
                                              key={item._id}
                                              className="text-sm text-slate-700"
                                            >
                                              • {item.name}{" "}
                                              <span className="text-slate-500">
                                                (×{item.quantity})
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Status Update */}
                            <DeliveryStatus
                              orderId={order._id}
                              orderStatus={order.orderStatus}
                              statusOptions={statusOptions}
                              statusConfig={statusConfig}
                              onUpdate={updateOrderStatus}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Cards ── */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden"
                >
                  {/* Card header */}
                  <div className="p-4 bg-linear-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono font-bold text-slate-900 text-xs truncate max-w-[55%]">
                        {order._id}
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg border font-semibold text-xs ${
                          statusConfig[order.orderStatus]?.color
                        }`}
                      >
                        {statusConfig[order.orderStatus]?.label}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600">
                      {order.address.name}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Date:</span>
                      <span className="font-semibold text-slate-900 text-sm">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Items:</span>
                      <span className="font-semibold text-slate-900">
                        {order.items.reduce((sum, i) => sum + i.quantity, 0)}{" "}
                        items
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Payment:</span>
                      <span className="font-semibold text-slate-900 text-sm">
                        {formatPaymentMethod(order.paymentMethod)} —{" "}
                        <span
                          className={
                            order.paymentStatus
                              ? "text-green-600"
                              : "text-orange-600"
                          }
                        >
                          {formatPaymentStatus(order.paymentStatus)}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="text-sm font-bold text-slate-900">
                        Total:
                      </span>
                      <span className="font-bold text-slate-900 text-xl">
                        ₹{order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* View button */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => toggleExpanded(order._id)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold"
                    >
                      {expandedOrderId === order._id ? (
                        <>
                          <ChevronUp className="w-4 h-4" /> Close Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" /> View Details
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded mobile view */}
                  {expandedOrderId === order._id && (
                    <div className="p-4 bg-linear-to-br from-slate-50 to-blue-50 border-t border-slate-200 space-y-4">
                      {/* Shipping Address */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h4 className="font-bold text-slate-900">
                            Shipping Address
                          </h4>
                        </div>
                        <div className="text-sm text-slate-700 space-y-1">
                          <p>
                            {order.address.houseNo}, {order.address.houseName}
                          </p>
                          <p>
                            Ward {order.address.ward},{" "}
                            {order.address.panchayath}
                          </p>
                          <p>
                            {order.address.district} — {order.address.pincode}
                          </p>
                          <p className="text-slate-600">
                            {order.address.phone}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-5 h-5 text-green-600" />
                          <h4 className="font-bold text-slate-900">
                            Order Items
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="pb-2 border-b border-slate-100 last:border-0 last:pb-0"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="font-semibold text-slate-900 text-sm">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    Qty: {item.quantity} × ₹
                                    {item.price.toFixed(2)}
                                  </p>
                                </div>
                                <span className="font-bold text-slate-900 text-sm">
                                  ₹{(item.quantity * item.price).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Vendor Details */}
                      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-5 h-5 text-purple-600" />
                          <h4 className="font-bold text-slate-900">
                            Vendor Details
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {groupItemsByVendor(order.items).map((group) => (
                            <div
                              key={group.vendorId}
                              className="p-3 bg-linear-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200"
                            >
                              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">
                                Vendor ID
                              </p>
                              <p className="font-mono text-xs text-slate-700 break-all mb-2">
                                {group.vendorId}
                              </p>
                              <ul className="space-y-0.5">
                                {group.items.map((item) => (
                                  <li
                                    key={item._id}
                                    className="text-xs text-slate-700"
                                  >
                                    • {item.name} (×{item.quantity})
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                     
                      <DeliveryStatus
                        orderId={order._id}
                        orderStatus={order.orderStatus}
                        statusOptions={statusOptions}
                        statusConfig={statusConfig}
                        onUpdate={updateOrderStatus}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default AdminOrder;
