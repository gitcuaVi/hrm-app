import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/HomeLayout";
import Dashboard from "./pages/dashboard";
import EmployeeProfile from "./pages/Employee/thong-tin";
import Attendance from "./pages/Employee/bang-cong";
import EmployeeSalary from "./pages/Employee/bang-luong";
import LeaveRequest from "./pages/Employee/xin-nghi";
import LateRequest from "./pages/Employee/xin-di-tre";
import OvertimeRequest from "./pages/Employee/tang-ca";
import ScrollToTop from "./utils/scroll";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="bang-cong" element={<Attendance />} />
          <Route path="bang-luong" element={<EmployeeSalary />} />
          <Route path="xin-nghi" element={<LeaveRequest />} />
          <Route path="xin-di-tre" element={<LateRequest />} />
          <Route path="tang-ca" element={<OvertimeRequest />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
