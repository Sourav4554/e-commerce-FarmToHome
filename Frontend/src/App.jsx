import React from "react";
// import CustomerDashboard from "./Dashboards/CustomerDashboard";
import { Route, Routes } from "react-router-dom";
import ToastProvide from "./components/ToastProvide";
import AuthContext from "./context/AuthContext";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import VendorRoutes from "./routes/VendorRoutes";
import PendingPage from "./components/PendingPage";
import CartContext from "./context/CartContext";
import OrderContext from "./context/OrderContext";
import ProductContext from "./context/ProductContext";

const App = () => {
  return (
    <AuthContext>
      <CartContext>
        <OrderContext>
          <ProductContext>
            <ToastProvide />
            <Routes>
              <Route path="/*" element={<CustomerRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/vendor/*" element={<VendorRoutes />} />
              <Route path="/pending" element={<PendingPage />} />

            </Routes>
          </ProductContext>
        </OrderContext>
      </CartContext>
    </AuthContext>
  );
};

export default App;
