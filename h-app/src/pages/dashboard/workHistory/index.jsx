import React, { useEffect, useState } from "react";

const WorkHistory = () => {
  const [workHistory, setWorkHistory] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu API trả về
    const fakeData = [
      { time: "2025-03-01 08:00", status: "Check-in" },
      { time: "2025-03-01 17:00", status: "Check-out" },
    ];

    // Giả lập độ trễ API (giống như đang fetch dữ liệu)
    setTimeout(() => {
      setWorkHistory(fakeData);
    }, 1000);
  }, []);

  return (
    <div>
      <div className="section-title">Lịch sử công</div>
      {workHistory.length > 0 ? (
        workHistory.map((entry, index) => (
          <div key={index} className="history-row">
            <span>{entry.time}</span>
            <span>{entry.status}</span>
          </div>
        ))
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default WorkHistory;
