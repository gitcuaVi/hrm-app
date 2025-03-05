import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isVerified = sessionStorage.getItem("isVerified") === "true";
  
  return isVerified ? <Outlet /> : <Navigate to="/otp" replace />;
};

export default ProtectedRoute;
