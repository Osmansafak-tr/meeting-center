import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  console.log("Is authenticated : ", isAuthenticated);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/account" state={{ from: location }} replace />
  );
};

export default RequireAuth;
