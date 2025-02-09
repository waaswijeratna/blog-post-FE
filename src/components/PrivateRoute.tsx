import { Navigate, useLocation } from "react-router-dom";
import { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (!storedUser || !storedToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
