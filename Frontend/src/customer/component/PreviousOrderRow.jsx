import React,{useState} from 'react'
import StatusBadge from './StatusBadge';
import OrderTimeLine from './OrderTimeLine';
const PreviousOrderRow = ({ order, shortId, formatDate, rupee ,STATUS_META,STATUS_STEPS}) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        {/* Table row */}
        <tr
          className={`cursor-pointer transition-colors ${
            open ? "bg-green-50" : "hover:bg-gray-50"
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          <td className="px-4 py-3.5 text-sm font-mono font-semibold text-gray-800">
            {shortId(order._id)}
          </td>
          <td className="px-4 py-3.5 text-sm text-gray-600 hidden sm:table-cell">
            {formatDate(order.createdAt)}
          </td>
          <td className="px-4 py-3.5 text-sm text-gray-600 hidden md:table-cell">
            {order.items.length} item{order.items.length > 1 ? "s" : ""}
          </td>
          <td className="px-4 py-3.5 text-sm font-bold text-gray-900">
            {rupee(order.totalAmount)}
          </td>
          <td className="px-4 py-3.5">
            <StatusBadge status={order.orderStatus} STATUS_META={STATUS_META} />
          </td>
          <td className="px-4 py-3.5">
            <button
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                open
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              {open ? "Close" : "View"}
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </td>
        </tr>
  
        {/* Expanded accordion row */}
        {open && (
          <tr>
            <td
              colSpan={6}
              className="px-0 pb-4 bg-white border-b border-gray-100"
            >
              <div className="mx-4 mt-1 rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
                {/* Timeline */}
                <div className="px-5 pt-4 pb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Order Journey
                  </p>
                  <OrderTimeLine
                    status={order.orderStatus}
                    STATUS_META={STATUS_META}
                    STATUS_STEPS={STATUS_STEPS}
                  />
                </div>
  
                {/* Items list */}
                <div className="border-t border-gray-100 px-5 py-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Items Ordered
                  </p>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-xs">
                            🛒
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity} · {item.category}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                          {rupee(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Payment details */}
                <div className="border-t border-gray-100 px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Total", value: rupee(order.totalAmount) },
                    { label: "Method", value: order.paymentMethod },
                    {
                      label: "Payment",
                      value: order.paymentStatus ? "Paid" : "Pending",
                    },
                    {
                      label: "Address",
                      value: `${order.address.district}, ${order.address.pincode}`,
                    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </td>
          </tr>
        )}
      </>
    );
}

export default PreviousOrderRow