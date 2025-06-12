// AdminDashboard.tsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WardenDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import AdminOverview from "../components/admin/AdminOverview";
import UserManagement from "../components/admin/UserManagement";
import RoomRelease from "../components/admin/RoomRelease";
import AnnouncementsManagement from "../components/admin/AnnouncementsManagement";

const AdminDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [adminName, setAdminName] = useState("Admin");
  const [adminID, setAdminID] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const profileRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const storedAdmin = localStorage.getItem("userName");
    if (storedAdmin) {
      setAdminName(storedAdmin);
    }
  }, []);

  useEffect(() => {
    const fetchAdminID = async () => {
      try {
        const response = await fetch("/api/admin/id");
        const data = await response.json();
        setAdminID(data.adminID);
      } catch (error) {
        console.error("Error fetching admin ID:", error);
        setAdminID("Unavailable");
      }
    };
    fetchAdminID();
  }, []);
  return (
    <>
      <div className="dashboard-container">
        {/* NAVBAR */}
        <div className="dashboard-top-nav">
          <div className="profile-section-top">
            <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
            <p className="user-name-top"></p>
          </div>

          {/* Updated menu with removed options */}
          <ul className="top-menu">
            {[
              "Overview",
              "User Management",
              "Room Release",
              "Announcements",
            ].map((item) => (
              <li
                key={item}
                className={selectedMenu === item ? "active" : ""}
                onClick={() => setSelectedMenu(item)}
              >
                {item}
              </li>
            ))}
          </ul>

          {/* PROFILE BUTTON */}
          <div className="profile-button-container" ref={profileRef}>
            <button
              className="profile-circle-button"
              onClick={() => setShowProfileDropdown((prev) => !prev)}
            >
              {adminName.charAt(0).toUpperCase()}
            </button>
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <p>
                    <strong>Role:</strong> Admin
                  </p>
                  <p>
                    <strong>Admin ID:</strong> {adminID ?? "Loading..."}
                  </p>
                </div>
                <ul>
                  <li>Profile</li>
                  <li>Settings</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          {/* Show content based on selected menu */}
          {selectedMenu === "Overview" && <AdminOverview />}
          {selectedMenu === "User Management" && <UserManagement />}
          {selectedMenu === "Room Release" && <RoomRelease />}
          {selectedMenu === "Announcements" && <AnnouncementsManagement />}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div style={{marginBottom: '15px'}}>
          <p>&copy; {new Date().getFullYear()} Mahindra University Hostel Management System. All rights reserved.</p>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <a href="#" onClick={(e) => {e.preventDefault(); setSelectedMenu("Feedback");}}>Feedback</a>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{fontSize: '14px'}}></span>
            <a href="mailto:hostelcom@mahindrauniversity.edu.in" style={{color: '#fff'}}>
              hostelcom@mahindrauniversity.edu.in
            </a>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{fontSize: '14px'}}>📞</span>
            <span style={{color: '#fff'}}>+91 40 6722 9000</span>
        </div>
        </div>
      </footer>
    </>
  );
};

export default AdminDashboard;
