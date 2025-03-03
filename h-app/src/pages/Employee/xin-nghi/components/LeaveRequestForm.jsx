"use client";

import React, { useState } from "react";
import "dayjs/locale/vi";
import {Form} from "@/components/ui/form"
import {Select} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"


const { Option } = Select;

const LeaveRequestForm = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();
  const [leaveType, setLeaveType] = useState("half-day");

  return (
    <Card className="leave-request-card">
      <Form form={form} layout="vertical" onFinish={onSubmit}>

        <Form.Item label="Loại nghỉ" name="leaveType" initialValue= "Nghỉ nửa ngày">
          <Select value={leaveType} onChange={setLeaveType}>
            <Option value="half-day">Nghỉ nửa ngày</Option>
            <Option value="full-day">Nghỉ một ngày</Option>
            <Option value="multiple-days">Nghỉ nhiều ngày</Option>
          </Select>
        </Form.Item>

        {leaveType === "half-day" && (
          <Form.Item label="Chọn buổi" name="session" initialValue="Buổi sáng">
            <Select>
              <Option value="morning">Buổi sáng</Option>
              <Option value="afternoon">Buổi chiều</Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item label="Ngày bắt đầu" name="startDate" placeholder="DD/MM/YYYY">
          <Calendar className="full-width" format="DD/MM/YYYY" />
        </Form.Item>

        {leaveType === "multiple-days" && (
          <Form.Item label="Ngày kết thúc" name="endDate">
            <Calendar className="full-width" format="DD/MM/YYYY" />
          </Form.Item>
        )}

        <Form.Item label="Lý do" name="reason" >
          <Input.TextArea rows={3} placeholder="Nhập lý do" />
        </Form.Item>

        <Button type="primary" block htmlType="submit" loading={loading}>
          Gửi yêu cầu
        </Button>
      </Form>
    </Card>
  );
};

export default LeaveRequestForm;
