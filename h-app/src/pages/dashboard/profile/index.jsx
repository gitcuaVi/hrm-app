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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState({ id: "", name: "", username: "" });
  const [botMessage, setBotMessage] = useState("📭 Chưa có tin nhắn từ bot");

  useEffect(() => {
    const tg = TelegramWebApp;
    tg.ready();

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const { id, first_name, last_name, username } = tg.initDataUnsafe.user;
      const fullName = `${first_name} ${last_name || ""}`.trim();
      setUser({ id, name: fullName, username: username || "Không có username" });

      // Gọi API lấy tin nhắn bot mới nhất
      fetch(`${API_BASE_URL}/messages/${id}`)
        .then((res) => res.json())
        .then((data) => setBotMessage(data.text || "📭 Chưa có tin nhắn từ bot"))
        .catch((error) => console.error("❌ Lỗi khi lấy tin nhắn từ bot:", error));
    }
  }, []);

  return (
    <div className="profile">
      <h3>Thông tin người dùng</h3>
      <p><strong>Tên:</strong> {user.name}</p>
      <p><strong>ID:</strong> {user.id}</p>
      
      <h3>💬 Tin nhắn từ bot:</h3>
      <div className="bot-message">{botMessage}</div>
    </div>
  );
};

export default Profile;
