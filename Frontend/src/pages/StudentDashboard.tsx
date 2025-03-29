import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg"; // ✅ Import logo

const StudentDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [showDropdown, setShowDropdown] = useState(false);
  const [studentName, setStudentName] = useState<string>("Guest");
  const [showRoomLayout, setShowRoomLayout] = useState(false);
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
      setShowRoomLayout(true);
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
          {["Personal Details", "Apply for Room", "Layout Info", "My Room Details", "Fees", "More Info"].map(
            (item) => (
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
            )
          )}
        </ul>
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="dashboard-content">
        <h1>{selectedMenu}</h1>

        {/* ✅ Personal Details Form */}
        {selectedMenu === "Personal Details" && (
          <form className="personal-details-form">
            <label>
              Admission No:
              <input type="text" name="admission_no" required />
            </label>

            <label>
              Hall Ticket No:
              <input type="text" name="hall_ticket_no" required />
            </label>

            <label>
              Batch:
              <input type="text" name="batch" required />
            </label>

            <label>
              Programme:
              <input type="text" name="programme" required />
            </label>

            <label>
              Date of Occupation:
              <input type="date" name="date_of_occupation" required />
            </label>

            <label>
              Hostel Room No:
              <input type="text" name="hostel_room_no" required />
            </label>

            <label>
              School:
              <input type="text" name="school" required />
            </label>

            <label>
              Name of the Student:
              <input type="text" name="student_name" required />
            </label>

            <label>
              E-Mail ID of Student:
              <input type="email" name="student_email" required />
            </label>

            <label>
              Father's Name:
              <input type="text" name="father_name" required />
            </label>

            <label>
              Mother's Name:
              <input type="text" name="mother_name" required />
            </label>

            <label>
              E-Mail ID of Parent:
              <input type="email" name="parent_email" required />
            </label>

            <label>
              NRI / Indian:
              <select name="nationality" required>
                <option value="Indian">Indian</option>
                <option value="NRI">NRI</option>
              </select>
            </label>

            <label>
              Date and Place of Birth:
              <input type="text" name="dob_place" required />
            </label>

            <label>
              Blood Group:
              <input type="text" name="blood_group" required />
            </label>

            <label>
              Past Medical History (if any):
              <textarea name="medical_history"></textarea>
            </label>

            <label>
              Student Mobile No:
              <input type="tel" name="student_mobile" required />
            </label>

            <label>
              Permanent Address:
              <textarea name="permanent_address" required></textarea>
            </label>

            <label>
              Parent's Mobile No (Father):
              <input type="tel" name="father_mobile" required />
            </label>
            <label>
              Parent's Mobile No (Mother):
              <input type="tel" name="mother_mobile" required />
            </label>

            <label>
              Local Guardian (if any):
              <input type="text" name="local_guardian" />
            </label>

            <label>
              Emergency Contact Number:
              <input type="tel" name="emergency_contact" required />
            </label>

            <button type="submit">Submit</button>
          </form>
        )}

        {/* ✅ Layout Info Section */}
        {selectedMenu === "Layout Info" && (
          <div className="layout-info-section">
            <h2>Hostel Layout Information</h2>
            <p>This section will contain information about the hostel room layout and structure.</p>
            <iframe
              src="/layout_info.html" // ✅ Placeholder page (replace with actual)
              title="Layout Information"
              style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
            ></iframe>
          </div>
        )}

        {/* Room Layout */}
        {showRoomLayout && (
          <iframe
            src="/bed_layout%20final.html"
            title="Room Layout"
            style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
          ></iframe>
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
