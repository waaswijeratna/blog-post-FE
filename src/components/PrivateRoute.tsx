import { Navigate, useLocation } from "react-router-dom";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  // Read user and token directly from localStorage
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  // If there's no user or token, redirect to login
  if (!storedUser || !storedToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
