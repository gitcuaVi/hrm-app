import React, { useState, useEffect } from "react";
import TelegramWebApp from "@twa-dev/sdk";
import profileImg from "@/assets/profile.jpg";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState({
    id: "Không có ID",
    name: "Chưa có dữ liệu",
    username: "Chưa có username",
  });

  useEffect(() => {
    const tg = TelegramWebApp;
    tg.ready();

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const { id, first_name, last_name, username } = tg.initDataUnsafe.user;
      const fullName = `${first_name} ${last_name || ""}`.trim();

      setUser({ id, name: fullName, username: username || "Không có username" });

      // Gọi API để lấy thông tin từ backend
      fetch(`${API_BASE_URL}${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Không tìm thấy dữ liệu");
          }
          return res.json();
        })
        .then((data) => {
          setUser((prev) => ({ ...prev, ...data }));
        })
        .catch((error) => console.error("❌ Lỗi khi lấy dữ liệu:", error));
    }
  }, []);

  return (
    <div className="profile">
      <img src={profileImg} alt="Profile" className="profile-img" />
      <div className="name">{user.name}</div>
      <div className="user-id">{user.id}</div>
    </div>
  );
};

export default Profile;


// import React, { useState, useEffect } from "react";

// const API_URL = "http://localhost:3000/latest-message"; // Thay URL backend của bạn

// const Messages = () => {
//   const [message, setMessage] = useState("Chưa có tin nhắn mới");

//   useEffect(() => {
//     const fetchLatestMessage = async () => {
//       try {
//         const response = await fetch(API_URL);
//         const data = await response.json();
//         setMessage(data.message);
//       } catch (error) {
//         console.error("❌ Lỗi khi lấy tin nhắn mới:", error);
//       }
//     };

//     const interval = setInterval(fetchLatestMessage, 3000); // Cập nhật mỗi 3 giây
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="messages">
//       <h2>📩 Tin nhắn mới</h2>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Messages;
