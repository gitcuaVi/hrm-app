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

      // Gọi API để lấy tin nhắn của user
      const fetchMessages = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/messages/${id}`);
          if (!response.ok) throw new Error("Lỗi khi lấy tin nhắn");

          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error("❌ Lỗi khi lấy tin nhắn:", error);
        }
      };

      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // Lấy tin nhắn mỗi 3s

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="profile">
      <h2>Thông tin người dùng</h2>
      <p><strong>Tên:</strong> {user.name}</p>
      <p><strong>ID:</strong> {user.id}</p>

      <h3>Tin nhắn:</h3>
      <div className="messages">
        {messages.length === 0 ? (
          <p>Chưa có tin nhắn nào</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <strong>{msg.sender === "bot" ? "📩 Bot" : "👤 Bạn"}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
