import { useState, useEffect } from "react";

const useEmployeeProfile = () => {
  const [employee, setEmployee] = useState({
    name: "Đinh Hoàng Lượm",
    code: "TP00018",
    department: "BL-HCM",
    phone: "",
    email: "hoangluom95@gmail.com",
    projects: ["BL-HCM"],
  });

  // Sau này khi có API, bạn có thể fetch dữ liệu và cập nhật state ở đây
  useEffect(() => {
    // Ví dụ về fetch API sau này:
    // fetch("/api/employee")
    //   .then(res => res.json())
    //   .then(data => setEmployee(data));
  }, []);

  return { employee };
};

export default useEmployeeProfile;
