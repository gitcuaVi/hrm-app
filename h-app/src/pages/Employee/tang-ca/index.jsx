import React from "react";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import OvertimeRequestForm from "./components/OvertimeRequestForm";
import useOvertimeRequest from "@/store/slice/overtimeRequestSlice";

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Đăng ký làm tăng ca</h2>

      {/* Hiển thị thông báo */}
      {loading && <Skeleton className="h-8 w-full mb-4" />}
      {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}
      {successMessage && <Alert variant="success" className="mb-4">{successMessage}</Alert>}

      {/* Form đăng ký tăng ca */}
      <OvertimeRequestForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default OvertimeRequest;
