import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticated }) => {
  if (isAuthenticated === null) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
