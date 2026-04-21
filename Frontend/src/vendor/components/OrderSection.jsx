import React, { useContext, useMemo } from "react";
import { orderContextProvider } from "../../context/OrderContext";

const OrderSection = () => {
  const { customerOrder } = useContext(orderContextProvider);
  // Calculate order statistics
  const orderStats = useMemo(() => {
    if (!customerOrder || customerOrder.length === 0) {
      return {
        total: 0,
        outForDelivery: 0,
        delivered: 0,
      };
    }
    return {
      total: customerOrder.length,
      outForDelivery: customerOrder.filter(
        (order) =>
          order.status === "collecting" ||
          order.status === "Packed" ||
          order.status === "out of Delivery"
      ).length,
      delivered: customerOrder.filter((order) => order.status === "Delivered")
        .length,
    };
  }, [customerOrder]);
  return (
    <>
      <div className="lg:p-5">
        <h2 className="text-xl text-center lg:text-left lg:text-3xl text-green-800 lg:ml-9">
          Order Details
        </h2>
        <div className=" bg-linear-to-br p-8 grid grid-cols-1 lg:grid-cols-3 gap-3 mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 w-72 hover:shadow-md transition duration-300">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Total Order</p>

              {/* <div className="bg-green-100 text-green-600 p-2 rounded-lg">📦</div> */}
            </div>

            <div className="mt-4">
              <h3 className="text-3xl font-semibold text-gray-800">
                {orderStats.total}
              </h3>
            </div>

            <div className="mt-2 flex items-center text-sm">
              {/* <span className="text-green-600 font-medium">+12%</span>
          <span className="ml-2 text-gray-500">vs last week</span> */}
            </div>
          </div>
          {/* dddddddddddddddddddd */}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 w-72 hover:shadow-md transition duration-300">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Out of delivery
              </p>

              {/* <div className="bg-green-100 text-green-600 p-2 rounded-lg">📦</div> */}
            </div>

            <div className="mt-4">
              <h3 className="text-3xl font-semibold text-gray-800">
                {orderStats.outForDelivery}
              </h3>
            </div>

            {/* <div className="mt-2 flex items-center text-sm">
          <span className="text-green-600 font-medium">+12%</span>
          <span className="ml-2 text-gray-500">vs last week</span>
        </div> */}
          </div>

          {/* dddddddddddddd */}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 w-72 hover:shadow-md transition duration-300">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Delivered</p>
            </div>

            <div className="mt-4">
              <h3 className="text-3xl font-semibold text-gray-800">
                {orderStats.delivered}
              </h3>
            </div>

            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 font-medium"></span>
              <span className="ml-2 text-gray-500"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSection;
