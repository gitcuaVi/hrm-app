import React, { useEffect, useState } from "react";

const WorkHistory = () => {
  const [workHistory, setWorkHistory] = useState([]);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => setWorkHistory(data))
      .catch((error) => console.error("Lỗi khi lấy lịch sử công:", error));
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
