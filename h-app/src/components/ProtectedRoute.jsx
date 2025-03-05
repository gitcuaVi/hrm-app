import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isVerified = localStorage.getItem("isVerified") === "true";
  
  return isVerified ? <Outlet /> : <Navigate to="/otp" replace />;
};

export default ProtectedRoute;
