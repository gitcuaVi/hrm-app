import React, { useEffect, useState } from "react";
import { Avatar, Select, Typography, Calendar, Row, Col, Card, Spin, Badge } from "antd";
import dayjs from "dayjs";
import "../../../styles/bangcong.css"; 
import profileImg from "../../assets/profile.jpg";

const { Title, Text } = Typography;

const WorkCalendar = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(2);
  const [workData, setWorkData] = useState({});
  // const [loading, setLoading] = useState(true);

  const fetchWorkData = async (year, month) => {
    // setLoading(true);
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            "2025-02-01": "X",
            "2025-02-02": "X",
            "2025-02-03": "1/2X",
            "2025-02-04": "CN",
            "2025-02-07": "X",
            "2025-02-08": "X",
            "2025-02-09": "X",
            "2025-02-10": "1/2X",
            "2025-02-11": "CN",
            "2025-02-14": "X",
            "2025-02-15": "X",
            "2025-02-16": "X",
            "2025-02-18": "CN",
            "2025-02-21": "X",
            "2025-02-22": "X",
            "2025-02-23": "X",
            "2025-02-25": "CN",
            "2025-02-28": "X",
          });
        }, 1000);
      });
      setWorkData(response);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchWorkData(year, month);
  }, [year, month]);

  const totalDaysWorked = Object.values(workData).filter((status) => status !== "CN").length;

const dateCellRender = (value) => {
  const dateKey = dayjs(value).format("YYYY-MM-DD");
  return workData[dateKey] ? <div>{workData[dateKey]}</div> : null;
};

  

  return (
    <div className="WorkCalendar-container">
      <div className="WorkCalendar-profile">
        <img src={profileImg} alt="Profile" />
        <h2>Đinh Hoàng Lượm</h2>
        <p>BL-HCM</p>
      </div>

    <Row justify="center" gutter={16} className="select-container">
      <Col className="select-group">
      <label htmlFor="year">Chọn năm:</label>
      <Select
        id="year"
        value={year}
        onChange={(value) => setYear(value)}
        className="custom-select"
      >
        {[2024, 2025, 2026].map((y) => (
          <Select.Option key={y} value={y}>
            {y}
          </Select.Option>
        ))}
      </Select>
    </Col>
    <Col className="select-group">
      <label htmlFor="month">Chọn tháng:</label>
      <Select
        id="month"
        value={month}
        onChange={(value) => setMonth(value)}
        className="custom-select"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <Select.Option key={i} value={i + 1}>
            {`Tháng ${i + 1}`}
          </Select.Option>
        ))}
        </Select>
        </Col>
      </Row>


      {null ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <>
          <Text className="total-days">
            Tổng số ngày công đã làm: <Text type="success">{totalDaysWorked}</Text> ngày
          </Text>
          <Calendar
          fullscreen={false}
          dateCellRender={dateCellRender}
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

