    import React, { useState, useEffect } from "react";
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import Layout from "./layouts/HomeLayout";
    import Dashboard from "./pages/dashboard";
    import EmployeeProfile from "./pages/Employee/thong-tin";
    import Attendance from "./pages/Employee/bang-cong";
    import EmployeeSalary from "./pages/Employee/bang-luong";
    import LeaveRequest from "./pages/Employee/xin-nghi";
    import LateRequest from "./pages/Employee/xin-di-tre";
    import OvertimeRequest from "./pages/Employee/tang-ca";
    import ErrorBoundary from "./components/ErrorBoundary";
    import endPoint from "@/routers/router";

    const App = () => {

      useEffect(() => {
        console.log("🌍 Checking Telegram WebApp...");
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        document.body.appendChild(script);
      
        script.onload = () => {
          console.log("✅ Telegram WebApp SDK Loaded");
          if (window.Telegram?.WebApp) {
            console.log("📌 Expanding WebApp...");
            window.Telegram.WebApp.expand();
          } else {
            console.error("❌ Telegram WebApp not found!");
          }
        };
      }, []);
      
    
      
      return (
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path={endPoint.THONGTIN} element={<EmployeeProfile />} />
                <Route path={endPoint.BANGCONG} element={<Attendance />} />
                <Route path={endPoint.BANGLUONG} element={<EmployeeSalary />} />
                <Route path={endPoint.XINNGHI} element={<LeaveRequest />} />
                <Route path={endPoint.XINDITRE} element={<LateRequest />} />
                <Route path={endPoint.TANGCA} element={<OvertimeRequest />} />
              </Route>
            </Routes>
          </Router>
        </ErrorBoundary>
      );
    };

    export default App;
