

import React, { useEffect, useState } from "react";
import { Select, Typography, Calendar, Row, Col, Spin } from "antd";
import dayjs from "dayjs";
import  getWorkData  from "@/store/slice/workCalendarSlice";
import "@/styles/bangcong.css"; 
import Profile from "@/pages/dashboard/profile";


const { Text } = Typography;

const WorkCalendar = () => {
  const today = dayjs();
  const [year, setYear] = useState(today.year());
  const [month, setMonth] = useState(today.month() + 1);
  const [workData, setWorkData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWorkData(year, month);
        setWorkData(data);
      } catch (err) {
        setError("Không thể lấy dữ liệu.");
      }
      setLoading(false);
    };

    fetchData();
  }, [year, month]);

  const totalDaysWorked = Object.values(workData).filter((status) => status !== "CN").length;

  const dateCellRender = (value) => {
    const dateKey = dayjs(value).format("YYYY-MM-DD");
    return workData[dateKey] ? <div>{workData[dateKey]}</div> : null;
  };

  return (
    <div>
      <Profile />

      {/* Chọn năm & tháng */}
      <Row justify="center" gutter={16} className="select-container">
        <Col className="select-group">
          <label htmlFor="year">Chọn năm:</label>
          <Select id="year" value={year} onChange={setYear} className="custom-select">
            {[2024, 2025, 2026].map((y) => (
              <Select.Option key={y} value={y}>
                {y}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col className="select-group">
          <label htmlFor="month">Chọn tháng:</label>
          <Select id="month" value={month} onChange={setMonth} className="custom-select">
            {Array.from({ length: 12 }, (_, i) => (
              <Select.Option key={i} value={i + 1}>
                {`Tháng ${i + 1}`}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* Hiển thị dữ liệu */}
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : error ? (
        <Text type="danger">{error}</Text>
      ) : (
        <>
          <Text className="total-days">
            Tổng số ngày công đã làm: <Text type="success">{totalDaysWorked}</Text> ngày
          </Text>
          <Calendar
            fullscreen={false}
            cellRender={dateCellRender}
            value={dayjs(`${year}-${month}-01`)}
            headerRender={() => null}
            onPanelChange={(date) => {
              setYear(date.year());
              setMonth(date.month() + 1);
            }}
          />
        </>
      )}
    </div>
  );
};

export default WorkCalendar;
