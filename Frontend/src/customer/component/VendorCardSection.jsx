import React, { useContext, useEffect, useState } from "react";
import VendorCard from "./VendorCard";
import useCustomerHook from "../../hooks/customerHook/useCustomerHook";
import { AuthContextProvide } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import VendorCardSkeleton from "../../components/VendorCardSkenlton";

const VendorCardSection = () => {
  const [nearbyVendors, setNearbyVendors] = useState([]);
  const { fetchNearestFarmers, loading } = useCustomerHook();
  const { userInfo } = useContext(AuthContextProvide);
  //method for fetch nearest farmers
  const fetchFarmers = async () => {
    const response = await fetchNearestFarmers();
    if (response.success) {
      setNearbyVendors(response?.farmers);
    } else {
      console.log(response.message);
    }
  };
  useEffect(() => {
    fetchFarmers();
  }, [userInfo]);

  // useEffect(() => {
  //   console.log(nearbyVendors);
  // }, [nearbyVendors]);
  
  return (
    <section className="w-full p-4 mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Explore Nearby Farmers
        </h2>
        <p className="text-sm text-gray-500 text-center py-2">
          {userInfo
            ? `${
                nearbyVendors.length > 0
                  ? "Those are farmers near you"
                  : "No farmers near you"
              } `
            : `Please Login to explore nearby farmers`}
        </p>
      </div>
      <div className=" grid  grid-cols-1 md:grid-cols-2 gap-10">
        {nearbyVendors.length > 0
          ? nearbyVendors.map((item, _) => (
              <VendorCard
                key={item._id}
                name={item.name}
                district={item.district}
                panchayth={item.panchayth}
                ward={item.ward}
                createAt={item.createdAt}
              />
            ))
          : Array.from({ length: 4 }).map((_, key) => {
              return <VendorCardSkeleton key={key} />;
            })}

        {/* <VendorCard />
        <VendorCard />
        <VendorCard />
        <VendorCard />
        <VendorCard /> */}
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
