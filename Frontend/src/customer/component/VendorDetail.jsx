import React, { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Calendar,
  MessageCircle,
} from "lucide-react";
import noProfileLogo from "../../asscets/Starter pfp.jpeg";
import useCustomerHook from "../../hooks/customerHook/useCustomerHook";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

const VendorDetail = ({totalReviews,average}) => {
  const { farmerDetails, loading } = useCustomerHook();
  const { id } = useParams();
  const [farmerStorage, setFarmerStorage] = useState({});

  const fetchFarmerDetails = async () => {
    if (!id) {
      return;
    }
    const response = await farmerDetails(id);
    if (!response.success) {
      console.log(response.message);
    }
    setFarmerStorage(response.vendor);
  };

  useEffect(() => {
    fetchFarmerDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const StarRating = ({ rating, size = "sm" }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formattedDate = new Date(farmerStorage.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",   // or "2-digit" for 03
    month: "short",
    year: "numeric",
  });
  // Sample vendor data
  

  return (
    <div className="vendor-card bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 mb-8 lg:mb-12">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Vendor Image */}
        <div className="shrink-0">
          <div className="relative">
            <img
              src={farmerStorage?.avatar || noProfileLogo}
              alt={"kk"}
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl object-cover shadow-md ring-4 ring-emerald-50"
            />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
              <div className="w-8 h-8 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Info */}
        <div className="grow">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {farmerStorage.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-sm sm:text-base">
                  ward {farmerStorage.ward}, {farmerStorage.panchayth},{" "}
                  {farmerStorage.district}
                </span>
              </div>
            </div>

            <button className="contact-btn text-white bg-green-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl whitespace-nowrap self-start sm:self-auto">
              <MessageCircle className="w-5 h-5" />
              Contact Vendor
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
            <div className="stat-badge rounded-xl px-4 py-2.5 flex items-center gap-2">
              <StarRating rating={Math.floor(average)} size="md" />
              {/* <span className="font-semibold text-gray-900 text-lg">
                
              </span> */}
              <span className="text-gray-600 text-sm">
                ({totalReviews} reviews)
              </span>
            </div>

            <div className="stat-badge rounded-xl px-4 py-2.5 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span className="text-gray-700 text-sm font-medium">
                Member since {formattedDate}
              </span>
            </div>

            {/* <div className="stat-badge rounded-xl px-4 py-2.5 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
              <span className="text-gray-700 text-sm font-medium">
                {vendor.totalProducts} Products
              </span>
            </div> */}
          </div>

          <p className="text-gray-600 leading-relaxed">
            I grow and offer fresh organic produce along with traditional Kerala
            products, cultivated and prepared with care. All items are 100%
            organic and directly delivered from my farm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;
