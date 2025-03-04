import React, { useState } from "react";
import { Button, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(localStorage.getItem("otp") || "");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 📌 Tạo OTP mới
  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    localStorage.setItem("otp", newOtp); // Lưu OTP tạm thời
    setIsVerified(false);
    setError(null);
    message.success(`Mã OTP của bạn: ${newOtp} (Hết hạn sau 5 phút)`);

    setTimeout(() => {
      setGeneratedOtp("");
      localStorage.removeItem("otp");
    }, 300000);
  };

  // 📌 Xác minh OTP
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setIsVerified(true);
      localStorage.setItem("isVerified", "true"); // ✅ Lưu trạng thái xác thực
      message.success("✅ Xác minh thành công!");
      
      // ✅ Chuyển hướng đến trang chính
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setError("❌ OTP không hợp lệ hoặc đã hết hạn.");
      message.error("❌ OTP không hợp lệ hoặc đã hết hạn.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <Title level={3}>Xác thực OTP</Title>
      <Button type="primary" onClick={generateOtp} style={{ marginBottom: 20 }}>
        📩 Nhận OTP
      </Button>
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
