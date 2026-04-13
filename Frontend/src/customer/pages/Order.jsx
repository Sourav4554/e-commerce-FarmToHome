import React, { useContext } from 'react'

import OrderCard from '../component/OrderCard';
import { orderContextProvider } from '../../context/OrderContext';
const Order = () => {
  const {customerOrder}=useContext(orderContextProvider)

 
  return (
<div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100">
  <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-black">
        My Orders
      </h1>
      <div className="h-1 w-16 bg-green-500 rounded-full mt-2"></div>
    </div>

    {/* Tabs */}
    <div className="mb-6 border-b border-green-100">
      <div className="flex gap-6 sm:gap-10 overflow-x-auto">
        
        <button className="pb-3 border-b-2 border-green-500">
          <span className="text-sm sm:text-base font-semibold text-green-700">
            Upcoming Orders
            <span className="ml-2 px-2 py-0.5 text-xs text-white bg-green-500 rounded-full">
              {1}
            </span>
          </span>
        </button>

        <button className="pb-3">
          <span className="text-sm sm:text-base font-semibold text-gray-500">
            Previous Orders
            <span className="ml-2 px-2 py-0.5 text-xs text-gray-500 bg-gray-200 rounded-full">
              0
            </span>
          </span>
        </button>

      </div>
    </div>

    {/* Orders List */}
    <div className="space-y-4">
      {customerOrder && customerOrder.length>0?(customerOrder.map((order, index) => (
        <OrderCard
        number={index}
        key={order._id}
        price={order.totalAmount}
        paymentMethod={order.paymentMethod}
        items={order.items}
        
        />
      ))
    ):(
      <>
      <h1>No order</h1>
      </>
      )
    }
    </div>

  </div>
</div>
  )
}

export default Order