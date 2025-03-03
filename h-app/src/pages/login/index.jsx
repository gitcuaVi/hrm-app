import { useEffect, useState } from "react";
import { Button, Card } from "antd";
import QRCode from "react-qr-code";
import { WebApp } from "@twa-dev/sdk";
import { useNavigate } from "react-router-dom";   

export default function TelegramAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const telegramLink = "https://t.me/app-hrm-mini?start";
  
  useEffect(() => {
    try {
      if (!WebApp || !WebApp.initData) {
        setError("WebApp không hoạt động trong môi trường này.");
        return;
      }

      WebApp.ready();
      WebApp.expand();
      WebApp.requestViewport({ height: window.innerHeight });

      if (WebApp.initDataUnsafe?.user) {
        setUser(WebApp.initDataUnsafe.user);
        setTimeout(() => navigate("/dashboard"), 500); // Delay để tránh lỗi navigate
      } else {
        setError("Không thể xác thực người dùng. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Lỗi khi khởi tạo Telegram WebApp.");
      console.error(err);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="max-w-md w-full p-6 text-center">
        <h1 className="text-xl font-bold mb-4">Xác thực Telegram</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : user ? (
          <div>
            <p className="text-lg">Xin chào, {user.first_name}!</p>
            <img
              src={user.photo_url}
              alt={user.first_name}
              className="rounded-full w-24 h-24 mx-auto mt-2"
            />
            <p className="mt-2">ID: {user.id}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-2">Quét mã QR để đăng nhập:</p>
            <QRCode value={telegramLink} size={150} />
            <Button className="mt-4" onClick={() => window.open(telegramLink, "_blank")}>
              Hoặc nhấn vào đây
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
