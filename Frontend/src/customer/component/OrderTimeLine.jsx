import React from 'react'
const OrderTimeLine = ({status, compact = false ,STATUS_META,STATUS_STEPS}) => {
    if (status === "cancelled") {
        return (
          <div className="flex items-center gap-2 py-2">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm font-bold">
              ✕
            </div>
            <span className="text-sm text-red-600 font-medium">
              Order Cancelled
            </span>
          </div>
        );
      }
    
      const currentIdx = STATUS_STEPS.indexOf(status);
      //1
      return (
        <div
          className={`flex items-start ${
            compact ? "gap-0" : "gap-0"
          } w-full overflow-x-auto pb-1`}
        >
          {STATUS_STEPS.map((step, idx) => {
            const meta = STATUS_META[step];
            const isDone = idx < currentIdx;
            const isActive = idx === currentIdx;
            const isLast = idx === STATUS_STEPS.length - 1;
    
            return (
              <div key={step} className="flex items-center flex-1 min-w-0">
                {/* Node */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`
                      flex items-center justify-center rounded-full transition-all duration-300
                      ${compact ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm"}
                      ${
                        isDone
                          ? "bg-green-500 text-white shadow-sm shadow-green-200"
                          : ""
                      }
                      ${
                        isActive
                          ? "bg-green-600 text-white ring-4 ring-green-100 shadow-md shadow-green-200"
                          : ""
                      }
                      ${
                        !isDone && !isActive
                          ? "bg-gray-100 text-gray-400 border border-gray-200"
                          : ""
                      }
                    `}
                  >
                    {isDone ? (
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span>{meta.icon}</span>
                    )}
                  </div>
                  {!compact && (
                    <p
                      className={`mt-1.5 text-center leading-tight ${
                        compact ? "text-[9px] w-12" : "text-[10px] w-14"
                      } ${
                        isActive
                          ? "text-green-700 font-semibold"
                          : isDone
                          ? "text-green-600 font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {meta.label}
                    </p>
                  )}
                </div>
    
                {/* Connector line */}
                {!isLast && (
                  <div
                    className={`h-0.5 flex-1 mx-1 rounded-full transition-all duration-500 ${
                      isDone ? "bg-green-400" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
}

export default OrderTimeLine