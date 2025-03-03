"use client";

import React from "react";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import LeaveRequestForm from "./components/LeaveRequestForm";
import useLeaveRequest from "@/store/slice/leaveRequestSlice"; 

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gửi yêu cầu xin nghỉ</h2>

      {/* Hiển thị thông báo */}
      {loading && <Skeleton className="h-8 w-full mb-4" />}
      {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}
      {successMessage && <Alert variant="success" className="mb-4">{successMessage}</Alert>}

      {/* Form xin nghỉ */}
      <LeaveRequestForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default LeaveRequest;
