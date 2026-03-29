import React, { useContext } from "react";
import { AuthContextProvide } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedRoutes = ({ role }) => {
  const { userInfo, loading } = useContext(AuthContextProvide);
  if (loading) {
    return <Loader/>;
  }
  if (!userInfo) {
    return <Navigate to="" replace/>;
  }
  if (userInfo.role !== role) {
    return <Navigate to="/register" replace/>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
