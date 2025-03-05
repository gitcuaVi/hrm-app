import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import profileImg from "@/assets/profile.jpg";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const userParam = searchParams.get("user");

  const [user, setUser] = useState({
    id: "Không có ID",
    name: "Chưa có dữ liệu",
    username: "Chưa có username",
  });

  useEffect(() => {
    if (userParam) {
      try {
        console.log("📥 Dữ liệu từ URL trước decode:", userParam);
        const decodedUser = JSON.parse(decodeURIComponent(userParam));
  
        console.log("✅ Dữ liệu sau decode:", decodedUser);
        setUser(decodedUser);
        localStorage.setItem("telegramUser", JSON.stringify(decodedUser));
      } catch (error) {
        console.error("❌ Lỗi khi giải mã JSON:", error);
      }
    } else {
      const storedUser = localStorage.getItem("telegramUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [userParam]);
  

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
