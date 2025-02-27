import React, { useState } from "react";
import { 
  FaMoneyCheckAlt,
  FaBusinessTime,
  FaCalendarDay,
  FaRegUserCircle,
  FaCalendarAlt
} from "react-icons/fa";
import { LuTimer } from "react-icons/lu";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import profileImg from "../../assets/profile.jpg";



const Profile = () => (
  <div className="profile">
    <img
      src={profileImg}
      alt="Profile"
      className="profile-img"
    />
    <div className="name">Đinh Hoàng Lượm</div>
    <div className="location">BL-HCM</div>
  </div>
);

const CalendarWeek = () => {
  const today = dayjs();
  const startOfWeek = today.startOf("week").add(1, "day");

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, "day");
    return {
      day: weekDays[date.day()],
      date: date.format("DD/MM"),
      isActive: date.isSame(today, "day"),
    };
  });

  const [selectedDate, setSelectedDate] = useState(
    days.find((d) => d.isActive)?.date || days[0].date
  );

  return (
    <div className="calendar-week">
      {days.map((d, index) => (
        <div
          key={index}
          className={`day ${selectedDate === d.date ? "active" : ""}`}
          onClick={() => setSelectedDate(d.date)}
        >
          <div className="day-title">{d.day}</div>
          <div>{d.date}</div>
        </div>
      ))}
    </div>
  );
};



const QuickAccess = () => {
const navigate = useNavigate();
const items = [
    { icon: <FaRegUserCircle />, text: "Thông tin", path: "/profile" },
    { icon: <FaCalendarAlt />, text: "Bảng công", path: "/bang-cong" },
    { icon: <FaMoneyCheckAlt />, text: "Bảng lương", path: "/bang-luong" },
    { icon: <FaCalendarDay />, text: "Xin nghỉ", path: "/xin-nghi" },
    { icon: <LuTimer />, text: "Xin đi trễ", path: "/xin-di-tre" },
    { icon: <FaBusinessTime />, text: "Tăng ca", path: "/tang-ca" },
  ];
  return (
    <div className="quick-access">
      {items.map((item, index) => (
        <div 
        key={index} 
        className="quick-item"
        onClick={() => item.path && navigate(item.path)}
        >
          <div className="icon">{item.icon}</div>
          <div className="text">{item.text}</div>
        </div>
      ))}
    </div>
  );
};

const WorkHistory = () => (
  <div>
    <div className="section-title">Lịch sử công</div>
    <div className="date">Ngày 24/02/2025</div>
    <div className="history-row">
      <span>Vào làm</span>
      <span>Đến trễ 23 phút</span>
    </div>
  </div>
);


const Dashboard = () => {
  return (
    <div className="container">
      <div className="content-profile">
      <Profile />
      </div>
      <div className="content">
        <div className="section-title-week">Lịch tuần - tháng 2 2025</div>
        <CalendarWeek />
      </div>
        <div className="section-title">Truy cập nhanh</div>
        <QuickAccess />
      <div className="content-history">
        <WorkHistory />
      </div>  
    </div>
  );
};

export default Dashboard;
