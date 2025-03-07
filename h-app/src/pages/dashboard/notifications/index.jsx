import React from "react";
import "@/styles/thongbao.css";

const NotificationPage = () => {
  const requests = [
    {
      title: "Nghỉ nửa ngày (Buổi sáng)",
      date: "06/03/2025",
      reason: "ssss",
    },
    {
      title: "Nghỉ nửa ngày (Buổi sáng)",
      date: "06/03/2025",
      reason: "ssss",
    },
  ];

  return (
    <div className="notif-container">
      <h2 className="notif-title">Danh sách yêu cầu đã gửi</h2>

      <div className="notif-request-list">
        {requests.map((request, index) => (
          <div key={index} className="notif-request-card">
            <p className="notif-request-title">{request.title}</p>
            <p className="notif-request-date">Từ ngày {request.date}</p>
            <p className="notif-request-reason">Lý do: {request.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;



