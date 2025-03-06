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

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const userId = "7117817382"; // ID Telegram của user
const socket = io("http://localhost:5000"); // Kết nối WebSocket

const BotMessage = () => {
  const [botMessage, setBotMessage] = useState("📭 Đang tải tin nhắn...");

  useEffect(() => {
    // Lấy tin nhắn lần đầu
    fetch(`http://localhost:5000/latest-message/${userId}`)
      .then((res) => res.json())
      .then((data) => setBotMessage(data.text))
      .catch((error) => console.error("❌ Lỗi khi lấy tin nhắn:", error));

    // Lắng nghe sự kiện WebSocket
    socket.on(`message:${userId}`, (newMessage) => {
      setBotMessage(newMessage);
    });

    return () => {
      socket.off(`message:${userId}`);
    };
  }, []);

  return (
    <div>
      <h3>📩 Tin nhắn từ bot:</h3>
      <p>{botMessage}</p>
    </div>
  );
};

export default BotMessage;

