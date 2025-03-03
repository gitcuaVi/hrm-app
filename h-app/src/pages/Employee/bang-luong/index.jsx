import React, { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import "@/styles/bangluong.css";
import profileImg from "@/assets/profile.jpg";
import useEmployeeSalary from "@/store/slice/employSalarySlice";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const EmployeeSalary = () => {
  const [selectedMonth, setSelectedMonth] = useState("02-2025");
  const { salaryData, loading, error } = useEmployeeSalary(selectedMonth); // Lấy dữ liệu từ hook

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

      {/* Chọn tháng */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Chọn tháng:</label>
        <Select value={selectedMonth} onChange={(val) => setSelectedMonth(val)}>
          <option value="02-2025">02-2025</option>
          <option value="01-2025">01-2025</option>
        </Select>
      </div>

      {/* Hiển thị dữ liệu */}
      {loading ? (
        <Skeleton className="h-20 w-full mt-4" />
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <>
          {/* Chi tiết công việc */}
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaClipboardList className="text-blue-500" /> Chi tiết
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <p className="text-sm">Công thực tế: <span className="text-green-600 font-semibold">{salaryData.actualWorkdays}</span></p>
              <p className="text-sm">Nghỉ phép: <span>{salaryData.paidLeave}</span></p>
              <p className="text-sm">Nghỉ không lương: <span className="text-red-500">{salaryData.unpaidLeave}</span></p>
              <p className="text-sm">Nghỉ lễ: <span>{salaryData.holidayLeave}</span></p>
            </div>
            <p className="text-lg font-semibold mt-4">
              Công thực tế: <span className="text-green-700">{salaryData.actualWorkdays}</span>
            </p>
          </div>

          {/* Lương chuyển khoản */}
          <div className="mt-4 p-4 bg-gray-50 border rounded-lg shadow-md">
            <p className="text-lg font-semibold">
              Lương chuyển khoản: <span className="text-green-700 font-bold">{salaryData.salary.toLocaleString()} VND</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeSalary;
