import React, { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import "@/styles/bangluong.css";
import Profile from "@/pages/dashboard/profile";
import useEmployeeSalary from "@/store/slice/employSalarySlice";
import { Spin, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

const EmployeeSalary = () => {
  const today = dayjs(); // Ngày hiện tại
  const currentYear = today.year();
  const currentMonth = today.month() + 1; // Tháng hiện tại (1-12)

  const [selectedMonth, setSelectedMonth] = useState(`${currentMonth < 10 ? "0" + currentMonth : currentMonth}-${currentYear}`);
  const { salaryData, loading, error } = useEmployeeSalary(selectedMonth);

  // Danh sách tháng của năm hiện tại
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return `${month < 10 ? "0" + month : month}-${currentYear}`;
  });

  return (
    <>
      <Profile />

      {/* Chọn tháng */}
      <div className="month-picker">
        <label htmlFor="month">Chọn tháng:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
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
