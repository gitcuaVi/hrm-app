import React, { useState } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import "../../../styles/xinnghi.css"; 
import "dayjs/locale/vi";

const { Option } = Select;

const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState("half-day");
  const [session, setSession] = useState("morning");

  return (
    <div className="leave-container">
      <h2 className="form-title">Gửi yêu cầu xin nghỉ của bạn</h2>
      <div className="form-container">
      <Form layout="vertical">
        <Form.Item label="Loại nghỉ">
          <Select value={leaveType} onChange={(value) => setLeaveType(value)}>
            <Option value="half-day">Nghỉ nửa ngày</Option>
            <Option value="full-day">Nghỉ một ngày</Option>
            <Option value="multiple-days">Nghỉ nhiều ngày</Option>
          </Select>
        </Form.Item>

        {leaveType === "half-day" && (
          <Form.Item label="Chọn buổi">
             <Select value={session} onChange={setSession}>
              <Option value="morning">Buổi sáng</Option>
              <Option value="afternoon">Buổi chiều</Option>
            </Select>
          </Form.Item>
        )}

        <Form.Item label="Ngày bắt đầu">
          <DatePicker 
          className="full-width" 
          format="DD/MM/YYYY"  
          placeholder="mm/dd/yyyy"
          />
        </Form.Item>

        {leaveType === "multiple-days" && (
          <Form.Item label="Ngày kết thúc">
            <DatePicker 
            className="full-width" 
            format="DD/MM/YYYY" 
            placeholder="mm/dd/yyyy"
            />
          </Form.Item>
        )}

        <Form.Item label="Lý do">
          <Input.TextArea placeholder="Nhập lý do" rows={3} />
        </Form.Item>

        <Button type="primary" block className="submit-btn">
          Gửi yêu cầu
        </Button>
      </Form>
      </div>
    </div>
  );
};

export default LeaveRequest;
