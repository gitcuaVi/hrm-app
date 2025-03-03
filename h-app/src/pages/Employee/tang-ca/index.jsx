import { useState } from "react";
import { Spin, Typography } from "antd";
import OvertimeRequestForm from "./components/OvertimeRequestForm";
import useOvertimeRequest from "@/store/slice/overtimeRequestSlice"; 

const { Text } = Typography;

const OvertimeRequest = () => {
  const { sendOvertimeRequest, loading, error, successMessage } = useOvertimeRequest();

  const handleSubmit = (values) => {
    const requestData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };
    sendOvertimeRequest(requestData);
  };

  return (
    <div>
      <h2 className="form-title">Đăng ký làm tăng ca</h2>

      {/* Hiển thị thông báo nếu có */}
      {loading && <Spin size="large" style={{ display: "block", margin: "10px auto" }} />}
      {error && <Text type="danger">{error}</Text>}
      {successMessage && <Text type="success">{successMessage}</Text>}

      {/* Form đăng ký tăng ca */}
      <OvertimeRequestForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default OvertimeRequest;
