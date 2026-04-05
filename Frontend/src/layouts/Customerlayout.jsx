import React, { useContext } from "react";
import Navbar from "../customer/component/Navbar";
import Footer from "../customer/component/Footer";
import { Outlet } from "react-router-dom";



const Customerlayout = () => {

  return (
    <>
      {/* {loading && <Loader />} */}
      <div className="w-full md:max-w-\[1300px] md:px-7 m-auto">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Customerlayout;
