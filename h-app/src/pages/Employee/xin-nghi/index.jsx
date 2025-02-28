import React, { useState } from "react";
import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import "../../../styles/xinnghi.css"; 
import "dayjs/locale/vi";

const { Option } = Select;

const LeaveRequest = () => {
  throw new Error("Lỗi test: Dashboard bị lỗi!");

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


export default LeaveRequest;
