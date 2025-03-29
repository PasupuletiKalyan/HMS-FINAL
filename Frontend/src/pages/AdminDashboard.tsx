import React, { useState, useEffect } from "react";
import "../styles/DashboardStyles.css";

const AdminDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [wardenName, setWardenName] = useState("Warden"); // Default Name

  useEffect(() => {
    const storedWarden = localStorage.getItem("userName");
    if (storedWarden) {
      setWardenName(storedWarden);
    }
  }, []);

  return (
    <>
      <div className="dashboard-container">
        {/* TOP NAVIGATION BAR */}
        <div className="dashboard-top-nav">
          <div className="profile-section-top">
            <img src="/college-logo.png" alt="College Logo" className="college-logo-top" />
            <p className="user-name-top">Warden: {wardenName}</p>
          </div>

          <ul className="top-menu">
            {["Overview", "Room Allotment", "Payments", "Reports", "Complaints"].map((item) => (
              <li
                key={item}
                className={selectedMenu === item ? "active" : ""}
                onClick={() => setSelectedMenu(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTENT */}
        <div className="dashboard-content">
          <h1>{selectedMenu}</h1>
          <p>This is the placeholder content for "{selectedMenu}".</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        <p>
          <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </>
  );
};

export default AdminDashboard;
