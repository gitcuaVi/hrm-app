import React, { useEffect } from "react";
import { Button, Card, DatePicker, Form, Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import "../../../styles/xinditre.css";

const { Option } = Select;

const LateRequest = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      date: dayjs(),
      time: dayjs(),
    });
  }, [form]);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h2 className="form-title">Gửi yêu cầu xin đi trễ / về sớm của bạn</h2>
      <Card className="late-request-card">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Loại yêu cầu" name="requestType" initialValue="Đi trễ"> 
            <Select className="full-width">
              <Option value="Đi trễ">Đi trễ</Option>
              <Option value="Về sớm">Về sớm</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="Ngày" name="date"> 
            <DatePicker 
            className="full-width" 
            format="DD/MM/YYYY"
            />
          </Form.Item>
          
          <Form.Item label="Giờ" name="time"> 
            <TimePicker 
            className="full-width" 
            use12Hours format="h:mm A" 
            />
          </Form.Item>
          
          <Form.Item label="Lý do" name="reason"> 
            <Input.TextArea className="full-width" rows={3} placeholder="Nhập nội dung" />
          </Form.Item>
          
          <Button type="primary" className="submit-btn" htmlType="submit">Gửi yêu cầu</Button>
        </Form>
      </Card>
    </div>
  );
};

export default LateRequest;