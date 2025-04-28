// AdminDashboard.tsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WardenDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";

interface Student {
  name: string;
  roll: string;
  room: string;
}

const AdminDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [adminName, setAdminName] = useState("Admin");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [filteredRoomData, setFilteredRoomData] = useState<Student[]>([]);
  const [roomSearchTerm, setRoomSearchTerm] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [adminID, setAdminID] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleRoomSearch = () => {
    const results = studentData.filter((s) =>
      s.room.toLowerCase() === roomSearchTerm.toLowerCase()
    );
    setFilteredRoomData(results);
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

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
  
    // ✅ Only hide suggestions if click was truly outside search box
    if (searchRef.current && !searchRef.current.contains(target)) {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  
    // ✅ Close profile dropdown if click was outside it
    if (profileRef.current && !profileRef.current.contains(target)) {
      setShowProfileDropdown(false);
    }
  };
  

  const suggestions = [
    { name: "Phase-1", gender: "Boys" },
    { name: "E-wing", gender: "Boys" },
    { name: "Phase-2", gender: "Boys" },
    { name: "Phase-4", gender: "Boys" },
    { name: "Aravalli", gender: "Girls" },
    { name: "Ajanta", gender: "Girls" },
    { name: "Himalaya", gender: "Girls" },
    { name: "Shivalik", gender: "Girls" },
    { name: "Vindya", gender: "Girls" },
    { name: "Satpura", gender: "Girls" },
    { name: "Kailash", gender: "Girls" },
    { name: "Phase-3", gender: "Girls" },
  ];
  const filteredSuggestions = suggestions.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  const handleSuggestionClick = (blockName: string) => {
    setSelectedBlock(blockName);
    setShowSuggestions(false);
    setSearchTerm(blockName);
    setSelectedSuggestionIndex(-1);

    const dummyData: Student[] = [
      { name: "Anjali Sharma", roll: "22BCS011", room: "G-102" },
      { name: "Megha Rani", roll: "22BCE123", room: "G-104" },
      { name: "Tanya Roy", roll: "22BCS321", room: "G-201" },
    ];
    setStudentData(dummyData);
    setFilteredRoomData([]);
    setRoomSearchTerm("");
  };

  useEffect(() => {
    if (
      selectedSuggestionIndex >= 0 &&
      suggestionRefs.current[selectedSuggestionIndex]
    ) {
      suggestionRefs.current[selectedSuggestionIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedSuggestionIndex]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedSuggestionIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      handleSuggestionClick(filteredSuggestions[selectedSuggestionIndex].name);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="dashboard-container">
        {/* NAVBAR */}
        <div className="dashboard-top-nav">
          <div className="profile-section-top">
            <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
            <p className="user-name-top"></p>
          </div>

          {/* ✅ Reverted class names */}
          <div className="search-container" ref={searchRef}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search hostel block..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
                setSelectedSuggestionIndex(-1);
              }}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setShowSuggestions(true)}
              className="search-input"
            />
            {showSuggestions && (
              <ul className="suggestion-box">
                {filteredSuggestions.map((s, index) => (
                  <li
                  key={index}
                  ref={(el) => (suggestionRefs.current[index] = el)}
                  className={`suggestion-item ${s.gender.toLowerCase()} ${
                    index === selectedSuggestionIndex ? "highlighted" : ""
                  }`}
                  onMouseDown={(e) => e.preventDefault()} // Prevents blur event
                  onClick={() => {
                    setTimeout(() => handleSuggestionClick(s.name), 0); // Delays the execution
                  }}
                >
                  {s.name} ({s.gender})
                </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="top-menu">
            {[
              "Overview",
              "Hostel Management",
              "Student Management",
              "Room Management",
              "Warden Management",
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

        {/* SECONDARY SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by student name, ID, or room..."
            className="search-bar"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          {selectedBlock ? (
            <>
              <h2>Students in {selectedBlock}</h2>
              <div className="centered-room-search">
                <input
                  type="text"
                  placeholder="Search by room number..."
                  value={roomSearchTerm}
                  onChange={(e) => setRoomSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button onClick={handleRoomSearch} className="search-button">
                  Search
                </button>
              </div>
              {roomSearchTerm && (
                <div className="student-block-list">
                  {filteredRoomData.length > 0 ? (
                    filteredRoomData.map((s, index) => (
                      <div key={index} className="student-card">
                        <p>
                          <strong>Name:</strong> {s.name}
                        </p>
                        <p>
                          <strong>Roll No:</strong> {s.roll}
                        </p>
                        <p>
                          <strong>Room No:</strong> {s.room}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No student found for room {roomSearchTerm}</p>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <h1>{selectedMenu}</h1>
              <p>This is the placeholder content for "{selectedMenu}".</p>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        <p>
          <a href="/about">About</a> | <a href="/contact">Contact</a> |{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </>
  );
};

export default AdminDashboard;
