import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import profileImg from "@/assets/profile.jpg";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [user, setUser] = useState({
    id: "Không có ID",
    name: "Chưa có dữ liệu",
    username: "Chưa có username",
  });

  useEffect(() => {
    if (userId) {
      const storedUser = localStorage.getItem(`user_${userId}`);
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Lấy từ localStorage nếu có
      } else {
        fetch(`http://localhost:3000/users?id=${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Không tìm thấy dữ liệu");
          }
          return res.json();
        })
        .then((data) => {
          if (data.length > 0) {
            setUser(data[0]); // Lấy phần tử đầu tiên
            localStorage.setItem(`user_${userId}`, JSON.stringify(data[0]));
          } else {
            console.error("❌ Không tìm thấy người dùng");
          }
        })
        .catch((error) => console.error("❌ Lỗi khi lấy dữ liệu:", error));      
      }
    }
  }, [userId]);

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
