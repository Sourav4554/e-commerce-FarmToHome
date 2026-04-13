import React from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
const OrderCard = ({ number, price, paymentMethod, items }) => {
  console.log(items);
  return (
    <div
      key={1}
      className="bg-white rounded-xl border border-green-100 shadow-sm p-4 sm:p-5"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg">
          <MdOutlineDeliveryDining className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Order no <span className="text-green-600">{number + 1}</span>
              </h3>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                ₹{price}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition">
                Order Details
              </button>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="space-y-4 items-center gap-3 mt-3 text-sm text-gray-600">
            <div className="flex gap-2">
              <FiPackage className="w-4 h-4 text-green-500" />

              <p className="text-sm text-gray-600">
                {items.map((item) => item.name).join(", ")}
              </p>
            </div>
            <div >
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md">
                {`pending`}
              </span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>

            <div className="flex justify-end w-full">
              <span className="font-medium text-gray-700">
                {paymentMethod === "COD"
                  ? "cash on delivery"
                  : "Online payment"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
