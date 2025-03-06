import React from "react";
import Profile from "./profile";
import CalendarWeek from "./calendarWeek";
import QuickAccess from "./quickAccess";
import WorkHistory from "./workHistory";
import dayjs from "dayjs";

const Dashboard = () => {
  const currentMonth = dayjs().month()+1; 
  const currentYear = dayjs().year();
  return (
    <div className="container">
      <div className="content-profile">
        <Profile />
      </div>
      <div className="content">
        <div className="section-title-week">
        Lịch tuần - tháng {currentMonth} {currentYear}
        </div>
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
