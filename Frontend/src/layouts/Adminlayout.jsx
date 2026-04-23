import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/component/Sidebar";
import AdminNavbar from "../admin/component/AdminNavbar";

const Adminlayout = () => {
  return (
    <>
    <AdminNavbar/>
      <Sidebar />
      <div class="p-4 sm:ml-64 mt-14 ">
        <div class="p-4   rounded-base min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Adminlayout;
