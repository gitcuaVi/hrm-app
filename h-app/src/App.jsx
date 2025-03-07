// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./layouts/HomeLayout";
// import Dashboard from "./pages/dashboard";
// import EmployeeProfile from "./pages/Employee/thong-tin";
// import Attendance from "./pages/Employee/bang-cong";
// import EmployeeSalary from "./pages/Employee/bang-luong";
// import LeaveRequest from "./pages/Employee/xin-nghi";
// import LateRequest from "./pages/Employee/xin-di-tre";
// import OvertimeRequest from "./pages/Employee/tang-ca";
// import OtpPage from "./pages/login/index";
// import ErrorBoundary from "./components/ErrorBoundary";
// import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
// import endPoint from "@/routers/router";

// const App = () => {
//   useEffect(() => {
//     console.log("🌍 Checking Telegram WebApp...");

//     if (window.Telegram?.WebApp) {
//       console.log("✅ Telegram WebApp SDK Already Loaded");
//       window.Telegram.WebApp.expand();
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://telegram.org/js/telegram-web-app.js";
//     script.async = true;
//     script.onload = () => {
//       console.log("✅ Telegram WebApp SDK Loaded");
//       if (window.Telegram?.WebApp) {
//         console.log("📌 Expanding WebApp...");
//         window.Telegram.WebApp.expand();
//       } else {
//         console.error("❌ Telegram WebApp not found!");
//       }
//     };

//     document.body.appendChild(script);
//   }, []);

//   const isVerified = localStorage.getItem("isVerified") === "true";

//   return (
//     <ErrorBoundary>
//       <Router>
//         <Routes>
//           {/* Nếu chưa xác thực, điều hướng về trang OTP */}
//           <Route path="/" element={<Navigate to={isVerified ? "/dashboard" : "/otp"} />} />
//           <Route path="/otp" element={<OtpPage />} />

//           {/* Các trang cần bảo vệ */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<Layout />}>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path={endPoint.THONGTIN} element={<EmployeeProfile />} />
//               <Route path={endPoint.BANGCONG} element={<Attendance />} />
//               <Route path={endPoint.BANGLUONG} element={<EmployeeSalary />} />
//               <Route path={endPoint.XINNGHI} element={<LeaveRequest />} />
//               <Route path={endPoint.XINDITRE} element={<LateRequest />} />
//               <Route path={endPoint.TANGCA} element={<OvertimeRequest />} />
//             </Route>
//           </Route>
//         </Routes>
//       </Router>
//     </ErrorBoundary>
//   );
// };

// export default App;



import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/HomeLayout";
import Dashboard from "./pages/dashboard";
import EmployeeProfile from "./pages/Employee/thong-tin";
import Attendance from "./pages/Employee/bang-cong";
import EmployeeSalary from "./pages/Employee/bang-luong";
import LeaveRequest from "./pages/Employee/xin-nghi";
import LateRequest from "./pages/Employee/xin-di-tre";
import OvertimeRequest from "./pages/Employee/tang-ca";
import OtpPage from "./pages/login/index";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import endPoint from "@/routers/router";
import Notifications from "./pages/dashboard/notifications";


const App = () => {
  useEffect(() => {
    window.addEventListener("load", () => {
      sessionStorage.removeItem("isVerified"); 
    });
  }, []);

  const isVerified = sessionStorage.getItem("isVerified") === "true";

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={isVerified ? "/dashboard" : "/otp"} />} />
          <Route path="/otp" element={<OtpPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path={endPoint.THONGTIN} element={<EmployeeProfile />} />
              <Route path={endPoint.BANGCONG} element={<Attendance />} />
              <Route path={endPoint.BANGLUONG} element={<EmployeeSalary />} />
              <Route path={endPoint.XINNGHI} element={<LeaveRequest />} />
              <Route path={endPoint.XINDITRE} element={<LateRequest />} />
              <Route path={endPoint.TANGCA} element={<OvertimeRequest />} />
              <Route path={endPoint.THONGBAO} element={<Notifications />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
