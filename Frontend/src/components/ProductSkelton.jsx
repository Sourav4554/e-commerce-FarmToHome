import React from "react";

export default function ProductSkeleton() {
  return (

      
        <div
          
          className="bg-white rounded-xl shadow-sm p-3 space-y-3 animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full h-40 bg-gray-200 rounded-lg"></div>

          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>

          {/* Subtitle */}
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>

          {/* Price */}
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>

          {/* Button */}
          <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
        </div>



  );
}