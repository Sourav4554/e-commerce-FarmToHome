import React, { useContext, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { orderContextProvider } from "../../context/OrderContext";

const Order = () => {
  const {customerOrder}=useContext(orderContextProvider)
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const orders = customerOrder || [];
console.log(orders)
const orderTotals=orders.map((order)=>{
  return order.items.reduce((total,item)=>total+=item.price,0)
})

console.log(orderTotals);
     
  // }
  //order status implicitly set
  const statusConfig = {
    placed: {
      label: "Placed",
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: Clock,
      action: "Confirm Order",
    },
    confirmed: {
      label: "Confirmed",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: CheckCircle,
      action: "Start Collecting",
    },
    collecting: {
      label: "Collecting",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: Package,
      action: "Mark as Packed",
    },
    packed: {
      label: "Packed",
      color: "bg-indigo-100 text-indigo-800 border-indigo-200",
      icon: Package,
      action: "Out for Delivery",
    },
    out_for_delivery: {
      label: "Out for Delivery",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: Truck,
      action: "Mark as Delivered",
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
      action: null,
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-800 border-red-200",
      icon: XCircle,
      action: null,
    },
  };

  //filter buttons
  const tabs = [
    { id: "all", label: "All Orders", count: orders.length },
  
    {
      id: "placed",
      label: "Placed",
      count: orders.filter(o => o.orderStatus === "placed").length,
    },
  
    {
      id: "confirmed",
      label: "Confirmed",
      count: orders.filter(o => o.orderStatus === "confirmed").length,
    },
  
    {
      id: "collecting",
      label: "Collecting",
      count: orders.filter(o => o.orderStatus === "collecting").length,
    },
  
    {
      id: "packed",
      label: "Packed",
      count: orders.filter(o => o.orderStatus === "packed").length,
    },
  
    {
      id: "out_for_delivery",
      label: "Out for Delivery",
      count: orders.filter(o => o.orderStatus === "out_for_delivery").length,
    },
  
    {
      id: "delivered",
      label: "Delivered",
      count: orders.filter(o => o.orderStatus === "delivered").length,
    },
  ];

  //filtering orders based on user click
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.orderStatus === activeTab;
    return matchesTab;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Order Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and track all your orders
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="flex gap-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {/* <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order,index) => {
                  const StatusIcon =
                    statusConfig[order.orderStatus]?.icon || Clock;
                  const isExpanded = expandedOrder === order._id;
                  return (
                    <React.Fragment key={order._id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        {/* <td className="px-6 py-4">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td> */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleOrderExpansion(order._id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                            <div>
                              <div className="font-mono text-sm font-medium text-gray-900">
                                #{order._id.slice(-8)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {order.address.name}
                            </div>
                            <div className="text-gray-500 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              {order.address.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(order.orderDate)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.items.length} item
                            {order.items.length > 1 ? "s" : ""}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-gray-700">
                              {order.paymentMethod}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit ${
                                order.paymentStatus
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {order.paymentStatus ? "Paid" : "Pending"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                              statusConfig[order.orderStatus]?.color ||
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
                            {statusConfig[order.orderStatus]?.label ||
                              order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{orderTotals[index].toLocaleString("en-IN") || 0}
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Row Details */}
                      {isExpanded && (
                        <tr className="bg-gray-50">
                          <td colSpan="9" className="px-6 py-5">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Shipping Address */}
                              <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-blue-50 rounded-lg">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 mb-2">
                                      Shipping Address
                                    </h3>
                                    <div className="text-sm text-gray-600 space-y-1">
                                      <p className="font-medium text-gray-900">
                                        {order.address.name}
                                      </p>
                                      <p>
                                        {order.address.houseName}, House No:{" "}
                                        {order.address.houseNo}
                                      </p>
                                      <p>
                                        Ward {order.address.ward},{" "}
                                        {order.address.panchayath}
                                      </p>
                                      <p>
                                        {order.address.district} -{" "}
                                        {order.address.pincode}
                                      </p>
                                      <p className="flex items-center gap-1 mt-2">
                                        <Phone className="w-3.5 h-3.5" />
                                        {order.address.phone}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-purple-50 rounded-lg">
                                    <Package className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 mb-3">
                                      Order Items
                                    </h3>
                                    <div className="space-y-2">
                                      {order.items.map((item, index) => (
                                        <div
                                          key={index}
                                          className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-0"
                                        >
                                          <div>
                                            <span className="font-medium text-gray-900">
                                              {item.name}
                                            </span>
                                            <span className="text-gray-500 ml-2">
                                              × {item.quantity}
                                            </span>
                                          </div>
                                          <span className="font-medium text-gray-900">
                                            ₹
                                            {(
                                              item.price * item.quantity
                                            ).toLocaleString("en-IN")}
                                          </span>
                                        </div>
                                      ))}
                                      <div className="flex justify-between items-center text-sm font-semibold pt-2 mt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span className="text-lg">
                                          ₹
                                          {orderTotals[index].toLocaleString(
                                            "en-IN"
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No orders found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
