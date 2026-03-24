import React from "react";
import VendorCard from "./VendorCard";

const VendorCardSection = () => {
  return (
    <section className="w-full p-4 mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Explore Nearby Farmers
        </h2>
        <p className="text-sm text-gray-500 text-center py-2">Please Login to explore nearby farmers</p>
      </div>
      <div className=" grid  grid-cols-1 md:grid-cols-2 gap-10">
        <VendorCard />
        <VendorCard />
        <VendorCard />
        <VendorCard />
        <VendorCard />
        <VendorCard />
      </div>
      <div className="flex py-5 items-center justify-center">
        <button className="mt-6 ml-[8%] md:ml-0 px-6 py-3 text-white bg-primary rounded-lg font-medium transition duration-300 hover:bg-green-700 hover:-translate-y-1 cursor-pointer">
          Explore Farmers
        </button>
      </div>
    </section>
  );
};

export default VendorCardSection;
