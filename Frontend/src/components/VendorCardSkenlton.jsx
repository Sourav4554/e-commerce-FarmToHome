const VendorCardSkeleton = () => {
    return (
      <section className="flex flex-col sm:flex-row bg-white rounded-2xl p-3.5 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.08)] animate-pulse">
        
        {/* Image Skeleton */}
        <div className="w-full h-48 sm:w-40 sm:h-auto bg-gray-200 rounded-lg" />
  
        {/* Content */}
        <div className="flex flex-col justify-between p-4 w-full gap-4">
          
          {/* Top */}
          <div>
            {/* Name + Rating */}
            <div className="flex justify-between items-center">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
  
            {/* Location */}
            <div className="flex gap-3 mt-4">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
  
          {/* Bottom */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
            
            <div>
              <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
  
            <div className="h-10 w-full sm:w-28 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </section>
    );
  };

  export default VendorCardSkeleton