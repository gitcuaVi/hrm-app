"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar"; 
import dayjs from "dayjs";
import getWorkData from "@/store/slice/workCalendarSlice";
import "@/styles/bangcong.css";
import profileImg from "@/assets/profile.jpg";

const WorkCalendar = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(2);
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
    return workData[dateKey] ? <div className="text-xs font-semibold">{workData[dateKey]}</div> : null;
  };

  return (
    <div className="p-4">
      {/* Hồ sơ cá nhân */}
      <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <img src={profileImg} alt="Profile" className="w-16 h-16 rounded-full" />
        <div>
          <p className="text-lg font-bold">Đinh Hoàng Lượm</p>
          <p className="text-sm text-gray-500">BL-HCM</p>
        </div>
      </div>

      {/* Chọn năm & tháng */}
      <div className="flex gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn năm:</label>
          <Select value={year} onChange={(val) => setYear(Number(val))}>
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Chọn tháng:</label>
          <Select value={month} onChange={(val) => setMonth(Number(val))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {`Tháng ${i + 1}`}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Hiển thị dữ liệu */}
      {loading ? (
        <Skeleton className="h-20 w-full mt-4" />
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <>
          <p className="mt-4 text-lg font-medium">
            Tổng số ngày công đã làm: <span className="text-green-600">{totalDaysWorked}</span> ngày
          </p>
          <div className="mt-4">
            <Calendar
              mode="default"
              className="rounded-lg shadow-md"
              onDateSelect={(date) => {
                setYear(dayjs(date).year());
                setMonth(dayjs(date).month() + 1);
              }}
              renderCell={dateCellRender}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WorkCalendar;
