import React from "react";
import { Outlet } from "react-router-dom";
import VendorNavbar from "../vendor/components/VendorNavbar";
import VendorFooter from "../vendor/components/VendorFooter";

const VendorLayout = () => {
  return (
    <>
      <div className="w-full md:max-w-\[1300px] md:px-7 m-auto">
        
        <VendorNavbar />
        <Outlet/>
      </div>
      <VendorFooter/>
    </>
  );
};

export default VendorLayout;
