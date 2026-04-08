import React from "react";
import FarmerCard from "./FarmerCard";
import Loader from "../../components/Loader";
import CartButtons from "./CartButtons";
const ProductDetails = ({ productDetails, vendorDetails }) => {
  if (!productDetails || !vendorDetails) {
    return <Loader />;
  }

  return (
    <div className="w-full h-1/3 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* LEFT - IMAGE CARD */}
      <div className=" rounded-2xl  p-4 ">
        <img
          src={productDetails?.image}
          alt="product"
          className="w-full h-100 object-cover rounded-xl hover:scale-105 transition duration-300"
        />
      </div>

      {/* RIGHT - DETAILS */}
      <div className="flex flex-col gap-6">

  {/* Title + Category */}
  <div className="space-y-2">
    <h1 className="text-3xl font-bold text-gray-800 hover:text-green-600 transition">
      {productDetails?.name}
    </h1>

    <div className="flex items-center gap-3 text-sm">
      <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition">
        {productDetails?.category}
      </span>

      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full">
        In Stock: {productDetails?.stock}
      </span>
    </div>
  </div>

  {/* Price Section */}
  <div className="flex items-center gap-4">
    <span className="text-4xl font-bold text-green-600">
      ₹{productDetails?.price}
    </span>

    <span className="text-xl text-gray-400 line-through">
      ₹499
    </span>

    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium animate-pulse">
      30% OFF
    </span>
  </div>

  {/* Divider */}
  <div className="border-t"></div>

  {/* Description */}
  <p className="text-gray-600 leading-relaxed hover:text-gray-800 transition duration-200">
    {productDetails?.description}
  </p>

 


        {/* Buttons */}
         <CartButtons/>

        {/* FARMER CARD */}
        <FarmerCard vendorDetails={vendorDetails} />
      </div>
    </div>
  );
};

export default ProductDetails;
