import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route path="/" element={<Layout />}>
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
