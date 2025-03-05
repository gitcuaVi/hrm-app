import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import profileImg from "@/assets/profile.jpg";

const Profile = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");

    const [user, setUser] = useState({
        id: userId || "Không có ID",
        name: "Đang tải...",
        username: "Đang tải...",
    });

    useEffect(() => {
        if (userId) {
            fetch(`https://your-backend.com/getUser?id=${userId}`)
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch(() => setUser({ id: userId, name: "Không tìm thấy", username: "Không có dữ liệu" }));
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
