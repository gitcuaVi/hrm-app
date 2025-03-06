// import React, { useState, useEffect } from "react";
// import TelegramWebApp from "@twa-dev/sdk";
// import profileImg from "@/assets/profile.jpg";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const Profile = () => {
//   const [user, setUser] = useState({
//     id: "Không có ID",
//     name: "Chưa có dữ liệu",
//     username: "Chưa có username",
//   });

//   useEffect(() => {
//     const tg = TelegramWebApp;
//     tg.ready();

//     if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
//       const { id, first_name, last_name, username } = tg.initDataUnsafe.user;
//       const fullName = `${first_name} ${last_name || ""}`.trim();

//       setUser({ id, name: fullName, username: username || "Không có username" });

//       // Gọi API để lấy thông tin từ backend
//       fetch(`${API_BASE_URL}${id}`)
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Không tìm thấy dữ liệu");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setUser((prev) => ({ ...prev, ...data }));
//         })
//         .catch((error) => console.error("❌ Lỗi khi lấy dữ liệu:", error));
//     }
//   }, []);

//   return (
//     <div className="profile">
//       <img src={profileImg} alt="Profile" className="profile-img" />
//       <div className="name">{user.name}</div>
//       <div className="user-id">{user.id}</div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from "react";
import TelegramWebApp from "@twa-dev/sdk";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Profile = () => {
  const [user, setUser] = useState({
    id: "Không có ID",
    name: "Chưa có dữ liệu",
    username: "Chưa có username",
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const tg = TelegramWebApp;
    tg.ready();
  
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const { id, first_name, last_name, username } = tg.initDataUnsafe.user;
      const fullName = `${first_name} ${last_name || ""}`.trim();
      setUser({ id, name: fullName, username: username || "Không có username" });
  
      // Gọi API lấy tin nhắn của đúng user này
      fetch(`${API_BASE_URL}/messages/${id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error("❌ Lỗi khi lấy tin nhắn:", error));
    }
  
    // Cập nhật tin nhắn mỗi 3 giây
    const interval = setInterval(() => {
      fetch(`${API_BASE_URL}/messages/${id}`)
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error("❌ Lỗi khi lấy tin nhắn:", error));
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="profile">
      <h3>💬 Tin nhắn:</h3>
      <ul className="messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.name}</strong>: {msg.text} <br />
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>📭 Chưa có tin nhắn nào</p>
        )}
      </ul>
    </div>
  );
};

export default Profile;
