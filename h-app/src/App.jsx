import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Layout from "./layouts/HomeLayout";
import Dashboard from "./pages/dashboard";
import EmployeeProfile from "./pages/Employee/thong-tin";
import Attendance from "./pages/Employee/bang-cong";
import EmployeeSalary from "./pages/Employee/bang-luong";
import LeaveRequest from "./pages/Employee/xin-nghi";
import LateRequest from "./pages/Employee/xin-di-tre";
import OvertimeRequest from "./pages/Employee/tang-ca";
import endPoint from "./routers/router";
import ErrorBoundary from "./components/ErrorBoundary";
import { WebApp } from "@twa-dev/sdk"; // Import Telegram WebApp SDK

const App = () => {
  useEffect(() => {
    if (typeof WebApp !== "undefined" && WebApp.initData) {
      WebApp.ready(); 
      WebApp.expand(); // Mở rộng toàn màn hình
      WebApp.requestViewport({ height: window.innerHeight }); // Yêu cầu toàn màn hình
      console.log("✅ WebApp đã sẵn sàng!");
    } else {
      console.warn("⚠ WebApp không hoạt động trong môi trường này.");
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path={endPoint.ALL} element={<Layout />}>
            <Route index element={<Dashboard />} />
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
