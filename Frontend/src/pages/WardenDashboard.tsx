import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import Navbar from "../components/common/Navbar";

type Student = {
  name: string;
  roll: string;
  room: string;
  applicationNumber?: string;
  phone?: string;
  parentPhone?: string;
  emergencyContact?: string;
  school?: string;
  profilePic?: string;
};

const WardenDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [filteredRoomData, setFilteredRoomData] = useState<Student[]>([]);
  const [roomSearchTerm, setRoomSearchTerm] = useState("");
  const [wardenName, setWardenName] = useState("Warden");
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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
    const storedWarden = localStorage.getItem("userName");
    if (storedWarden) {
      setWardenName(storedWarden);
    }
  }, []);

  useEffect(() => {
    const fetchApplicationNumber = async () => {
      try {
        const response = await fetch("/api/warden/application-number");
        const data = await response.json();
        setApplicationNumber(data.applicationNumber);
      } catch (error) {
        console.error("Error fetching application number:", error);
        setApplicationNumber("Unavailable");
      }
    };

    fetchApplicationNumber();
  }, []);

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

  const handleSuggestionClick = (blockName: string) => {
    setSelectedBlock(blockName);
    setShowSuggestions(false);
    setSearchTerm(blockName);
    setSelectedSuggestionIndex(-1);

    const dummyData: Student[] = [
      {
        name: "Anjali Sharma",
        roll: "22BCS011",
        room: "G-102",
        applicationNumber: "MUBT0001",
        phone: "9876543210",
        parentPhone: "9123456780",
        emergencyContact: "9988776655",
        school: "ECSOE",
        profilePic: "https://i.pravatar.cc/100?img=1"
      },
      {
        name: "Megha Rani",
        roll: "22BCE123",
        room: "G-102",
        applicationNumber: "MUBT0002",
        phone: "9876512340",
        parentPhone: "9123456790",
        emergencyContact: "9988776644",
        school: "SOL",
        profilePic: "https://i.pravatar.cc/100?img=2"
      },
      {
        name: "Tanya Roy",
        roll: "22BCS321",
        room: "G-201",
        applicationNumber: "MUBT0003",
        phone: "9876509870",
        parentPhone: "9123456700",
        emergencyContact: "9988776633",
        school: "SOD",
        profilePic: "https://i.pravatar.cc/100?img=3"
      },
    ];

    setStudentData(dummyData);
    setFilteredRoomData([]);
    setRoomSearchTerm("");
  };

  const handleRoomSearch = () => {
    const results = studentData.filter((s) =>
      s.room.toLowerCase() === roomSearchTerm.toLowerCase()
    );
    setFilteredRoomData(results);
  };

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

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".search-container")) {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }

    if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
      setShowProfileDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Add Navbar component at the top */}
      <Navbar activePage="dashboard" userType="warden" />
      
      <div className="dashboard-container">
        {/* NAVBAR */}
        <div className="dashboard-top-nav">
          <div className="profile-section-top">
            <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
            <p className="user-name-top"></p>
          </div>

          <div className="search-container">
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
                    ref={(el) => {
                      suggestionRefs.current[index] = el;
                    }}
                    className={`suggestion-item ${s.gender.toLowerCase()} ${
                      index === selectedSuggestionIndex ? "highlighted" : ""
                    }`}
                    onClick={() => handleSuggestionClick(s.name)}
                  >
                    {s.name} ({s.gender})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="top-menu">
            {["Overview", "Room Allotment", "Payments", "Reports", "Complaints"].map((item) => (
              <li
                key={item}
                className={selectedMenu === item ? "active" : ""}
                onClick={() => {
                  setSelectedMenu(item);
                  setSelectedBlock(null);
                  setStudentData([]);
                  setFilteredRoomData([]);
                }}
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="profile-button-container" ref={profileRef}>
            <button
              className="profile-circle-button"
              onClick={() => setShowProfileDropdown((prev) => !prev)}
            >
              {wardenName.charAt(0).toUpperCase()}
            </button>
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <p><strong>Role:</strong> Warden</p>
                  <p><strong>Application No:</strong> {applicationNumber ?? "Loading..."}</p>
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
                      <div key={index} className="student-card detailed-card">
                        <img src={s.profilePic} alt="Profile" className="profile-pic" />
                        <div className="student-info">
                          <p><strong>Name:</strong> {s.name}</p>
                          <p><strong>Roll No:</strong> {s.roll}</p>
                          <p><strong>Room No:</strong> {s.room}</p>
                          <p><strong>Application No:</strong> {s.applicationNumber}</p>
                          <p><strong>Phone:</strong> {s.phone}</p>
                          <p><strong>Parent Phone:</strong> {s.parentPhone}</p>
                          <p><strong>Emergency Contact:</strong> {s.emergencyContact}</p>
                          <p><strong>School:</strong> {s.school}</p>
                        </div>
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
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
      </footer>
    </>
  );
};

export default WardenDashboard;
