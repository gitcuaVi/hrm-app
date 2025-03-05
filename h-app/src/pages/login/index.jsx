import React, { useState, useEffect } from "react";
import { Button, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(localStorage.getItem("otp") || "");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isOtpExpired, setIsOtpExpired] = useState(true); //  Trạng thái kiểm soát OTP hết hạn
  const navigate = useNavigate();

  // Tạo OTP mới
  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 60000; // ⏳ Hết hạn sau 1 phút (60,000ms)

    localStorage.setItem("otp", newOtp);
    localStorage.setItem("otpExpiry", expiryTime.toString());

    setGeneratedOtp(newOtp);
    setIsVerified(false);
    setError(null);
    setTimeLeft(60); // 🕒 Bắt đầu đếm ngược 60 giây
    setIsOtpExpired(false); // Ngăn chặn việc nhận OTP mới

    message.success(`Mã OTP của bạn: ${newOtp} (Hết hạn sau 1 phút)`);
  };

  // Xác minh OTP
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setIsVerified(true);
      localStorage.setItem("isVerified", "false"); // Lưu trạng thái xác thực
      message.success("Xác minh thành công!");

      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setError("❌ OTP không hợp lệ hoặc đã hết hạn.");
      message.error(" OTP không hợp lệ hoặc đã hết hạn.");
    }
  };

  // Cập nhật bộ đếm ngược
  useEffect(() => {
    const expiryTime = localStorage.getItem("otpExpiry");

    if (expiryTime) {
      const timeRemaining = Math.max(0, Math.floor((Number(expiryTime) - Date.now()) / 1000));
      setTimeLeft(timeRemaining);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            localStorage.removeItem("otp");
            localStorage.removeItem("otpExpiry");
            setGeneratedOtp(""); 
            setIsOtpExpired(true); //  Cho phép nhận lại OTP
            message.warning("⏳ OTP đã hết hạn, vui lòng nhận lại.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [generatedOtp]);

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <Title level={3}>Xác thực OTP</Title>
      <Button type="primary" onClick={generateOtp} disabled={!isOtpExpired} style={{ marginBottom: 20 }}>
        📩 Nhận OTP
      </Button>
      {generatedOtp && timeLeft > 0 && (
        <Text type="secondary">🔑 Mã OTP: {generatedOtp} (Hết hạn sau {timeLeft}s)</Text>
      )}
      <br />
      <Input
        placeholder="Nhập mã OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        style={{ marginBottom: 10, textAlign: "center" }}
      />
      <Button type="primary" onClick={verifyOtp} disabled={!generatedOtp}>
        🔑 Xác minh OTP
      </Button>
      {error && <Text type="danger">{error}</Text>}
      {isVerified && <Text type="success">✅ Bạn đã xác minh thành công!</Text>}
    </div>
  );
};

export default OtpPage;
