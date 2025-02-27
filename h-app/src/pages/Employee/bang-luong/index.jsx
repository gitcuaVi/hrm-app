import React, { useState } from "react";
import { FaClipboardList  } from "react-icons/fa";
import "../../../styles/bangluong.css"; 
import "../../../styles/thongtin.css";
import "../../../index.css";
import profileImg from "../../../assets/profile.jpg";

const EmployeeSalary = () => {
  const [selectedMonth, setSelectedMonth] = useState("02-2025");

  const employee = {
    name: "Đinh Hoàng Lượm",
    department: "BL-HCM",
    actualWorkdays: 24.5,
    paidLeave: 0,
    unpaidLeave: 0,
    holidayLeave: 0,
    salary: 26010758, 
  };


  return (
    <div className="container">
      {}
      <div className="profile-header">
        <img src={profileImg} alt="Profile" className="avatar" />
        <div className="name">{employee.name}</div>
        <div className="location">{employee.department}</div>
      </div>

      {}
      <div className="month-picker">
        <label htmlFor="month">Chọn tháng:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="02-2025">02-2025</option>
          <option value="01-2025">01-2025</option>
        </select>
      </div>

      {}
      <div className="details-card">
        <h3><FaClipboardList /> Chi tiết</h3>
        <div className="details-grid">
          <div className="detail-item">Công thực tế: <span className="green">{employee.actualWorkdays}</span></div>
          <div className="detail-item">Nghỉ phép: <span>{employee.paidLeave}</span></div>
          <div className="detail-item">Nghỉ không lương: <span className="red">{employee.unpaidLeave}</span></div>
          <div className="detail-item">Nghỉ lễ: <span>{employee.holidayLeave}</span></div>
        </div>
        <p className="actual-work">Công thực tế: <span className="greens">{employee.actualWorkdays}</span></p>
      </div>

      {}
      <div className="salary-card">
        <p>
          <strong>Lương chuyển khoản:</strong> 
          <span className="salary-amount"> {employee.salary.toLocaleString()} VND</span>
        </p>
      </div>
    </div>
  );
};

export default EmployeeSalary;
