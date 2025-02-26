import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { SlHome } from "react-icons/sl";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHome = location.pathname === "/";

  return (
    <div className="footer">
      <SlHome 
        className="icon" 
        style={{ color: isHome ? "#2563eb" : "black" }} 
        onClick={() => navigate("/")} 
      />
      <GoBell className="icon" />
    </div>
  );
};

export default Footer;