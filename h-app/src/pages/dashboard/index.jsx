
import Profile from "./profile";
import CalendarWeek from "./calendarWeek";
import QuickAccess from "./quickAccess";
import WorkHistory from "./workHistory";

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
