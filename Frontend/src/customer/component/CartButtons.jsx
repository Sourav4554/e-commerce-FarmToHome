import React from 'react'

const CartButtons = () => {
  return (
    <div className="space-y-3">
          <div className="flex items-center border border-green-400 rounded-md overflow-hidden w-fit">
            <button className="px-4 py-1 bg-green-200 hover:bg-gray-300 text-lg">
              -
            </button>

            <span className="px-4 py-1 text-base font-medium">1</span>

            <button className="px-4 py-1 bg-green-200 hover:bg-gray-300 text-lg">
              +
            </button>
          </div>
          <button className=" bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg font-medium transition shadow">
            Add to Cart
          </button>
        </div>
  )
}

export default CartButtons