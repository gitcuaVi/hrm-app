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
import { WebApp } from "@twa-dev/sdk"; // Import SDK của Telegram Mini Apps

const App = () => {
  useEffect(() => {
    const initWebApp = () => {
      if (WebApp) {
        WebApp.ready();  // Đảm bảo WebApp đã sẵn sàng
        WebApp.expand(); // Mở rộng toàn màn hình
        WebApp.requestViewport({ height: window.innerHeight }); // Yêu cầu toàn màn hình
        console.log("WebApp đã sẵn sàng!");
      } else {
        console.warn("WebApp vẫn chưa khởi tạo.");
      }
    };

    if (document.readyState === "complete") {
      initWebApp(); // Nếu DOM đã tải xong, gọi ngay
    } else {
      document.addEventListener("DOMContentLoaded", initWebApp); // Chờ DOM load xong
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", initWebApp); // Cleanup
    };
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
