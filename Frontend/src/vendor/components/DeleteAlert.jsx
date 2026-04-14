import React from 'react'

const DeleteAlert = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 sm:p-8">
        
        {/* Close Icon */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-800">
          Are you sure you want to <br /> delete this task?
        </h2>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          
          {/* Delete Button */}
          <button className="px-6 py-2 rounded-lg text-white font-medium bg-linear-to-r from-orange-500 to-red-500 shadow-md hover:opacity-90 transition">
            Delete
          </button>

          {/* Cancel Button */}
          <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            Cancel
          </button>

        </div>
      </div>
    </div>
  )
}

export default DeleteAlert