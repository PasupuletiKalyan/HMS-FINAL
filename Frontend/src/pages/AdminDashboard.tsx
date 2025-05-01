// AdminDashboard.tsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WardenDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import ResetStudentProgress from "../components/ResetStudentProgress"; // Import the reset component

interface Student {
  name: string;
  roll: string;
  room: string;
}

// Define interfaces for our new features
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'warden' | 'student';
  createdAt: string;
}

interface RoomBookingBlock {
  id: string;
  name: string;
  gender: string;
  floors: Floor[];
  isActive: boolean;
}

interface Floor {
  id: string;
  name: string;
  isActive: boolean;
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
  
  // States for User Management feature
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' as const });
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // States for Room Booking Release feature
  const [hostelBlocks, setHostelBlocks] = useState<RoomBookingBlock[]>([]);
  const [selectedHostelBlock, setSelectedHostelBlock] = useState<string | null>(null);
  
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

  // Fetch users on component mount
  useEffect(() => {
    if (selectedMenu === "User Management") {
      fetchUsers();
    }
  }, [selectedMenu]);

  // Fetch hostel blocks for room release management
  useEffect(() => {
    if (selectedMenu === "Room Release") {
      fetchHostelBlocks();
    }
  }, [selectedMenu]);

  // Function to fetch users
  const fetchUsers = async () => {
    // In a real app, you would fetch from your backend
    // For now, we'll use dummy data
    const dummyUsers: User[] = [
      { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', createdAt: '2025-01-15' },
      { id: '2', name: 'Warden Singh', email: 'warden@example.com', role: 'warden', createdAt: '2025-02-10' },
      { id: '3', name: 'Student Kumar', email: 'student@example.com', role: 'student', createdAt: '2025-03-05' },
      { id: '4', name: 'Hostel Manager', email: 'manager@example.com', role: 'warden', createdAt: '2025-01-20' },
    ];
    setUsers(dummyUsers);
    setFilteredUsers(dummyUsers);
  };

  // Function to fetch hostel blocks
  const fetchHostelBlocks = async () => {
    // In a real app, you would fetch from your backend
    // For now, we'll use dummy data based on the suggestions array
    const blocks: RoomBookingBlock[] = suggestions.map((block, index) => ({
      id: (index + 1).toString(),
      name: block.name,
      gender: block.gender,
      isActive: Math.random() > 0.5, // Randomly set some blocks as active
      floors: Array.from({ length: 5 }, (_, i) => ({
        id: `${index + 1}-${i + 1}`,
        name: `Floor ${i + 1}`,
        isActive: Math.random() > 0.3, // Randomly set some floors as active
      })),
    }));
    setHostelBlocks(blocks);
  };

  // Handle user form input changes
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Add a new user
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    const newUserObj: User = {
      id: (users.length + 1).toString(),
      ...newUser,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUserObj]);
    setFilteredUsers(prev => [...prev, newUserObj]);
    setNewUser({ name: '', email: '', role: 'student' });
    setIsAddingUser(false);
    alert('User added successfully!');
  };

  // Delete a user
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, you would send this to your backend
      setUsers(prev => prev.filter(user => user.id !== userId));
      setFilteredUsers(prev => prev.filter(user => user.id !== userId));
      alert('User deleted successfully!');
    }
  };

  // Search users
  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setUserSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) || 
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  // Toggle block activation
  const toggleBlockActivation = (blockId: string) => {
    setHostelBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { ...block, isActive: !block.isActive } 
          : block
      )
    );
  };

  // Toggle floor activation
  const toggleFloorActivation = (blockId: string, floorId: string) => {
    setHostelBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { 
              ...block, 
              floors: block.floors.map(floor => 
                floor.id === floorId 
                  ? { ...floor, isActive: !floor.isActive } 
                  : floor
              ) 
            } 
          : block
      )
    );
  };

  // Activate all floors in a block
  const activateAllFloors = (blockId: string) => {
    setHostelBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { 
              ...block, 
              isActive: true,
              floors: block.floors.map(floor => ({ ...floor, isActive: true })) 
            } 
          : block
      )
    );
  };

  // Deactivate all floors in a block
  const deactivateAllFloors = (blockId: string) => {
    setHostelBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { 
              ...block, 
              isActive: false,
              floors: block.floors.map(floor => ({ ...floor, isActive: false })) 
            } 
          : block
      )
    );
  };

  // Save room booking configuration
  const saveRoomBookingConfiguration = async () => {
    // In a real app, you would send this to your backend
    alert('Room booking configuration saved successfully!');
    // You could send the hostelBlocks state to your backend here
  };

  const renderUserManagement = () => {
    return (
      <div className="user-management-container">
        <h1>User Management</h1>
        
        <div className="user-controls">
          <div className="user-search">
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={userSearchQuery}
              onChange={handleUserSearch}
              className="search-input"
            />
          </div>
          
          <button 
            className="add-user-btn"
            onClick={() => setIsAddingUser(true)}
            style={{
              padding: '10px 15px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            + Add New User
          </button>
        </div>
        
        {isAddingUser && (
          <div className="add-user-form" style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3>Add New User</h3>
            <form onSubmit={handleAddUser}>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleUserInputChange}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleUserInputChange}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role</label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleUserInputChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="admin">Admin</option>
                  <option value="warden">Warden</option>
                  <option value="student">Student</option>
                </select>
              </div>
              
              <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="users-table-container" style={{ marginTop: '20px' }}>
          <table className="users-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Role</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Created At</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{user.name}</td>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: user.role === 'admin' ? '#dc3545' : user.role === 'warden' ? '#ffc107' : '#28a745',
                      color: user.role === 'warden' ? '#212529' : 'white'
                    }}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{user.createdAt}</td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '15px', textAlign: 'center' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderRoomBookingRelease = () => {
    return (
      <div className="room-release-container">
        <h1>Room Booking Release Controls</h1>
        
        <p style={{ marginBottom: '20px' }}>
          Control which hostel blocks and floors are available for student booking. 
          Active blocks and floors can be booked by students.
        </p>
        
        <div className="blocks-container">
          {hostelBlocks.map(block => (
            <div 
              key={block.id} 
              className="hostel-block-card"
              style={{
                marginBottom: '25px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
            >
              <div 
                className="block-header"
                style={{
                  padding: '15px',
                  backgroundColor: block.gender === 'Girls' ? '#FFD6E0' : '#D6E9FF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h3 style={{ margin: '0' }}>
                  {block.name} 
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 'normal',
                    marginLeft: '10px',
                    color: block.gender === 'Girls' ? '#FF6B8A' : '#4A90E2'
                  }}>
                    ({block.gender})
                  </span>
                </h3>
                
                <div className="block-actions" style={{ display: 'flex', gap: '10px' }}>
                  <label className="switch" style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '60px',
                    height: '28px'
                  }}>
                    <input 
                      type="checkbox" 
                      checked={block.isActive}
                      onChange={() => toggleBlockActivation(block.id)}
                      style={{
                        opacity: 0,
                        width: 0,
                        height: 0
                      }}
                    />
                    <span className="slider" style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: block.isActive ? '#28a745' : '#ccc',
                      borderRadius: '34px',
                      transition: '.4s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '',
                        height: '20px',
                        width: '20px',
                        left: block.isActive ? '36px' : '4px',
                        bottom: '4px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '.4s'
                      }}></span>
                    </span>
                  </label>
                  
                  <button
                    onClick={() => activateAllFloors(block.id)}
                    disabled={block.floors.every(f => f.isActive)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      opacity: block.floors.every(f => f.isActive) ? 0.7 : 1
                    }}
                  >
                    Activate All
                  </button>
                  
                  <button
                    onClick={() => deactivateAllFloors(block.id)}
                    disabled={block.floors.every(f => !f.isActive)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      opacity: block.floors.every(f => !f.isActive) ? 0.7 : 1
                    }}
                  >
                    Deactivate All
                  </button>
                </div>
              </div>
              
              <div 
                className="floors-container"
                style={{
                  padding: '15px',
                  backgroundColor: 'white',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                {block.floors.map(floor => (
                  <div 
                    key={floor.id}
                    className="floor-item"
                    style={{
                      padding: '10px 15px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      backgroundColor: floor.isActive ? '#e8f4fc' : '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '15px'
                    }}
                  >
                    <span>{floor.name}</span>
                    <label className="switch" style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '40px',
                      height: '22px'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={floor.isActive}
                        onChange={() => toggleFloorActivation(block.id, floor.id)}
                        style={{
                          opacity: 0,
                          width: 0,
                          height: 0
                        }}
                      />
                      <span className="slider" style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: floor.isActive ? '#28a745' : '#ccc',
                        borderRadius: '34px',
                        transition: '.4s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '',
                          height: '16px',
                          width: '16px',
                          left: floor.isActive ? '21px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '.4s'
                        }}></span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="save-configuration" style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={saveRoomBookingConfiguration}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Save Configuration
          </button>
        </div>
      </div>
    );
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
                  ref={(el: HTMLLIElement | null) => {
                    suggestionRefs.current[index] = el;
                  }}
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
              "User Management",
              "Room Release",
              "Hostel Management",
              "Student Management",
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
          {/* Admin Tools Section - Added at the top of the content area */}
          <div className="admin-tools-section" style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#dc3545', marginBottom: '15px' }}>Admin Tools</h2>
            <ResetStudentProgress />
          </div>

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
              {selectedMenu === "Overview" && (
                <>
                  <h1>{selectedMenu}</h1>
                  <p>This is the placeholder content for "{selectedMenu}".</p>
                </>
              )}
              {selectedMenu === "User Management" && renderUserManagement()}
              {selectedMenu === "Room Release" && renderRoomBookingRelease()}
              {(selectedMenu === "Hostel Management" || selectedMenu === "Student Management") && (
                <>
                  <h1>{selectedMenu}</h1>
                  <p>This is the placeholder content for "{selectedMenu}".</p>
                </>
              )}
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
