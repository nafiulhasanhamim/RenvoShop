import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ role, children }) => {
  console.log(role);
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoutes;
