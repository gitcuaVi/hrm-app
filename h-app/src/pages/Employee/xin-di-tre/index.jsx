import React, { useState } from "react";
import { Spin, Typography } from "antd";
import LateRequestForm from "./components/LateRequestForm"; 
import useLateRequest from "@/store/slice/lateRequestSlice"; 
import "@/styles/xinditre.css";

const { Text } = Typography;

const LateRequest = () => {
  const { sendLateRequest, loading, error, successMessage } = useLateRequest();

  const handleSubmit = (values) => {
    const requestData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      time: values.time.format("HH:mm"),
    };
    sendLateRequest(requestData);
  };

  return (
    <div>
      <h2 className="form-title">Gửi yêu cầu xin đi trễ / về sớm</h2>

      {loading && <Spin size="large" style={{ display: "block", margin: "10px auto" }} />}
      {error && <Text type="danger">{error}</Text>}
      {successMessage && <Text type="success">{successMessage}</Text>}

      <LateRequestForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default LateRequest;
