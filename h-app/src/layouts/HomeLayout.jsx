import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import "../index.css"; 


const Layout = () => {
  return (
    <div className="container">
      <div className="content">
        <Outlet /> {}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
