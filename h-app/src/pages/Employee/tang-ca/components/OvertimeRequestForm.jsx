
import React, { useEffect } from "react";
import { Button, Card, DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";

const { Option } = Select;

const OvertimeRequestForm = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      date: dayjs(),
      shift: "Ca sáng",
      overtimeHours: "2 tiếng",
    });
  }, [form]);

  return (
    <Card className="overtime-request-card">
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {/* Chọn ngày đăng ký */}
        <Form.Item label="Ngày đăng ký" name="date"> 
          <DatePicker className="full-width" format="DD/MM/YYYY" />
        </Form.Item>
        
        {/* Chọn ca làm */}
        <Form.Item label="Ca làm" name="shift"> 
          <Select className="full-width">
            <Option value="Ca sáng">Ca sáng</Option>
            <Option value="Ca trưa">Ca trưa</Option>
            <Option value="Ca tối">Ca tối</Option>
          </Select>
        </Form.Item>
        
        {/* Chọn số giờ tăng ca */}
        <Form.Item label="Số giờ tăng ca" name="overtimeHours" > 
          <Select className="full-width">
            <Option value="2 tiếng">2 tiếng</Option>
            <Option value="4 tiếng">4 tiếng</Option>
            <Option value="6 tiếng">6 tiếng</Option>
          </Select>
        </Form.Item>
        
        {/* Nút gửi */}
        <Button
          type="primary"
          className="submit-btn" 
          htmlType="submit" 
          loading={loading}>
            Gửi yêu cầu
        </Button>
      </Form>
    </Card>
  );
};

export default OvertimeRequestForm;
