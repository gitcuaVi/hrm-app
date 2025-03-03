import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Card, message as antdMessage } from "antd";
import { WebApp } from "@twa-dev/sdk";
import "antd/dist/reset.css";

export default function AuthPage() {
  const [user, setUser] = useState(null);
  const [inputOtp, setInputOtp] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
      antdMessage.success("OTP đã được gửi!");
    } catch (error) {
      antdMessage.error("Lỗi khi gửi OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("https://your-server.com/verify-otp", {
        chatId: user.id,
        otp: inputOtp,
      });
      antdMessage.success("✅ Xác thực thành công!");
      setIsAuthenticated(true);
    } catch (error) {
      antdMessage.error("❌ OTP không hợp lệ.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Card className="max-w-md w-full p-6 text-center">
        <h1 className="text-xl font-bold mb-4">Xác thực OTP</h1>
        {user ? (
          isAuthenticated ? (
            <p className="text-green-500 font-semibold">🎉 Bạn đã xác thực thành công!</p>
          ) : (
            <>
              <p>Xin chào, {user.first_name}!</p>
              <Button className="mt-4" type="primary" onClick={sendOtp}>Gửi OTP</Button>
              <Input 
                className="mt-4" 
                placeholder="Nhập OTP" 
                onChange={(e) => setInputOtp(e.target.value)} 
              />
              <Button className="mt-4" type="primary" onClick={verifyOtp}>Xác minh</Button>
            </>
          )
        ) : (
          <p>Vui lòng mở ứng dụng từ Telegram</p>
        )}
      </Card>
    </div>
  );
}
