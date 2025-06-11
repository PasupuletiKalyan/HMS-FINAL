// AdminDashboard.tsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WardenDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import ResetStudentProgress from "../components/ResetStudentProgress"; // Import the reset component

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

// New interface for Announcements
interface Announcement {
  _id: string;
  text: string;
  type: 'urgent' | 'info' | 'maintenance' | 'event';
  icon: string;
  createdAt: string;
  active: boolean;
  expiresAt: string | null;
}

const AdminDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [adminName, setAdminName] = useState("Admin");  // Removed unused state variables: filteredRoomData, roomSearchTerm
  const [adminID, setAdminID] = useState<string | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // States for User Management feature
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' as const });
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);  // States for Room Booking Release feature
  const [hostelBlocks, setHostelBlocks] = useState<RoomBookingBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string>("");
  
  // States for Announcements feature
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [isEditingAnnouncement, setIsEditingAnnouncement] = useState<string | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState<{
    text: string;
    type: 'urgent' | 'info' | 'maintenance' | 'event';
    icon: string;
    active: boolean;
    expiresAt: string | null;
  }>({
    text: '',
    type: 'info',
    icon: 'fa-info-circle',
    active: true,
    expiresAt: null
  });
    const profileRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  // Removed unused handleRoomSearch function

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
    };    fetchAdminID();  }, []);

  // Search bar functionality has been removed

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

  // Fetch announcements on component mount
  useEffect(() => {
    if (selectedMenu === "Announcements") {
      fetchAnnouncements();
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
      { id: '4', name: 'Hostel Manager', email: 'manager@example.com', role: 'warden', createdAt: '2025-01-20' },    ];
    setUsers(dummyUsers);
    setFilteredUsers(dummyUsers);
  };

  // Updated hostelBlocks structure to match HostelFloorPlanViewer exactly
  const blockConfigs = [
    // Boys Blocks
    { name: "Phase 1", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Phase 1 E Block", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Phase 2", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor", "11th Floor", "12th Floor"] },
    { name: "Phase 2 Part 5", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor", "11th Floor", "12th Floor"] },
    { name: "Phase 3 North Wing", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor"] },
    { name: "Phase 3 South Wing", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor"] },
    { name: "Phase 4A", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor"] },
    { name: "Phase 4B", gender: "Boys", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor", "7th Floor", "8th Floor", "9th Floor", "10th Floor"] },
    // Girls Blocks
    { name: "Aravali", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Ajanta", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Himalaya", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Shivalik", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Vindya", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Nilgiri", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Satpura", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
    { name: "Kailash", gender: "Girls", floors: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor"] },
  ];  // Enhanced function to fetch hostel blocks with appropriate number of floors for each block
  const fetchHostelBlocks = async () => {
    // Always start with all available blocks from blockConfigs
    const allBlocks: RoomBookingBlock[] = blockConfigs.map((config, index) => ({
      id: (index + 1).toString(),
      name: config.name,
      gender: config.gender,
      isActive: false, // Default to disabled
      floors: config.floors.map((floorName, i) => ({
        id: `${index + 1}-${i + 1}`,
        name: floorName,
        isActive: false, // Default to disabled
      })),
    }));

    try {
      // Try to fetch from backend first to get current settings
      const response = await fetch('http://localhost:5000/api/hostels/blocks-availability');
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.blocks && Array.isArray(data.blocks)) {
          // Merge backend data with all available blocks
          const mergedBlocks = allBlocks.map((block) => {
            const backendBlock = data.blocks.find((b: any) => b.name === block.name);
            if (backendBlock) {
              return {
                ...block,
                isActive: backendBlock.floors.some((floor: any) => floor.isActive),
                floors: block.floors.map((floor, index) => {
                  const backendFloor = backendBlock.floors.find((f: any) => f.floorNumber === (index + 1));
                  return {
                    ...floor,
                    isActive: backendFloor ? backendFloor.isActive : false
                  };
                })
              };
            }
            return block;
          });
          setHostelBlocks(mergedBlocks);
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching hostel blocks:", error);
    }

    // Fallback: try to load saved settings from localStorage 
    const savedBlocks = localStorage.getItem('hostel_blocks_config');
    if (savedBlocks) {
      try {
        const parsedBlocks = JSON.parse(savedBlocks);
        setHostelBlocks(parsedBlocks);
      } catch (e) {
        console.error("Error parsing saved hostel blocks:", e);
        setHostelBlocks(allBlocks);
      }
    } else {
      setHostelBlocks(allBlocks);
    }
  };

  // Helper function to convert floor numbers to floor names (same as in HostelFloorPlanViewer)
  const getFloorName = (floorNumber: number): string => {
    const floorNames: Record<number, string> = {
      1: "Ground Floor",
      2: "1st Floor", 
      3: "2nd Floor",
      4: "3rd Floor",
      5: "4th Floor",
      6: "5th Floor",
      7: "6th Floor",
      8: "7th Floor",
      9: "8th Floor",
      10: "9th Floor",
      11: "10th Floor",
      12: "11th Floor",
      13: "12th Floor"
    };
    return floorNames[floorNumber] || `${floorNumber}th Floor`;
  };

  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/announcements/admin/all');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.announcements);
        } else {
          console.error('Failed to fetch announcements:', data.message);
        }
      } else {
        console.error('Failed to fetch announcements: Server returned status', response.status);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      // On error, set some example data for UI testing
      setAnnouncements([
        {
          _id: '1',
          text: 'Urgent: Fee Payment due May 2nd! Pay now to secure your hostel seat.',
          type: 'urgent',
          icon: 'fa-exclamation-circle',
          createdAt: new Date().toISOString(),
          active: true,
          expiresAt: null
        },
        {
          _id: '2',
          text: 'Room Booking opens April 29th! Check availability in your preferred block.',
          type: 'info',
          icon: 'fa-door-open',
          createdAt: new Date().toISOString(),
          active: true,
          expiresAt: null
        }
      ]);
    }
  };

  // Add a new announcement
  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(prev => [data.announcement, ...prev]);
          setIsAddingAnnouncement(false);
          setNewAnnouncement({
            text: '',
            type: 'info',
            icon: 'fa-info-circle',
            active: true,
            expiresAt: null
          });
          alert('Announcement added successfully!');
        } else {
          alert('Failed to add announcement: ' + data.message);
        }
      } else {
        alert('Failed to add announcement');
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
      alert('An error occurred while adding the announcement');
    }
  };

  // Update an announcement
  const handleUpdateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingAnnouncement) return;

    try {
      const response = await fetch(`http://localhost:5000/api/announcements/${isEditingAnnouncement}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(prev =>
            prev.map(announcement =>
              announcement._id === isEditingAnnouncement ? data.announcement : announcement
            )
          );
          setIsEditingAnnouncement(null);
          setNewAnnouncement({
            text: '',
            type: 'info',
            icon: 'fa-info-circle',
            active: true,
            expiresAt: null
          });
          alert('Announcement updated successfully!');
        } else {
          alert('Failed to update announcement: ' + data.message);
        }
      } else {
        alert('Failed to update announcement');
      }
    } catch (error) {
      console.error('Error updating announcement:', error);
      alert('An error occurred while updating the announcement');
    }
  };

  // Delete an announcement
  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(prev => prev.filter(announcement => announcement._id !== id));
          alert('Announcement deleted successfully!');
        } else {
          alert('Failed to delete announcement: ' + data.message);
        }
      } else {
        alert('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('An error occurred while deleting the announcement');
    }
  };

  // Handle editing an announcement
  const handleEditAnnouncement = (announcement: Announcement) => {
    setIsEditingAnnouncement(announcement._id);
    setNewAnnouncement({
      text: announcement.text,
      type: announcement.type,
      icon: announcement.icon,
      active: announcement.active,
      expiresAt: announcement.expiresAt
    });
  };

  // Handle announcement form input change
  const handleAnnouncementInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setNewAnnouncement(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (name === 'expiresAt') {
      setNewAnnouncement(prev => ({
        ...prev,
        [name]: value ? new Date(value).toISOString() : null
      }));
    } else {
      setNewAnnouncement(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Get appropriate icon based on announcement type
  const getDefaultIcon = (type: string): string => {
    switch (type) {
      case 'urgent':
        return 'fa-exclamation-circle';
      case 'maintenance':
        return 'fa-wrench';
      case 'event':
        return 'fa-calendar-alt';
      case 'info':
      default:
        return 'fa-info-circle';
    }
  };

  // Update icon when type changes
  useEffect(() => {
    if (newAnnouncement.type) {
      setNewAnnouncement(prev => ({
        ...prev,
        icon: getDefaultIcon(prev.type)
      }));
    }
  }, [newAnnouncement.type]);

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
    }  };

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

  // Toggle individual floor activation
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
              ),
              // Update block status based on floor statuses
              isActive: block.floors.some(f => f.id === floorId ? !f.isActive : f.isActive)
            } 
          : block
      )
    );
  };
  // Enhanced save room booking configuration to persist to both backend and localStorage
  const saveRoomBookingConfiguration = async () => {
    try {
      // Transform frontend data to backend format
      const backendBlocks = hostelBlocks.map(block => ({
        id: block.id,
        name: block.name,
        gender: block.gender,
        floors: block.floors.map((floor, index) => ({
          floorNumber: index + 1,
          isActive: floor.isActive
        }))
      }));

      // Save to backend
      const response = await fetch('http://localhost:5000/api/hostels/blocks-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blocks: backendBlocks }),
      });
      
      if (response.ok) {
        // Also save to localStorage as fallback
        localStorage.setItem('hostel_blocks_config', JSON.stringify(hostelBlocks));
        alert('Room booking configuration saved successfully!');
      } else {
        // If backend fails, still save to localStorage
        localStorage.setItem('hostel_blocks_config', JSON.stringify(hostelBlocks));
        alert('Room booking configuration saved locally. Server update failed.');
      }
    } catch (error) {
      console.error("Error saving room configuration:", error);
      // Save to localStorage as fallback
      localStorage.setItem('hostel_blocks_config', JSON.stringify(hostelBlocks));
      alert('Room booking configuration saved locally. Server update failed.');
    }
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
    const selectedBlock = hostelBlocks.find(block => block.id === selectedBlockId);

    return (
      <div className="room-release-container">
        <h1>Room Booking Release Controls</h1>        
        <p style={{ marginBottom: '20px' }}>
          Control which hostel blocks and floors are available for student booking. 
          Select a block from the dropdown below, then use the toggle switches to activate/deactivate individual floors, or use the "Activate All" and "Deactivate All" buttons to control all floors in the selected block.
        </p>
        
        {/* Block Selection Dropdown */}
        <div className="block-selector" style={{ marginBottom: '30px' }}>
          <label htmlFor="block-select" style={{ 
            display: 'block', 
            marginBottom: '10px', 
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            Select Hostel Block:
          </label>
          <select
            id="block-select"
            value={selectedBlockId}
            onChange={(e) => setSelectedBlockId(e.target.value)}
            style={{
              width: '300px',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">-- Select a Block --</option>
            {hostelBlocks.map(block => (
              <option key={block.id} value={block.id}>
                {block.name} ({block.gender})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Block Details */}
        {selectedBlock ? (
          <div className="selected-block-container">
            <div 
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
                  backgroundColor: selectedBlock.gender === 'Girls' ? '#FFD6E0' : '#D6E9FF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h3 style={{ margin: '0' }}>
                  {selectedBlock.name} 
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 'normal',
                    marginLeft: '10px',
                    color: selectedBlock.gender === 'Girls' ? '#FF6B8A' : '#4A90E2'
                  }}>
                    ({selectedBlock.gender})
                  </span>
                </h3>
                <div className="block-actions" style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => activateAllFloors(selectedBlock.id)}
                    disabled={selectedBlock.floors.every(f => f.isActive)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      opacity: selectedBlock.floors.every(f => f.isActive) ? 0.7 : 1
                    }}
                  >
                    Activate All
                  </button>
                  
                  <button
                    onClick={() => deactivateAllFloors(selectedBlock.id)}
                    disabled={selectedBlock.floors.every(f => !f.isActive)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      opacity: selectedBlock.floors.every(f => !f.isActive) ? 0.7 : 1
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
                {selectedBlock.floors.map(floor => (
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
                      minWidth: '180px'
                    }}
                  >
                    <span>{floor.name}</span>
                    <label className="switch" style={{ marginLeft: '10px' }}>
                      <input
                        type="checkbox"
                        checked={floor.isActive}
                        onChange={() => toggleFloorActivation(selectedBlock.id, floor.id)}
                        style={{ display: 'none' }}
                      />
                      <span
                        className="slider round"
                        style={{
                          position: 'relative',
                          display: 'inline-block',
                          width: '44px',
                          height: '24px',
                          backgroundColor: floor.isActive ? '#4CAF50' : '#ccc',
                          borderRadius: '24px',
                          transition: '0.4s',
                          cursor: 'pointer'
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            content: '""',
                            height: '18px',
                            width: '18px',
                            left: floor.isActive ? '23px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            transition: '0.4s'
                          }}
                        />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="no-selection-message" style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px dashed #dee2e6'
          }}>
            <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No Block Selected</h3>
            <p style={{ color: '#6c757d', margin: '0' }}>
              Please select a hostel block from the dropdown above to manage its floor availability.
            </p>
          </div>
        )}
        
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

  // Render announcements management interface
  const renderAnnouncementsManagement = () => {
    return (
      <div className="announcements-management">
        <h1>Announcements Management</h1>
        
        <p style={{ marginBottom: '20px' }}>
          Manage announcements that will be displayed on the student dashboard.
        </p>
        
        {/* Button to add new announcement */}
        {!isAddingAnnouncement && !isEditingAnnouncement && (
          <button
            onClick={() => setIsAddingAnnouncement(true)}
            style={{
              padding: '10px 15px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Add New Announcement
          </button>
        )}
        
        {/* Form to add/edit announcement */}
        {(isAddingAnnouncement || isEditingAnnouncement) && (
          <div className="announcement-form-container" style={{ marginBottom: '30px' }}>
            <h2>{isEditingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}</h2>
            <form onSubmit={isEditingAnnouncement ? handleUpdateAnnouncement : handleAddAnnouncement}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Announcement Text:
                </label>
                <textarea
                  name="text"
                  value={newAnnouncement.text}
                  onChange={handleAnnouncementInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    minHeight: '80px'
                  }}
                  placeholder="Enter announcement text"
                ></textarea>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Type:
                </label>
                <select
                  name="type"
                  value={newAnnouncement.type}
                  onChange={handleAnnouncementInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                >
                  <option value="info">Information</option>
                  <option value="urgent">Urgent</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="event">Event</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Icon:
                </label>
                <select
                  name="icon"
                  value={newAnnouncement.icon}
                  onChange={handleAnnouncementInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                >
                  <option value="fa-info-circle">Info Circle (ℹ️)</option>
                  <option value="fa-exclamation-circle">Exclamation Circle (⚠️)</option>
                  <option value="fa-wrench">Wrench (🔧)</option>
                  <option value="fa-calendar-alt">Calendar (📅)</option>
                  <option value="fa-book">Book (📚)</option>
                  <option value="fa-door-open">Door (🚪)</option>
                  <option value="fa-graduation-cap">Graduation Cap (🎓)</option>
                  <option value="fa-bed">Bed (🛏️)</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
                  Active:
                </label>
                <input
                  type="checkbox"
                  name="active"
                  checked={newAnnouncement.active}
                  onChange={handleAnnouncementInputChange}
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Expires At (optional):
                </label>
                <input
                  type="date"
                  name="expiresAt"
                  value={newAnnouncement.expiresAt ? new Date(newAnnouncement.expiresAt).toISOString().split('T')[0] : ''}
                  onChange={handleAnnouncementInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
                <small style={{ display: 'block', color: '#666', marginTop: '5px' }}>
                  Leave empty if the announcement doesn't expire
                </small>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {isEditingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingAnnouncement(false);
                    setIsEditingAnnouncement(null);
                    setNewAnnouncement({
                      text: '',
                      type: 'info',
                      icon: 'fa-info-circle',
                      active: true,
                      expiresAt: null
                    });
                  }}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Preview section */}
        {(isAddingAnnouncement || isEditingAnnouncement) && (
          <div className="announcement-preview" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '15px' }}>Preview</h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '8px',
              borderLeft: `4px solid ${
                newAnnouncement.type === 'urgent' ? '#e53e3e' :
                newAnnouncement.type === 'maintenance' ? '#d69e2e' :
                newAnnouncement.type === 'event' ? '#38a169' : '#3182ce'
              }`
            }}>
              <i className={`fas ${newAnnouncement.icon}`} style={{ marginRight: '15px', fontSize: '18px' }}></i>
              <span>{newAnnouncement.text || 'Announcement text will appear here'}</span>
            </div>
          </div>
        )}
        
        {/* List of announcements */}
        <div className="announcements-list">
          <h2 style={{ marginBottom: '15px' }}>Current Announcements</h2>
          
          {announcements.length === 0 ? (
            <p>No announcements found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '10px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Text</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Icon</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Created</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Expires</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((announcement) => (
                    <tr key={announcement._id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '12px 15px' }}>
                        {announcement.text.length > 70 
                          ? `${announcement.text.substring(0, 70)}...` 
                          : announcement.text}
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        <span style={{
                          padding: '5px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: 
                            announcement.type === 'urgent' ? '#fee2e2' :
                            announcement.type === 'maintenance' ? '#fef3c7' :
                            announcement.type === 'event' ? '#d1fae5' : '#e1f5fe',
                          color: 
                            announcement.type === 'urgent' ? '#b91c1c' :
                            announcement.type === 'maintenance' ? '#b45309' :
                            announcement.type === 'event' ? '#047857' : '#0277bd'
                        }}>
                          {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        <i className={`fas ${announcement.icon}`}></i>
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        <span style={{
                          color: announcement.active ? '#2e7d32' : '#757575',
                          fontWeight: announcement.active ? 'bold' : 'normal'
                        }}>
                          {announcement.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        {announcement.expiresAt 
                          ? new Date(announcement.expiresAt).toLocaleDateString() 
                          : 'Never'}
                      </td>
                      <td style={{ padding: '12px 15px' }}>
                        <button
                          onClick={() => handleEditAnnouncement(announcement)}
                          style={{
                            padding: '6px 10px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '5px'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAnnouncement(announcement._id)}
                          style={{
                            padding: '6px 10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="dashboard-container">
        {/* NAVBAR */}        <div className="dashboard-top-nav">
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
          </div>        </div>        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          {/* Show content based on selected menu */}
          {selectedMenu === "Overview" && (
                <div className="overview-content">
                  {/* Admin Tools Section - Part of Overview only */}
                  <div className="admin-tools-section" style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#dc3545', marginBottom: '15px' }}>Admin Tools</h2>
                    <ResetStudentProgress />
                  </div>
                  <h1>Admin Dashboard Overview</h1>
                  <p>Welcome to the hostel management system admin dashboard.</p>
                  <div className="dashboard-stats" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                    <div className="stat-card" style={{ 
                      flex: '1 1 200px', 
                      backgroundColor: '#f0f8ff', 
                      padding: '20px', 
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <h3>Students</h3>
                      <p className="stat-number">1,245</p>
                    </div>
                    <div className="stat-card" style={{ 
                      flex: '1 1 200px', 
                      backgroundColor: '#fff0f5', 
                      padding: '20px', 
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <h3>Occupied Rooms</h3>
                      <p className="stat-number">528</p>
                    </div>
                    <div className="stat-card" style={{ 
                      flex: '1 1 200px', 
                      backgroundColor: '#f0fff0', 
                      padding: '20px', 
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <h3>Active Blocks</h3>
                      <p className="stat-number">8</p>
                    </div>
                    <div className="stat-card" style={{ 
                      flex: '1 1 200px', 
                      backgroundColor: '#fff8dc', 
                      padding: '20px', 
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <h3>Announcements</h3>
                      <p className="stat-number">12</p>
                    </div>                  </div>
                </div>
              )}
              {selectedMenu === "User Management" && renderUserManagement()}
              {selectedMenu === "Room Release" && renderRoomBookingRelease()}
              {selectedMenu === "Announcements" && renderAnnouncementsManagement()}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
      </footer>
    </>
  );
};

export default AdminDashboard;
