import React from "react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import OrderTimeLine from "./OrderTimeLine";
const UpcomingOrderCard = ({ order, onCancel, shortId, formatDate, rupee ,STATUS_META,STATUS_STEPS}) => {
  const [expanded, setExpanded] = useState(false);
  const canCancel = (status) => ["placed", "confirmed"].includes(status);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Card Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">
              {shortId(order._id)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <StatusBadge status={order.orderStatus} STATUS_META={STATUS_META} />
      </div>

      {/* Item Summary */}
      <div className="px-5 pb-3">
        <p className="text-sm text-gray-700 font-medium">
          {order.items.length} item{order.items.length > 1 ? "s" : ""} ·{" "}
          <span className="text-gray-500 font-normal">
            {order.items.map((i) => i.name).join(", ")}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            {order.paymentMethod}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
              order.paymentStatus
                ? "bg-green-50 text-green-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {order.paymentStatus ? "✓ Paid" : "Pending Payment"}
          </span>
          <span className="ml-auto text-base font-bold text-gray-900">
            {rupee(order.totalAmount)}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Order Progress
        </p>
        <OrderTimeLine status={order.orderStatus}
        STATUS_META={STATUS_META}
        STATUS_STEPS={STATUS_STEPS}
        />
      </div>

      {/* Address expand */}
      {expanded && (
        <div className="px-5 py-3 border-t border-gray-100 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Delivery Address
          </p>
          <p className="text-sm text-gray-700">
            {order.address.name} · {order.address.phone}
          </p>
          <p className="text-sm text-gray-500">
            {order.address.houseNo}, {order.address.houseName}, Ward{" "}
            {order.address.ward}, {order.address.panchayath},{" "}
            {order.address.district} – {order.address.pincode}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-t border-gray-100">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex-1 min-w-27.5 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {expanded ? "Hide Details" : "Order Details"}
        </button>

        {canCancel(order.orderStatus) && (
          <button
            onClick={() => onCancel(order._id)}
            className="flex-1 min-w-27.5 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default UpcomingOrderCard;
