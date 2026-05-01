import React from 'react'
import {useNavigate} from 'react-router-dom'
const NoVendor = () => {
    const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-whitew-full rounded-2xl shadow-sm">
      
    {/* Icon */}
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mb-4">
      🔒
    </div>

    {/* Heading */}
    <h2 className="text-xl font-semibold text-gray-800">
      Please login to continue
    </h2>

    {/* Description */}
    <p className="text-gray-500 mt-2 max-w-md">
      Login to explore nearby farmers and access fresh organic products directly from local vendors.
    </p>

    {/* Button */}
    <button
      onClick={() => navigate("/register")}
      className="mt-6 px-6 py-2.5 bg-green-600 cursor-pointer text-white font-medium rounded-lg hover:bg-green-700 transition"
    >
      Go to Login
    </button>
  </div>
    )
}

export default NoVendor