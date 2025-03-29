import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg"; // ✅ Import logo

const StudentDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [showDropdown, setShowDropdown] = useState(false);
  const [studentName, setStudentName] = useState<string>("Guest");
  const [showRoomLayout, setShowRoomLayout] = useState(false); // ✅ Toggle room layout view
  const dropdownRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName")?.trim();
    if (storedName) {
      setStudentName(storedName);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = (option: string) => {
    setSelectedMenu(option);
    setShowDropdown(false);

    if (option === "New Room") {
      setShowRoomLayout(true); // ✅ Show the embedded HTML
    } else if (option === "Change Existing Room") {
      navigate("/change-room");
    } else {
      setShowRoomLayout(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* TOP NAVIGATION BAR */}
      <div className="dashboard-top-nav">
        <div className="profile-section-top">
          <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
          <p className="user-name-top">{studentName}</p>
        </div>

        <ul className="top-menu">
          {["Personal Details", "Apply for Room", "My Room Details", "Fees", "Notifications"].map((item) => (
            <li
              key={item}
              className={selectedMenu === item ? "active" : ""}
              onClick={() => {
                if (item === "Apply for Room") {
                  setShowDropdown(!showDropdown);
                } else {
                  setSelectedMenu(item);
                  setShowDropdown(false);
                  setShowRoomLayout(false);
                }
              }}
            >
              {item}
              {item === "Apply for Room" && (
                <>
                  <span className="dropdown-arrow">{showDropdown ? "▲" : "▼"}</span>

                  {/* DROPDOWN MENU */}
                  {showDropdown && (
                    <ul className="dropdown-bullets-top" ref={dropdownRef}>
                      <li onClick={() => handleDropdownClick("New Room")}>New Room</li>
                      <li onClick={() => handleDropdownClick("Change Existing Room")}>Change Existing Room</li>
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="dashboard-content">
        <h1>{selectedMenu}</h1>
        {showRoomLayout ? (
          // ✅ Embed HTML using an iframe
          <iframe
            src="/bed_layout%20final.html"
            title="Room Layout"
            style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
          ></iframe>
        ) : (
          <p>
            {selectedMenu === "My Room Details"
              ? "Your assigned room details will be displayed here."
              : selectedMenu === "Fees"
              ? "View and pay your hostel fees online."
              : selectedMenu === "Notifications"
              ? "Stay updated with the latest announcements."
              : ""}
          </p>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        <p>
          <a href="/about">About</a> | <a href="/contact">Contact</a> |{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default StudentDashboard;
