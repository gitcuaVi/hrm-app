import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaMoneyCheckAlt, FaBusinessTime, FaCalendarDay, 
  FaRegUserCircle, FaCalendarAlt 
} from "react-icons/fa";
import { LuTimer } from "react-icons/lu";

const QuickAccess = () => {
  const navigate = useNavigate();
  const items = [
    { icon: <FaRegUserCircle />, text: "Thông tin", path: "/thong-tin" },
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

export default QuickAccess;
