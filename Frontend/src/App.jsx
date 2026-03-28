import React from "react";
// import CustomerDashboard from "./Dashboards/CustomerDashboard";
import {  Route, Routes } from "react-router-dom";
import ToastProvide from "./components/ToastProvide";
import AuthContext from "./context/AuthContext";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import VendorRoutes from "./routes/VendorRoutes";

const App = () => {
  return (
    <AuthContext>
        <ToastProvide />
        <Routes>
          <Route path="/*" element={<CustomerRoutes/>} />
          <Route path='/admin/*' element={<AdminRoutes/>}/>
           <Route path="/vendor/*" element={<VendorRoutes/>}/>
          {/* <Route path="/register" element={<Login />} /> */}

          {/* <Route path="/customer/*" element={<CustomerDashboard />} /> */}
        </Routes>
    </AuthContext>
  );
};

export default App;
