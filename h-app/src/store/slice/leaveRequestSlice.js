import React ,{ useState } from "react";

const useLeaveRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const sendLeaveRequest = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log("Dữ liệu gửi đi:", formData); // In ra console (giả lập API)

      // Giả lập API thành công
      setTimeout(() => {
        setSuccessMessage("Yêu cầu nghỉ đã được gửi thành công!");
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Không thể gửi yêu cầu nghỉ.");
      setLoading(false);
    }
  };

  return { sendLeaveRequest, loading, error, successMessage };
};

export default useLeaveRequest;
