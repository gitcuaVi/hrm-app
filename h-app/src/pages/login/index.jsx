import React, { useEffect, useState } from "react";
import axios from "axios";
import { WebApp } from "@twa-dev/sdk";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function TelegramAuth() {
  const [user, setUser] = useState(null);
  const [inputOtp, setInputOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (typeof WebApp !== "undefined" && WebApp.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user);
    } else {
      console.warn("WebApp không hoạt động trong môi trường này.");
    }
  }, []);

  const sendOtp = async () => {
    if (!user) {
      setMessage("Vui lòng mở ứng dụng từ Telegram.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://your-server.com/send-otp", { chatId: user.id });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Lỗi khi gửi OTP. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!inputOtp) {
      setMessage("Vui lòng nhập mã OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://your-server.com/verify-otp", {
        chatId: user.id,
        otp: inputOtp,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("OTP không hợp lệ hoặc đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Card className="max-w-md w-full p-6 text-center">
        <h1 className="text-xl font-bold mb-4">Xác thực OTP</h1>

        {user ? (
          <>
            <p>Xin chào, <span className="font-semibold">{user.first_name}</span>!</p>

            {loading ? (
              <Skeleton className="h-10 w-full mt-4" />
            ) : (
              <>
                <Button className="mt-4 w-full" onClick={sendOtp}>Gửi OTP</Button>
                <Input 
                  className="mt-4"
                  placeholder="Nhập OTP"
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                />
                <Button className="mt-4 w-full" onClick={verifyOtp}>Xác minh</Button>
              </>
            )}
          </>
        ) : (
          <p className="text-red-500">Vui lòng mở ứng dụng từ Telegram.</p>
        )}

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </Card>
    </div>
  );
}
