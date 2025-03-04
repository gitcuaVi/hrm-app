import React ,{ useState } from "react";

const useLateRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const sendLateRequest = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log("Dữ liệu gửi đi:", formData); // In ra console (giả lập API)

      // Giả lập API thành công
      setTimeout(() => {
        setSuccessMessage("Yêu cầu đi trễ / về sớm đã được gửi thành công!");
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Không thể gửi yêu cầu.");
      setLoading(false);
    }
  };

  return { sendLateRequest, loading, error, successMessage };
};

export default useLateRequest;
