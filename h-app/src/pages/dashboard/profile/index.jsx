import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Dùng để lấy query từ URL
import profileImg from "@/assets/profile.jpg";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id"); // Lấy ID từ URL

  const [user, setUser] = useState({
    id: userId || "Không có ID",
    name: "Chưa có dữ liệu",
    username: "Chưa có username",
  });

  useEffect(() => {
    if (userId) {
      fetch(`https://your-server.com/getUser?id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu người dùng:", error));
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
