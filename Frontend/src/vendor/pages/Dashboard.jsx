import React from "react";
import ProductSection from "../components/ProductSection";
import OrderSection from "../components/OrderSection";

const Dashboard = () => {
  return (
    <div className="mx-auto">
  
      <ProductSection />
      <OrderSection/>
    </div>
  );
};

export default Dashboard;
