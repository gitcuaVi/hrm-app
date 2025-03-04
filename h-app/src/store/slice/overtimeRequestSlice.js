import React ,{ useState } from "react";

const useOvertimeRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const sendOvertimeRequest = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      console.log("Dữ liệu gửi đi:", formData); 

      setTimeout(() => {
        setSuccessMessage("Yêu cầu tăng ca đã được gửi thành công!");
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Không thể gửi yêu cầu.");
      setLoading(false);
    }
  };

  return { sendOvertimeRequest, loading, error, successMessage };
};

export default useOvertimeRequest;
