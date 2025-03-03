
import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import "@/styles/bangluong.css";
import profileImg from "@/assets/profile.jpg";
import useEmployeeSalary from "@/store/slice/employSalarySlice";
import { Spin, Typography } from "antd";

const { Text } = Typography;

const EmployeeSalary = () => {
  const [selectedMonth, setSelectedMonth] = useState("02-2025");
  const { salaryData, loading, error } = useEmployeeSalary(selectedMonth); // Lấy dữ liệu từ hook

  return (
    <>
      {/* Hồ sơ cá nhân */}
      <div className="profile">
        <img src={profileImg} alt="Profile" className="profile-img" />
        <div className="name">Đinh Hoàng Lượm</div>
        <div className="location">BL-HCM</div>
      </div>

      {/* Chọn tháng */}
      <div className="month-picker">
        <label htmlFor="month">Chọn tháng:</label>
        <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="02-2025">02-2025</option>
          <option value="01-2025">01-2025</option>
        </select>
      </div>

      {/* Hiển thị dữ liệu */}
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : error ? (
        <Text type="danger">{error}</Text>
      ) : (
        <>
          <div className="details-card">
            <h3><FaClipboardList /> Chi tiết</h3>
            <div className="details-grid">
              <div className="detail-item">Công thực tế: <span className="green">{salaryData.actualWorkdays}</span></div>
              <div className="detail-item">Nghỉ phép: <span>{salaryData.paidLeave}</span></div>
              <div className="detail-item">Nghỉ không lương: <span className="red">{salaryData.unpaidLeave}</span></div>
              <div className="detail-item">Nghỉ lễ: <span>{salaryData.holidayLeave}</span></div>
            </div>
            <p className="actual-work">Công thực tế: <span className="greens">{salaryData.actualWorkdays}</span></p>
          </div>

          <div className="salary-card">
            <p>
              <strong>Lương chuyển khoản:</strong>
              <span className="salary-amount"> {salaryData.salary.toLocaleString()} VND</span>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default EmployeeSalary;
