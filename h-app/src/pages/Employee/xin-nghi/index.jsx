


import React, { useState } from "react";
import { Spin, Typography } from "antd";
import LeaveRequestForm from "./components/LeaveRequestForm";
import useLeaveRequest from "@/store/slice/leaveRequestSlice"; 

const { Text } = Typography;

const LeaveRequest = () => {
  const { sendLeaveRequest, loading, error, successMessage } = useLeaveRequest();

  const handleSubmit = (values) => {
    const leaveData = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
    };
    sendLeaveRequest(leaveData);
  };

  return (
    <div>
      <h2 className="form-title">Gửi yêu cầu xin nghỉ</h2>

      {loading && <Spin size="large" style={{ display: "block", margin: "10px auto" }} />}
      {error && <Text type="danger">{error}</Text>}
      {successMessage && <Text type="success">{successMessage}</Text>}

      <LeaveRequestForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default LeaveRequest;
