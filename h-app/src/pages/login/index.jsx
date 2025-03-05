// import React, { useState, useEffect } from "react";
// import { Button, Input, Typography, message } from "antd";
// import { useNavigate } from "react-router-dom";

// const { Title, Text } = Typography;

// const OtpPage = () => {
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [timeLeft, setTimeLeft] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     sessionStorage.removeItem("isVerified");
//   }, []);

//   const generateOtp = async () => {
//     const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOtp(newOtp);
//     setTimeLeft(60);

//     message.success(`Mã OTP của bạn: ${newOtp}`);
//   };

//   const verifyOtp = async () => {
//     if (otp === generatedOtp) {
//       try {
//         const response = await fetch("https://your-api.com/verify-otp", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ otp })
//         });
        
//         if (response.ok) {
//           sessionStorage.setItem("isVerified", "true");
//           message.success("Xác minh thành công!");
//           navigate("/dashboard");
//         } else {
//           message.error("Xác minh thất bại!");
//         }
//       } catch (error) {
//         message.error("Lỗi kết nối đến server");
//       }
//     } else {
//       message.error("OTP không hợp lệ hoặc đã hết hạn.");
//     }
//   };

//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setGeneratedOtp("");
//     }
//   }, [timeLeft]);

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
//       <Title level={3}>Xác thực OTP</Title>
//       <Button type="primary" onClick={generateOtp} disabled={timeLeft > 0}>
//         📩 Nhận OTP
//       </Button>
//       {generatedOtp && timeLeft > 0 && (
//         <Text type="secondary">🔑 OTP: {generatedOtp} (Hết hạn sau {timeLeft}s)</Text>
//       )}
//       <br />
//       <Input
//         placeholder="Nhập mã OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         maxLength={6}
//         style={{ marginBottom: 10, textAlign: "center" }}
//       />
//       <Button type="primary" onClick={verifyOtp} disabled={!generatedOtp}>
//         🔑 Xác minh OTP
//       </Button>
//     </div>
//   );
// };

// export default OtpPage;


import React, { useState, useEffect } from "react";
import { Button, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("isVerified");
  }, []);

  const generateOtp = async () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setTimeLeft(60);

    message.success(`Mã OTP của bạn: ${newOtp}`);
  };

  const verifyOtp = async () => {
    if (otp === generatedOtp) {
      sessionStorage.setItem("isVerified", "true");
      message.success("Xác minh thành công!");
      navigate("/dashboard");
    } else {
      message.error("OTP không hợp lệ hoặc đã hết hạn.");
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGeneratedOtp("");
    }
  }, [timeLeft]);

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <Title level={3}>Xác thực OTP</Title>
      <Button type="primary" onClick={generateOtp} disabled={timeLeft > 0}>
        📩 Nhận OTP
      </Button>
      {generatedOtp && timeLeft > 0 && (
        <Text type="secondary">🔑 OTP: {generatedOtp} (Hết hạn sau {timeLeft}s)</Text>
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
    </div>
  );
};

export default OtpPage;
