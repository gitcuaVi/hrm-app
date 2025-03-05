// import React, { useState, useEffect } from "react";
// import { Button, Input, Typography, message } from "antd";
// import { useNavigate } from "react-router-dom";

// const { Title, Text } = Typography;

// const OtpPage = () => {
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState(sessionStorage.getItem("otp") || "");
//   const [isVerified, setIsVerified] = useState(false);
//   const [error, setError] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isOtpExpired, setIsOtpExpired] = useState(true);
//   const navigate = useNavigate();

//   // Xóa trạng thái xác thực khi tải lại trang
//   useEffect(() => {
//     sessionStorage.removeItem("isVerified");
//     sessionStorage.removeItem("otp");
//     sessionStorage.removeItem("otpExpiry");
//   }, []);

//   // Tạo OTP mới
//   const generateOtp = () => {
//     const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiryTime = Date.now() + 60000;

//     sessionStorage.setItem("otp", newOtp);
//     sessionStorage.setItem("otpExpiry", expiryTime.toString());

//     setGeneratedOtp(newOtp);
//     setIsVerified(false);
//     setError(null);
//     setTimeLeft(60);
//     setIsOtpExpired(false);

//     message.success(`Mã OTP của bạn: ${newOtp} (Hết hạn sau 1 phút)`);
//   };

//   // Xác minh OTP
//   const verifyOtp = () => {
//     if (otp === generatedOtp) {
//       setIsVerified(true);
//       sessionStorage.setItem("isVerified", "true");
//       message.success("Xác minh thành công!");

//       setTimeout(() => navigate("/dashboard"), 1500);
//     } else {
//       setError("❌ OTP không hợp lệ hoặc đã hết hạn.");
//       message.error("OTP không hợp lệ hoặc đã hết hạn.");
//     }
//   };

//   // Cập nhật bộ đếm ngược
//   useEffect(() => {
//     const expiryTime = sessionStorage.getItem("otpExpiry");

//     if (expiryTime) {
//       const timeRemaining = Math.max(0, Math.floor((Number(expiryTime) - Date.now()) / 1000));
//       setTimeLeft(timeRemaining);

//       const timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             sessionStorage.removeItem("otp");
//             sessionStorage.removeItem("otpExpiry");
//             setGeneratedOtp("");
//             setIsOtpExpired(true);
//             message.warning("⏳ OTP đã hết hạn, vui lòng nhận lại.");
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [generatedOtp]);

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
//       <Title level={3}>Xác thực OTP</Title>
//       <Button type="primary" onClick={generateOtp} disabled={!isOtpExpired} style={{ marginBottom: 20 }}>
//         📩 Nhận OTP
//       </Button>
//       {generatedOtp && timeLeft > 0 && (
//         <Text type="secondary">🔑 Mã OTP: {generatedOtp} (Hết hạn sau {timeLeft}s)</Text>
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
//       {error && <Text type="danger">{error}</Text>}
//       {isVerified && <Text type="success">✅ Bạn đã xác minh thành công!</Text>}
//     </div>
//   );
// };

// export default OtpPage;



import React, { useState, useEffect } from "react";
import { Button, Input, Typography, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Title, Text } = Typography;

const OtpPage = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id"); // Lấy ID từ URL
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState(sessionStorage.getItem("otp") || "");
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isOtpExpired, setIsOtpExpired] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("isVerified");
        sessionStorage.removeItem("otp");
        sessionStorage.removeItem("otpExpiry");
    }, []);

    const generateOtp = () => {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = Date.now() + 60000;

        sessionStorage.setItem("otp", newOtp);
        sessionStorage.setItem("otpExpiry", expiryTime.toString());

        setGeneratedOtp(newOtp);
        setIsVerified(false);
        setError(null);
        setTimeLeft(60);
        setIsOtpExpired(false);

        message.success(`🔑 Mã OTP của bạn: ${newOtp} (Hết hạn sau 1 phút)`);
    };

    const verifyOtp = () => {
        if (otp === generatedOtp) {
            setIsVerified(true);
            sessionStorage.setItem("isVerified", "true");
            message.success("✅ Xác minh thành công!");
            setTimeout(() => navigate(`/profile?id=${userId}`), 1500);
        } else {
            setError("❌ OTP không hợp lệ hoặc đã hết hạn.");
            message.error("OTP không hợp lệ hoặc đã hết hạn.");
        }
    };

    useEffect(() => {
        const expiryTime = sessionStorage.getItem("otpExpiry");
        if (expiryTime) {
            const timeRemaining = Math.max(0, Math.floor((Number(expiryTime) - Date.now()) / 1000));
            setTimeLeft(timeRemaining);

            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        sessionStorage.removeItem("otp");
                        sessionStorage.removeItem("otpExpiry");
                        setGeneratedOtp("");
                        setIsOtpExpired(true);
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
            <Input placeholder="Nhập mã OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} style={{ marginBottom: 10, textAlign: "center" }} />
            <Button type="primary" onClick={verifyOtp} disabled={!generatedOtp}>
                🔑 Xác minh OTP
            </Button>
            {error && <Text type="danger">{error}</Text>}
            {isVerified && <Text type="success">✅ Bạn đã xác minh thành công!</Text>}
        </div>
    );
};

export default OtpPage;
