import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./layouts/HomeLayout";
import Dashboard from "./pages/dashboard";
import EmployeeProfile from "./pages/Employee/thong-tin";
import Attendance from "./pages/Employee/bang-cong";
import EmployeeSalary from "./pages/Employee/bang-luong";
import LeaveRequest from "./pages/Employee/xin-nghi";
import LateRequest from "./pages/Employee/xin-di-tre";
import OvertimeRequest from "./pages/Employee/tang-ca";
import ErrorBoundary from "./components/ErrorBoundary";
import { WebApp } from "@twa-dev/sdk";
import TelegramAuth from "./pages/login/index";

const App = () => {
  useEffect(() => {
    if (typeof WebApp !== "undefined" && WebApp.initData) {
      WebApp.ready(); 
      WebApp.expand();
      WebApp.requestViewport({ height: window.innerHeight });
      console.log("WebApp đã sẵn sàng!");
    } else {
      console.warn("WebApp không hoạt động trong môi trường này.");
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/login" element={<TelegramAuth />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/thong-tin" element={<EmployeeProfile />} />
            <Route path="/bang-cong" element={<Attendance />} />
            <Route path="/bang-luong" element={<EmployeeSalary />} />
            <Route path="/xin-nghi" element={<LeaveRequest />} />
            <Route path="/xin-di-tre" element={<LateRequest />} />
            <Route path="/tang-ca" element={<OvertimeRequest />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
