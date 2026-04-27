// export default Order
import React, { useState, useContext } from "react";
import Loader from "../../components/Loader";
import { orderContextProvider } from "../../context/OrderContext";
import useOrder from "../../hooks/orderHook/useOrder";
import OrderTabs from "../component/OrderTabs";
import UpcomingOrderCard from "../component/UpcomingOrderCard";
import OrderEmpty from "../component/OrderEmpty";
import PreviousOrderRow from "../component/PreviousOrderRow";
// ─── Status Configuration ────────────────────────────────────────────────────
const STATUS_STEPS = [
  "placed",
  "confirmed",
  "collecting",
  "packed",
  "out_for_delivery",
  "delivered",
];

const STATUS_META = {
  placed: {
    label: "Order Placed",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    icon: "📋",
  },
  confirmed: {
    label: "Confirmed",
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    icon: "✅",
  },
  collecting: {
    label: "Collecting",
    color: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
    icon: "🧺",
  },
  packed: {
    label: "Packed",
    color: "bg-indigo-100 text-indigo-700",
    dot: "bg-indigo-500",
    icon: "📦",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
    icon: "🚴",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    icon: "🏠",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-400",
    icon: "✕",
  },
};

const isUpcoming = (status) => !["delivered", "cancelled"].includes(status);

// ─── Utility ─────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

//used for slice id
const shortId = (id) => `#${id.slice(-6).toUpperCase()}`;

//used to converts to rupees
const rupee = (amt) => `₹${amt.toLocaleString("en-IN")}`;

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Order() {
  const { customerOrder } = useContext(orderContextProvider);
  const { loading } = useOrder();

  const [activeTab, setActiveTab] = useState("upcoming");
  const allOrders = customerOrder || [];
  const upcomingOrders = allOrders.filter((o) => isUpcoming(o.orderStatus));
  const previousOrders = allOrders.filter((o) => !isUpcoming(o.orderStatus));

  const tabs = [
    {
      key: "upcoming",
      label: "Upcoming",
      count: upcomingOrders.length,
    },
    {
      key: "previous",
      label: "Previous",
      count: previousOrders.length,
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Page Header ── */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            My Orders
          </h1>
          <div className="h-1 w-14 bg-green-500 rounded-full mt-2" />
          <p className="text-sm text-gray-500 mt-2">
            Track, review, and manage your purchases
          </p>
        </div>

        {/* ── Tabs ── */}

        <OrderTabs
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />

        {/* ── Upcoming Orders ── */}
        {activeTab === "upcoming" && (
          <div>
            {upcomingOrders.length === 0 ? (
              <OrderEmpty
                icon="🛍️"
                title="No upcoming orders"
                subtitle="Your active orders will appear here."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {upcomingOrders.map((order) => (
                  <UpcomingOrderCard
                    key={order._id}
                    order={order}
                    onCancel={(id) => {
                      console.log("Cancel order:", id);
                    }}
                    shortId={shortId}
                    formatDate={formatDate}
                    rupee={rupee}
                    STATUS_META={STATUS_META}
                    STATUS_STEPS={STATUS_STEPS}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Previous Orders ── */}
        {activeTab === "previous" && (
          <div>
            {previousOrders.length === 0 ? (
              <OrderEmpty
                icon="📜"
                title="No previous orders"
                subtitle="Your completed and cancelled orders will show up here."
              />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        {[
                          "Order ID",
                          "Date",
                          "Items",
                          "Total",
                          "Status",
                          "",
                        ].map((h) => (
                          <th
                            key={h}
                            className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                              h === "Date"
                                ? "hidden sm:table-cell"
                                : h === "Items"
                                ? "hidden md:table-cell"
                                : ""
                            }`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {previousOrders.map((order) => (
                        <PreviousOrderRow
                          key={order._id}
                          order={order}
                          shortId={shortId}
                          formatDate={formatDate}
                          rupee={rupee}
                          STATUS_META={STATUS_META}
                          STATUS_STEPS={STATUS_STEPS}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
