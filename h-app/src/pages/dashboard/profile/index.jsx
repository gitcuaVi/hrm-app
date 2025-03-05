import React, { useState, useEffect } from "react";
import  {fetchTelegramUserData}  from "@/store/slice/profileidSlice";
import profileImg from "@/assets/profile.jpg";

const Profile = () => {
  const [user, setUser] = useState({
    id: null,
    name: "Đinh Hoàng Lượm",
    location: "BL-HCM",
    username: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchTelegramUserData();
      if (userData) {
        setUser((prevUser) => ({
          ...prevUser,
          ...userData,
        }));
      }
    };

    getUserData();
  }, []);

  return (
    <div className="profile">
      <img src={profileImg} alt="Profile" className="profile-img" />
      <div className="name">Tên: {user.name}</div>
      <div className="location">Địa điểm: {user.location}</div>
      <div className="username">Username: {user.username}</div>
      <div className="user-id">Telegram ID: {user.id || "Đang lấy..."}</div>
    </div>
  );
};

export default Profile;
