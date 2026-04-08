import React from 'react'

const FarmerCard = ({vendorDetails}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-green-500 mt-4">
    <h3 className="font-semibold text-gray-800 mb-3">
      Farmer Details
    </h3>

    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
      <p><span className="font-medium">Name:</span>{vendorDetails?.name}</p>
      <p><span className="font-medium">Phone:</span>{vendorDetails?.phone}</p>
      <p><span className="font-medium">Whatsapp:</span>{vendorDetails?.whatsapp}</p>
      <p><span className="font-medium">District:</span> {vendorDetails?.district}</p>
      <p><span className="font-medium">Panchayat:</span> {vendorDetails?.panchayth}</p>
      <p><span className="font-medium">Ward:</span>{vendorDetails?.ward}</p>
      
    </div>

    {/* Chat Button */}
    <a
      href={`https://wa.me/${vendorDetails?.whatsapp}?text=${encodeURIComponent(
      `Hi , great to connect with you Frontend/src/components/CartButtons.jsx`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition"
    >
      Chat with Farmer
    </a>
  </div>
  )
}

export default FarmerCard