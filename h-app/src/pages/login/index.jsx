import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Card } from "antd";
import { WebApp } from "@twa-dev/sdk";
import "antd/dist/reset.css";

export default function TelegramAuth() {
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    if (typeof WebApp !== "undefined" && WebApp.initDataUnsafe) {
      setUser(WebApp.initDataUnsafe.user);
    } else {
      console.warn("WebApp không hoạt động trong môi trường này.");
    }
  }, []);
  
const sendOtp = async () => {
  if (!user) return;
  try {
    const response = await axios.post("https://your-server.com/send-otp", { chatId: user.id });
    setMessage(response.data.message);
  } catch (error) {
    setMessage("Lỗi khi gửi OTP.");
  }
};


  const verifyOtp = async () => {
    try {
      const response = await axios.post("https://your-server.com/verify-otp", {
        chatId: user.id,
        otp: inputOtp,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("OTP không hợp lệ.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Card className="max-w-md w-full p-6 text-center">
        <h1 className="text-xl font-bold mb-4">Xác thực OTP</h1>
        {user ? (
          <>
            <p>Xin chào, {user.first_name}!</p>
            <Button className="mt-4" onClick={sendOtp}>Gửi OTP</Button>
            <Input className="mt-4" placeholder="Nhập OTP" onChange={(e) => setInputOtp(e.target.value)} />
            <Button className="mt-4" onClick={verifyOtp}>Xác minh</Button>
          </>
        ) : (
          <p>Vui lòng mở ứng dụng từ Telegram</p>
        )}
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </Card>
    </div>
  );
}
