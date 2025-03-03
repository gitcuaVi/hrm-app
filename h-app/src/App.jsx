import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import endPoint from "@/routers/router";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Trang đăng nhập Telegram */}
          <Route path="/login" element={<TelegramAuth />} />

          {/* Kiểm tra xác thực trước khi vào Dashboard */}
          <Route
            path="/"
            element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
          >
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
