import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token } = useAuth();
  const { userData } = useUser();

  if (!token) {
    // Redirect to login if no token exists
    return <Navigate to="/" />;
  }

  if (!userData) {
    // Show loading state while userData is being fetched
    return <div>Loading...</div>;
  }

  if (!allowedRoles.includes(userData.role)) {
    // Redirect to unauthorized page if role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  return children; // Render children if token and userData are valid
};

export default ProtectedRoute;
