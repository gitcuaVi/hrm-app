"use client";


import React from "react";
import { FaUserCircle  } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import "@/styles/thongtin.css";
import "@/index.css";
import { BiSolidContact } from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { HiViewList } from "react-icons/hi";
import profileImg from "@/assets/profile.jpg"; 
import useEmployeeProfile from "@/store/slice/profileSlice";


const EmployeeProfile = () => {
  const { employee } = useEmployeeProfile();

  return (
    <div>
      <div className="profile">
        <img src={profileImg} alt="Profile" className="profile-img" />
        <div className="name">{employee.name}</div>
        <div className="location">{employee.department}</div>
      </div>

      <div className="profile-card">
        <div className="profile-info">
          <p><FaUserCircle   className="icon-profile" /> <strong> Employee Code:</strong> {employee.code}</p>
          <p><FaBoxArchive   className="icon-profile" /> <strong> Department:</strong> {employee.department}</p>
          <p><BiSolidContact   className="icon-profile" /> <strong> Phone:</strong> {employee.phone || "N/A"}</p>
          <p><MdOutlineAlternateEmail   className="icon-profile" /> <strong> Email:</strong> {employee.email}</p>
        </div>
      </div>

      <div className="profile-card">
        <h3><HiViewList className="icon-profile" /> Dự án</h3>
        <ul>
          {employee.projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeProfile;
