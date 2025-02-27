import React, { useEffect } from "react";
import { Button, Card, DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import "../../../styles/tangca.css"; 


const { Option } = Select;

const OvertimeRequest = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      date: dayjs(),
      shift: "Ca sáng",
      overtimeHours: "2 tiếng",
    });
  }, [form]);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
    <h2 className="form-title">Đăng ký làm tăng ca</h2>
      <Card className="overtime-request-card">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Ngày đăng ký" name="date"> 
            <DatePicker className="full-width" />
          </Form.Item>
          
          <Form.Item label="Ca làm" name="shift"> 
            <Select className="full-width">
              <Option value="Ca sáng">Ca sáng</Option>
              <Option value="Ca trưa">Ca trưa</Option>
              <Option value="Ca tối">Ca tối</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="Số giờ tăng ca" name="overtimeHours"> 
            <Select className="full-width">
              <Option value="2 tiếng">2 tiếng</Option>
              <Option value="4 tiếng">4 tiếng</Option>
              <Option value="6 tiếng">6 tiếng</Option>
            </Select>
          </Form.Item>
          
          <Button type="primary" className="submit-btn" htmlType="submit">
            Gửi yêu cầu
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default OvertimeRequest;