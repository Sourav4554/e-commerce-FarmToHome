import { Calendar } from "lucide-react";

const DeliveryStatus = ({
  orderId,
  orderStatus,
  statusOptions,
  statusConfig,
  onUpdate,
}) => {
  return (
    <>
    <div className="mt-6 bg-white rounded-xl shadow-md p-6 border border-slate-200 hidden lg:block">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-900">
          Update Delivery Status
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold text-slate-700">
          Change Status:
        </label>

        <select
          value={orderStatus}
          onChange={(e) => onUpdate(orderId, e.target.value)}
          className="px-4 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-slate-900 font-semibold"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {statusConfig[s].label}
            </option>
          ))}
        </select>

        <span
          className={`px-4 py-2 rounded-lg border font-semibold text-sm ${
            statusConfig[orderStatus]?.color
          }`}
        >
          Current: {statusConfig[orderStatus]?.label}
        </span>
      </div>
    </div>


     {/* mobile view  */}
     <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 lg:hidden">
     <div className="flex items-center gap-2 mb-3">
       <Calendar className="w-5 h-5 text-indigo-600" />
       <h4 className="font-bold text-slate-900">
         Update Status
       </h4>
     </div>
     <select
       value={orderStatus}
       onChange={(e) =>
         onUpdate(orderId, e.target.value)
       }
       className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
     >
       {statusOptions.map((s) => (
         <option key={s} value={s}>
           {statusConfig[s].label}
         </option>
       ))}
     </select>
   </div>
   </>
  );
};

export default DeliveryStatus;