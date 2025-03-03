import React, { useEffect } from "react";
import { Button, Card, DatePicker, Form, Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const LateRequestForm = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      date: dayjs(),
      time: dayjs(),
    });
  }, [form]);

  return (
    <Card className="late-request-card">
      <Form form={form} layout="vertical" onFinish={onSubmit}>

        <Form.Item label="Loại yêu cầu" name="requestType" initialValue="Đi trễ"> 
          <Select className="full-width">
            <Option value="Đi trễ">Đi trễ</Option>
            <Option value="Về sớm">Về sớm</Option>
          </Select>
        </Form.Item>
        
        <Form.Item label="Ngày" name="date" > 
          <DatePicker className="full-width" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item label="Giờ" name="time"> 
          <TimePicker className="full-width" use12Hours format="h:mm A" />
        </Form.Item>

        <Form.Item label="Lý do" name="reason"> 
          <Input.TextArea className="full-width" rows={3} placeholder="Nhập nội dung" />
        </Form.Item>
        
        <Button type="primary" className="submit-btn" htmlType="submit" loading={loading}>
          Gửi yêu cầu
        </Button>
      </Form>
    </Card>
  );
};

export default LateRequestForm;
