import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Adminlayout from "../layouts/Adminlayout";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminDashboard from "../admin/pages/AdminDashboard";
import Products from "../admin/pages/Products";
import VendorDetails from "../admin/pages/VendorDetails";
import CustomerDetails from "../admin/pages/CustomerDetails";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes role="admin" />}>
          <Route element={<Adminlayout />}>
            <Route index element={<Navigate to='admin-dashboard'/>}/>
            <Route path="admin-dashboard" element={<AdminDashboard/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="vendors" element={<VendorDetails/>}/>
            <Route path="customers" element={<CustomerDetails/>}/>
          </Route>
          {/* <Adminlayout/> */}
          {/* <Route index element={<AdminPage/>}/> */}
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
