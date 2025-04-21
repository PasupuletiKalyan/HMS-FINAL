// StudentDashboard.tsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import HostelFloorPlanViewer from '../components/HostelFloorPlanViewer.jsx';
import '../styles/hostelfloorplanviewer.css'; // Import the styles for the component

const StudentDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [showDropdown, setShowDropdown] = useState(false);
  const [studentName, setStudentName] = useState("Guest");
  const [applicationNo, setApplicationNo] = useState("");
  const [showRoomLayout, setShowRoomLayout] = useState(false);
  const [greeting, setGreeting] = useState("Welcome");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName")?.trim();
    const appNo = localStorage.getItem("applicationNo")?.trim();
    if (storedName) setStudentName(storedName);
    if (appNo) setApplicationNo(appNo);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) setShowDropdown(false);

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) setShowProfileDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyForRoomClick = () => {
    setSelectedMenu("Apply for Room");
    setShowRoomLayout(true);
  };

  const renderInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Form submitted successfully!");
        e.currentTarget.reset();
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Nav */}
      <div className="dashboard-top-nav">
        <div className="profile-section-top">
          <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
        </div>

        <ul className="top-menu">
          {["Overview", "Hostel Form", "Apply for Room", "Layout Info", "My Room Details", "Fees", "More Info"].map(item => (
            <li
              key={item}
              className={selectedMenu === item ? "active" : ""}
              onClick={() => {
                if (item === "Apply for Room") {
                  handleApplyForRoomClick();
                } else {
                  setSelectedMenu(item);
                  setShowDropdown(false);
                  setShowRoomLayout(false);
                }
              }}
            >
              {item}
              {item === "Apply for Room" && (
                <span className="dropdown-arrow">{showDropdown ? "▲" : "▼"}</span>
              )}
            </li>
          ))}
        </ul>

        {/* Profile + Dropdown */}
        <div className="profile-box" ref={profileRef}>
          <span className="student-name">{studentName}</span>
          <div className="profile-initials" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            {renderInitials(studentName)}
            {showProfileDropdown && (
              <div className="profile-dropdown-nice">
                <p><strong>Role:</strong> Student</p>
                <p><strong>Application No:</strong> {applicationNo || "N/A"}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Box */}
      {showProcessModal && (
        <div className="process-modal-overlay">
          <div className="process-modal">
            <button className="close-button" onClick={() => setShowProcessModal(false)}>✕</button>
            <h2>📘 Hostel Admission Process</h2>
            <ol style={{ lineHeight: "1.8" }}>
              <li>First, fill out the hostel admission form with all the required details.</li>
              <li>Next, proceed to pay your hostel fees through the "Fees" section.</li>
              <li>Once paid, download your fee receipt and keep it for your records.</li>
              <li>Then, go to "Apply for Room" and select your preferred room and bed.</li>
              <li>When you arrive at the hostel, report to the concerned warden and tell your room number.</li>
              <li>The warden will then hand over your room key.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="dashboard-content">
        {selectedMenu === "Overview" && (
          <>
            <div className="greeting-card">
              <h2>{greeting}, {studentName}!</h2>
              <p>
                Here’s what’s happening today in your dashboard. &nbsp;
                <span
                  style={{ color: "#c23535", textDecoration: "underline", fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => setShowProcessModal(true)}
                >
                  📘 Hostel Admission Process
                </span>
              </p>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card"><h4>Room Status</h4><p>Not Allocated</p></div>
              <div className="stat-card"><h4>Form Status</h4><p>Pending</p></div>
              <div className="stat-card"><h4>Fee Payment</h4><p>Unpaid</p></div>
            </div>

            <div className="notice-board">
              <ul>
                <li>📝 Hostel fee deadline is April 30th.</li>
                <li>📢 Room Booking Window Opens From April 10th.</li>
                <li>📢 Changing of Room Window opens After one Month.</li>
                <li>🎉 Fresher's Welcome Event: April 20th, ECOLE Auditorium.</li>
              </ul>
            </div>
          </>
        )}

        {selectedMenu === "Hostel Form" && (
          <div className="hostel-form-section">
            <h2 className="form-heading">Hostel Admission Form</h2>
            <form onSubmit={handleFormSubmit} className="hostel-form">
              {[
                "admission_no",
                "hall_ticket_no",
                "batch",
                "programme",
                "school",
                "student_name",
                "student_email",
                "father_name",
                "mother_name",
                "parent_email",
                "dob_place",
                "blood_group",
                "medical_history",
                "student_mobile",
                "permanent_address",
                "father_mobile",
                "mother_mobile",
                "local_guardian",
                "emergency_contact"
              ].map((field) => (
                <div className="form-group" key={field}>
                  <label>{field.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</label>
                  {["medical_history", "permanent_address"].includes(field) ? (
                    <textarea name={field} className="no-resize" required />
                  ) : (
                    <input type="text" name={field} required />
                  )}
                </div>
              ))}

              {/* DOB with Calendar */}
              <div className="form-group">
                <label>Date Of Birth</label>
                <input type="date" name="dob" required />
              </div>

              {/* Nationality Dropdown */}
              <div className="form-group">
                <label>Nationality</label>
                <select name="nationality" required>
                  <option value="Indian">Indian</option>
                  <option value="NRI">NRI</option>
                </select>
              </div>

              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        )}

        {selectedMenu === "Apply for Room" && showRoomLayout && (
          <div className="hostel-room-booking-section">
            <h2>Apply for Room</h2>
            <HostelFloorPlanViewer />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
        <p><a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy</a></p>
      </footer>
    </div>
  );
};

export default StudentDashboard;