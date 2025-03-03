import React from "react";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import LateRequestForm from "./components/LateRequestForm"; 
import useLateRequest from "@/store/slice/lateRequestSlice"; 
import "@/styles/xinditre.css";

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gửi yêu cầu xin đi trễ / về sớm</h2>

      {/* Hiển thị thông báo */}
      {loading && <Skeleton className="h-8 w-full mb-4" />}
      {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}
      {successMessage && <Alert variant="success" className="mb-4">{successMessage}</Alert>}

      {/* Form đăng ký đi trễ/về sớm */}
      <LateRequestForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default LateRequest;
