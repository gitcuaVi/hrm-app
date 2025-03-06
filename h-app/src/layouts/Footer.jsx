import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { SlHome } from "react-icons/sl";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isDashboard = location.pathname === "/dashboard";
  const isNotif = location.pathname === "/thong-bao";

  return (
    <div className="footer">
      <SlHome 
        className="icon" 
        style={{ color: isDashboard ? "#2563eb" : "black" }} 
        onClick={() => navigate("/dashboard")} 
      />
      <GoBell className="icon"
       style={{ color: isNotif ? "#2563eb" : "black" }} 
       onClick={() => navigate("/thong-bao")}
      />
    </div>
  );
};

export default Footer;