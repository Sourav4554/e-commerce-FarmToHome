import React from "react";
import Home from "../customer/pages/Home";
import Navbar from "../customer/component/Navbar";
import Footer from "../customer/component/Footer";
import{Routes,Route} from 'react-router-dom'
import Login from "../customer/pages/Login";
const CustomerDashboard = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="register" element={<Login/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
