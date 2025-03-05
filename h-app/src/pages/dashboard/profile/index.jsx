import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import profileImg from "@/assets/profile.jpg";

const Profile = () => {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState({
        id: "Không có ID",
        name: "Đang tải...",
        username: "Đang tải...",
    });

    useEffect(() => {
        // Lấy thông tin từ URL nếu có
        const userId = searchParams.get("id");
        const name = searchParams.get("name");
        const username = searchParams.get("username");

        if (userId && name && username) {
            setUser({ id: userId, name, username });
        } else if (window.Telegram?.WebApp) {
            // Nếu URL không có dữ liệu, lấy từ Telegram WebApp API
            const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
            if (tgUser) {
                setUser({
                    id: tgUser.id,
                    name: `${tgUser.first_name} ${tgUser.last_name || ""}`,
                    username: tgUser.username || "Không có",
                });
            }
        }
    }, [searchParams]);

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
