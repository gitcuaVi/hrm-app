import React ,{ useState } from "react";

const Dashboard = () => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error("🔥 Lỗi giả lập trong Dashboard!");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setError(true)}>Gây lỗi</button>
    </div>
  );
};

export default Dashboard;
