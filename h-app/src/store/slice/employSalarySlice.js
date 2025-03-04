import React ,{ useState, useEffect } from "react";
// import { getSalaryData } from "@/store/slice/SalarySlice"; // Khi cần fetch API thì import hàm này

const useEmployeeSalary = (selectedMonth) => {
  const [salaryData, setSalaryData] = useState({
    name: "Đinh Hoàng Lượm",
    department: "BL-HCM",
    actualWorkdays: 24.5,
    paidLeave: 0,
    unpaidLeave: 0,
    holidayLeave: 0,
    salary: 26010758, 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalary = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Khi có API, thay thế đoạn này bằng:
        // const data = await getSalaryData(selectedMonth);
        const mockData = {
          actualWorkdays: 24.5,
          paidLeave: 0,
          unpaidLeave: 0,
          holidayLeave: 0,
          salary: 26010758, 
        };
        setSalaryData((prev) => ({ ...prev, ...mockData }));
      } catch (err) {
        setError("Không thể lấy dữ liệu lương.");
      }

      setLoading(false);
    };

    fetchSalary();
  }, [selectedMonth]);

  return { salaryData, loading, error };
};

export default useEmployeeSalary;
