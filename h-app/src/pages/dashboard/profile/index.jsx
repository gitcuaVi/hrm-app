import React, { useState, useEffect } from "react";
import profileImg from "@/assets/profile.jpg";

const Profile = () => {
  const [user, setUser] = useState({
    id: "Đang lấy...",
    name: "Đang lấy...",
    username: "Đang lấy...",
  });

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const userData = tg.initDataUnsafe.user;

      console.log("🚀 Dữ liệu nhận được từ Telegram:", userData);

      if (userData) {
        setUser({
          id: userData.id || "Không có ID",
          name: `${userData.first_name} ${userData.last_name || ""}`,
          username: userData.username || "Không có username",
        });
      }
    } else {
      console.log("❌ Telegram WebApp SDK chưa hoạt động!");
    }
  }, []);

  return (
    <div className="profile">
      <img src={profileImg} alt="Profile" className="profile-img" />
      <div className="name">Tên: {user.name}</div>
      <div className="username">Username: {user.username}</div>
      <div className="user-id">Telegram ID: {user.id}</div>
    </div>
  );
};

export default Profile;
