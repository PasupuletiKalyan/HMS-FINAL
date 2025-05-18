import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WardenDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import defaultProfilePic from "../assets/default-profile-pic.jpg";
import HostelFloorPlanViewer from "../components/HostelFloorPlanViewer"; 
import ProfilePhotoUploader from "../components/ProfilePhotoUploader"; // Import ProfilePhotoUploader component

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

type HostelSummary = {
  id: string;
  blockName: string;
  totalRooms: number;
  occupiedRooms: number;
  totalStudents: number;
  maintenanceRooms: number;
  type: 'Girls' | 'Boys';
};

type FloorData = {
  floorNumber: string;
  totalRooms: number;
  totalBeds: number;
  warden: number;
  staff: number;
  hk: number;
  guest: number;
  others: number;
  totalNSBeds: number;
  studentBedsAvailable: number;
  occupiedBeds: number;
  emptyBeds: number;
};


type DormBlock = {
  name: string;
  totals: Omit<FloorData, 'floorNumber'>;
};

type BookingInfo = {
  block: string;
  floor: string;
  roomNumber: string;
  bed: string;
  roomKey: string;
};

type EditableData = HostelSummary | FloorData | DormBlock;

type StudentBooking = {
  applicationNumber: string;
  booking: BookingInfo;
};

// Update the Complaint type to match our database model
type Complaint = {
  _id: string;
  applicationNo: string;
  studentName: string;
  subject: string;
  description: string;
  priority: string;
  roomDetails: {
    block: string;
    floor: string;
    roomNumber: string;
  } | null;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Closed';
  wardenResponse?: string;
  date: string;
  createdAt: string;
};

const createEmptyTotals = (): Omit<FloorData, 'floorNumber'> => ({
  totalRooms: 0,
  totalBeds: 0,
  warden: 0,
  staff: 0,
  hk: 0,
  guest: 0,
  others: 0,
  totalNSBeds: 0,
  studentBedsAvailable: 0,
  occupiedBeds: 0,
  emptyBeds: 0
});

const createUniqueFloorData = (floorIndex: number, isGroundFloor: boolean): FloorData => ({
  floorNumber: isGroundFloor ? 'Ground Floor' : `Floor ${floorIndex}`,
  totalRooms: 20 + floorIndex,
  totalBeds: 40 + (floorIndex * 2),
  warden: isGroundFloor ? 1 : floorIndex % 2,
  staff: floorIndex % 3,
  hk: floorIndex % 2 + 1,
  guest: floorIndex % 2,
  others: floorIndex % 2,
  totalNSBeds: 3 + floorIndex,
  studentBedsAvailable: 35 + floorIndex,
  occupiedBeds: 30 + floorIndex,
  emptyBeds: 5 + floorIndex
});

const initialGirlsHostelData = {
  dorms: [
    { 
      name: 'Aravali', 
      totals: {
        ...createEmptyTotals(), 
        totalRooms: 60, 
        totalBeds: 120, 
        warden: 1,
        staff: 2,
        hk: 3,
        guest: 2,
        others: 1,
        totalNSBeds: 9,
        studentBedsAvailable: 111,
        occupiedBeds: 57,
        emptyBeds: 54
      }
    },
    { 
      name: 'Ajanta', 
      totals: {
        ...createEmptyTotals(), 
        totalRooms: 60, 
        totalBeds: 120, 
        warden: 1,
        staff: 2,
        hk: 3,
        guest: 2,
        others: 1,
        totalNSBeds: 9,
        studentBedsAvailable: 113,
        occupiedBeds: 92,
        emptyBeds: 21
      }
    },
    { 
      name: 'Himalaya', 
      totals: {
        ...createEmptyTotals(), 
        totalRooms: 60, 
        totalBeds: 120, 
        warden: 1,
        staff: 2,
        hk: 3,
        guest: 2,
        others: 1,
        totalNSBeds: 9,
        studentBedsAvailable: 115,
        occupiedBeds: 77,
        emptyBeds: 38
      }
    },
    { 
      name: 'Shivalik', 
      totals: {
        ...createEmptyTotals(), 
        totalRooms: 60, 
        totalBeds: 120, 
        warden: 1,
        staff: 2,
        hk: 3,
        guest: 2,
        others: 1,
        totalNSBeds: 9,
        studentBedsAvailable: 118,
        occupiedBeds: 107,
        emptyBeds: 11
      }
    },
    { 
      name: 'Vindhya', 
      totals: {
        ...createEmptyTotals(), 
        totalRooms: 60, 
        totalBeds: 120, 
        warden: 1,
        staff: 2,
        hk: 3,
        guest: 2,
        others: 1,
        totalNSBeds: 9,
        studentBedsAvailable: 118,
        occupiedBeds: 101,
        emptyBeds: 17
      }
    },
    { 
      name: 'Nilgiri', 
      totals: {
        ...createEmptyTotals(), 
        totalRooms: 60, 
        totalBeds: 120, 
        warden: 1,
        staff: 2,
        hk: 3,
        guest: 2,
        others: 1,
        totalNSBeds: 9,
        studentBedsAvailable: 118,
        occupiedBeds: 74,
        emptyBeds: 44
      }
    },
    { 
      name: 'Satpura', 
      totals: {
        ...createEmptyTotals(), 
        totalRooms: 60, 
        totalBeds: 120, 
        warden: 1,
        staff: 2,
        hk: 3,
        guest: 2,
        others: 1,
        totalNSBeds: 9,
        studentBedsAvailable: 118,
        occupiedBeds: 99,
        emptyBeds: 19
      }
    },
    { 
      name: 'Kailash', 
      totals: {
        ...createEmptyTotals(), 
        totalRooms: 60, 
        totalBeds: 120, 
        warden: 1,
        staff: 2,
        hk: 3,
        guest: 2,
        others: 1,
        totalNSBeds: 9,
        studentBedsAvailable: 118,
        occupiedBeds: 114,
        emptyBeds: 4
      }
    }
  ],
  phase3Blocks: [
    {
      blockName: 'Phase 3-NW',
      floors: Array.from({ length: 10 }, (_, i) => createUniqueFloorData(i, i === 0)),
      totals: createEmptyTotals()
    },
    {
      blockName: 'Phase 3-SW',
      floors: Array.from({ length: 10 }, (_, i) => createUniqueFloorData(i, i === 0)),
      totals: createEmptyTotals()
    }
  ]
};

const initialBoysHostelData = {
  phase1: {
    blockName: 'Phase 1',
    floors: Array.from({ length: 5 }, (_, i) => createUniqueFloorData(i, i === 0)),
    totals: createEmptyTotals()
  },
  eWing: {
    blockName: 'E-Wing',
    floors: Array.from({ length: 5 }, (_, i) => createUniqueFloorData(i, i === 0)),
    totals: createEmptyTotals()
  },
  phase2: {
    blockName: 'Phase 2',
    floors: Array.from({ length: 13 }, (_, i) => createUniqueFloorData(i, i === 0)),
    totals: createEmptyTotals()
  },
  phase2Part5: {
    blockName: 'Phase 2-Part 5',
    floors: Array.from({ length: 13 }, (_, i) => createUniqueFloorData(i, i === 0)),
    totals: createEmptyTotals()
  },
  phase4: {
    blockName: 'Phase 4',
    floors: Array.from({ length: 4 }, (_, i) => createUniqueFloorData(i, i === 0)),
    totals: createEmptyTotals()
  }
};

const WardenDashboard: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  // Remove all unused variables
  // const [studentData, setStudentData] = useState<Student[]>([]);
  // const [roomSearchTerm, setRoomSearchTerm] = useState("");
  const [wardenName, setWardenName] = useState("Warden");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [summaryView, setSummaryView] = useState<'summary' | 'girls' | 'boys'>('summary');
  const [hostelSummary, setHostelSummary] = useState<HostelSummary[]>([]);
  // const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditableData | null>(null);
  const [girlsHostelData, setGirlsHostelData] = useState(initialGirlsHostelData);
  const [boysHostelData, setBoysHostelData] = useState(initialBoysHostelData);
  const [occupiedBeds, setOccupiedBeds] = useState<{[key: string]: boolean}>({});
  const [studentApplicationNumber, setStudentApplicationNumber] = useState<string>("");
  const [showStudentInput, setShowStudentInput] = useState<boolean>(false);
  const [studentBookings, setStudentBookings] = useState<StudentBooking[]>([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState<string>("");
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [isLoadingStudent, setIsLoadingStudent] = useState<boolean>(false);
  const [documentVerification, setDocumentVerification] = useState({
    antiRagging: false,
    antiDrug: false,
    keysHandedOver: false
  });
  const [profilePic, setProfilePic] = useState<string>(defaultProfilePic);
  const [wardenEmail, setWardenEmail] = useState<string>("");
  const [complaints, setComplaints] = useState<Complaint[]>([
    { _id: "1", applicationNo: "123", studentName: "Om Sai Vikranth", subject: "AC Not Working", description: "AC in my room is not working since last week.", priority: "High", roomDetails: { block: "A", floor: "1", roomNumber: "101" }, status: "Pending", date: "2023-10-01", createdAt: "2023-10-01T10:00:00Z" },
    { _id: "2", applicationNo: "124", studentName: "Mohana Krishna", subject: "Washroom Issue", description: "Smell From Washroom Spreading all over corridor", priority: "Medium", roomDetails: { block: "A", floor: "1", roomNumber: "102" }, status: "Pending", date: "2023-10-02", createdAt: "2023-10-02T11:00:00Z" },
    { _id: "3", applicationNo: "125", studentName: "SJ Satwik", subject: "Light Flickering", description: "Flickering light in room", priority: "Low", roomDetails: { block: "B", floor: "2", roomNumber: "201" }, status: "Resolved", date: "2023-10-03", createdAt: "2023-10-03T12:00:00Z" },
  ]);
  const navigate = useNavigate();

  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const suggestions = [
    // Boys hostels
    { name: "Phase 1", gender: "Boys" },
    { name: "E-wing", gender: "Boys" },
    { name: "Phase 2", gender: "Boys" },
    { name: "Phase 2- part 5", gender: "Boys" },
    { name: "Phase 4", gender: "Boys" },
    // Girls hostels 
    { name: "Dorms", gender: "Girls" },
    { name: "Phase 3-NW", gender: "Girls" },
    { name: "Phase 3-SW", gender: "Girls" },
  ];

  const filteredSuggestions = suggestions.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getDummyHostelData = () => {
    return [
      // Boys hostels grouped together (blue)
      {
        id: "4",
        blockName: "Phase 1",
        totalRooms: 205,
        occupiedRooms: 200,
        totalStudents: 400,
        maintenanceRooms: 3,
        type: 'Boys' as const
      },
      {
        id: "6",
        blockName: "E-wing",
        totalRooms: 60,
        occupiedRooms: 55,
        totalStudents: 109,
        maintenanceRooms: 0,
        type: 'Boys' as const
      },
      {
        id: "5",
        blockName: "Phase 2",
        totalRooms: 621,
        occupiedRooms: 584,
        totalStudents: 1168,
        maintenanceRooms: 5,
        type: 'Boys' as const
      },
      {
        id: "8",
        blockName: "Phase 2- part 5",
        totalRooms: 135,
        occupiedRooms: 119,
        totalStudents: 238,
        maintenanceRooms: 7,
        type: 'Boys' as const
      },
      {
        id: "7",
        blockName: "Phase 4",
        totalRooms: 102,
        occupiedRooms: 51,
        totalStudents: 101,
        maintenanceRooms: 13,
        type: 'Boys' as const
      },
      // Girls hostels grouped together
      {
        id: "1",
        blockName: "Dorms",
        totalRooms: 480,  // Assuming 2 beds per room
        occupiedRooms: 361,
        totalStudents: 721,
        maintenanceRooms: 31, // NS beds / 2 rounded up
        type: 'Girls' as const
      },
      {
        id: "2",
        blockName: "Phase 3-NW",
        totalRooms: 223,
        occupiedRooms: 159,
        totalStudents: 318,
        maintenanceRooms: 2,
        type: 'Girls' as const
      },
      {
        id: "3",
        blockName: "Phase 3-SW",
        totalRooms: 197,
        occupiedRooms: 188,
        totalStudents: 376,
        maintenanceRooms: 2,
        type: 'Girls' as const
      }
    ];
  };

  useEffect(() => {
    const storedWarden = localStorage.getItem("warden_userName");
    if (storedWarden) {
      setWardenName(storedWarden);
    }

    // Get warden user ID and email
    const wardenUserId = localStorage.getItem("warden_userId");
    if (wardenUserId) {
      setWardenEmail(localStorage.getItem("warden_email") || "");
      
      // Load profile photo if available in localStorage
      const savedProfilePic = localStorage.getItem("profilePic");
      if (savedProfilePic && savedProfilePic !== 'null') {
        setProfilePic(savedProfilePic);
      } else {
        // Try to fetch profile photo from the server
        fetchProfilePhoto(wardenUserId);
      }
    }

    // Fetch initial statistics
    fetchHostelStatistics();

    // Set up an interval to periodically update the statistics
    const intervalId = setInterval(fetchHostelStatistics, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  useEffect(() => {
    const fetchApplicationNumber = async () => {
      try {
        const response = await fetch("/api/warden/application-number");
        const data = await response.json();
        // Commented out unused state setter
        // setApplicationNumber(data.applicationNumber);
      } catch (error) {
        console.error("Error fetching application number:", error);
        // setApplicationNumber("Unavailable");
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
  useEffect(() => {
    // This effect will run whenever occupiedBeds state changes
    // It ensures that when a bed is booked/unbooked, all views are updated
    fetchHostelStatistics();
  }, [occupiedBeds]);

  useEffect(() => {
    fetchHostelSummary();
  }, [summaryView]);

  const fetchHostelSummary = async () => {
    try {
      let data = getDummyHostelData();
      
      if (summaryView === 'girls') {
        data = data.filter(hostel => hostel.type === 'Girls');
      } else if (summaryView === 'boys') {
        data = data.filter(hostel => hostel.type === 'Boys');
      }
      
      setHostelSummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleSuggestionClick = (blockName: string) => {
    // setSelectedBlock(blockName);
    // setShowSuggestions(false);
    setSearchTerm(blockName);
    setSelectedSuggestionIndex(-1);

    // setStudentData([]);
    // setFilteredRoomData([]);
    // setRoomSearchTerm("");
  };

  // Commented out unused function
  /*
  const handleRoomSearch = () => {
    const results = studentData.filter((s) =>
      s.room.toLowerCase() === roomSearchTerm.toLowerCase()
    );
    setFilteredRoomData(results);
  };
  */

  // Commented out unused function
  /*
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
  */

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".search-container")) {
      // setShowSuggestions(false);
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

  const handleEdit = (data: EditableData) => {
    // setIsEditing(true);
    setEditData({ ...data }); // Create a copy of the data
  };

  const handleSave = async () => {
    if (!editData) return;
    
    try {
      if ('id' in editData) {
        // All Blocks view
        setHostelSummary(prev => 
          prev.map(item => item.id === editData.id ? editData : item)
        );
      } else if ('name' in editData) {
        // Girls Hostels - Dorms
        setGirlsHostelData(prev => ({
          ...prev,
          dorms: prev.dorms.map(dorm => 
            dorm.name === editData.name ? editData as DormBlock : dorm
          )
        }));
      } else if ('floorNumber' in editData) {
        if (summaryView === 'girls') {
          // Girls Hostels - Phase 3 Blocks
          setGirlsHostelData(prev => ({
            ...prev,
            phase3Blocks: prev.phase3Blocks.map(block => ({
              ...block,
              floors: block.floors.map(floor => 
                floor.floorNumber === editData.floorNumber ? editData as FloorData : floor
              )
            }))
          }));
        } else if (summaryView === 'boys') {
          // Boys Hostels
          setBoysHostelData(prev => {
            const newData = { ...prev };
            Object.entries(newData).forEach(([key, block]) => {
              block.floors = block.floors.map(floor => 
                floor.floorNumber === editData.floorNumber ? editData as FloorData : floor
              );
            });
            return newData;
          });
        }
      }
      // setIsEditing(false);
      setEditData(null);
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to save changes');
    }
  };

  const handleCancelEdit = () => {
    // setIsEditing(false);
    setEditData(null);
  };

  const handleRoomAllocation = async (booking: BookingInfo): Promise<void> => {
    if (!studentApplicationNumber) {
      alert("Please enter student application number");
      return;
    }
  
    try {
      // Make API call to allocate room in the backend
      const response = await fetch('http://localhost:5000/api/hostels/allot-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentApplicationNumber,
          block: booking.block,
          roomNumber: booking.roomNumber,
          bed: booking.bed,
          floor: booking.floor,
          wardenId: localStorage.getItem('warden_userId') || 'unknown',
          reason: 'Allocated by warden'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to allocate room');
      }

      // Update occupied beds
      setOccupiedBeds(prev => ({
        ...prev,
        [booking.roomKey]: true
      }));
  
      // Add to student bookings
      setStudentBookings(prev => [
        ...prev,
        {
          applicationNumber: studentApplicationNumber,
          booking: booking
        }
      ]);
  
      // Clear the current allocation and student number for next booking
      setShowStudentInput(false);
      setStudentApplicationNumber("");
      
      // Save the application number temporarily for the next booking process
      localStorage.setItem("applicationNo", studentApplicationNumber);
        // Show success message
      alert(`Room successfully allocated to student ${studentApplicationNumber}`);

      // Refresh occupied beds from server to make sure UI is in sync
      try {
        const refreshResponse = await fetch('http://localhost:5000/api/occupied-beds');
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          if (refreshData.success) {
            setOccupiedBeds(refreshData.occupiedBeds);
          }
        }
      } catch (error) {
        console.error('Error refreshing occupied beds:', error);
      }
      
      // Update statistics to reflect the new booking across all views
      fetchHostelStatistics();

    } catch (error) {
      console.error('Error allocating room:', error);
      alert(`Failed to allocate room: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      // Always clean up the temporary application number from localStorage
      setTimeout(() => {
        localStorage.removeItem("applicationNo");
      }, 1000);
    }
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSummaryView(e.target.value as 'summary' | 'girls' | 'boys');
  };

  const renderEditableRow = (data: any, type: 'summary' | 'dorm' | 'floor') => {
    const isCurrentlyEditing = editData && (
      ('id' in data && 'id' in editData && data.id === editData.id) ||
      ('name' in data && 'name' in editData && data.name === editData.name) ||
      ('floorNumber' in data && 'floorNumber' in editData && data.floorNumber === editData.floorNumber)
    );

    if (!isCurrentlyEditing) {
      return (
        <tr className={`${data.type?.toLowerCase() || 'girls'}-row`}>
          <td>{data.blockName || data.name || data.floorNumber}</td>
          {type === 'summary' && (
            <>
              <td>{data.totalRooms}</td>
              <td>{data.occupiedRooms}</td>
              <td>{data.totalStudents}</td>
              <td>{data.maintenanceRooms}</td>
              <td>{data.totalRooms - data.occupiedRooms}</td>
              <td>{((data.occupiedRooms / data.totalRooms) * 100).toFixed(1)}%</td>
            </>
          )}
          {(type === 'dorm' || type === 'floor') && (
            <>
              <td>{data.totalRooms}</td>
              <td>{data.totalBeds}</td>
              <td>{data.warden}</td>
              <td>{data.staff}</td>
              <td>{data.hk}</td>
              <td>{data.guest}</td>
              <td>{data.others}</td>
              <td>{data.totalNSBeds}</td>
              <td>{data.studentBedsAvailable}</td>
              <td>{data.occupiedBeds}</td>
              <td>{data.emptyBeds}</td>
            </>
          )}
          <td>
            <button onClick={() => handleEdit(data)} className="action-btn edit">
              Edit
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr className={`${data.type?.toLowerCase() || 'girls'}-row`}>
        <td>{data.blockName || data.name || data.floorNumber}</td>
          {type === 'summary' && 'id' in editData && (
          <>
            <td><input type="number" value={(editData as HostelSummary).totalRooms} onChange={e => setEditData({...editData, totalRooms: +e.target.value})} /></td>
            <td><input type="number" value={(editData as HostelSummary).occupiedRooms} onChange={e => setEditData({...editData, occupiedRooms: +e.target.value})} /></td>
            <td><input type="number" value={(editData as HostelSummary).totalStudents} onChange={e => setEditData({...editData, totalStudents: +e.target.value})} /></td>
            <td><input type="number" value={(editData as HostelSummary).maintenanceRooms} onChange={e => setEditData({...editData, maintenanceRooms: +e.target.value})} /></td>
            <td>{(editData as HostelSummary).totalRooms - (editData as HostelSummary).occupiedRooms}</td>
            <td>{(((editData as HostelSummary).occupiedRooms / (editData as HostelSummary).totalRooms) * 100).toFixed(1)}%</td>
          </>
        )}
        {(type === 'dorm' || type === 'floor') && ('totals' in editData || 'floorNumber' in editData) && (
          <>
            <td><input type="number" value={('totals' in editData ? editData.totals.totalRooms : editData.totalRooms)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, totalRooms: +e.target.value}} : {totalRooms: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.totalBeds : editData.totalBeds)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, totalBeds: +e.target.value}} : {totalBeds: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.warden : editData.warden)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, warden: +e.target.value}} : {warden: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.staff : editData.staff)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, staff: +e.target.value}} : {staff: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.hk : editData.hk)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, hk: +e.target.value}} : {hk: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.guest : editData.guest)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, guest: +e.target.value}} : {guest: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.others : editData.others)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, others: +e.target.value}} : {others: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.totalNSBeds : editData.totalNSBeds)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, totalNSBeds: +e.target.value}} : {totalNSBeds: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.studentBedsAvailable : editData.studentBedsAvailable)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, studentBedsAvailable: +e.target.value}} : {studentBedsAvailable: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.occupiedBeds : editData.occupiedBeds)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, occupiedBeds: +e.target.value}} : {occupiedBeds: +e.target.value})})} /></td>
            <td><input type="number" value={('totals' in editData ? editData.totals.emptyBeds : editData.emptyBeds)} onChange={e => setEditData({...editData, ...('totals' in editData ? {totals: {...editData.totals, emptyBeds: +e.target.value}} : {emptyBeds: +e.target.value})})} /></td>
          </>
        )}
        <td>
          <button onClick={handleSave} className="action-btn save">Save</button>
          <button onClick={handleCancelEdit} className="action-btn cancel">Cancel</button>
        </td>
      </tr>
    );
  };

  const renderSummaryRow = (summary: HostelSummary) => renderEditableRow(summary, 'summary');
  const renderDormRow = (block: DormBlock) => {
    const isCurrentlyEditing = editData && 'name' in editData && block.name === editData.name;

    if (!isCurrentlyEditing) {
      return (
        <tr key={block.name} className="girls-row">
          <td>{block.name}</td>
          <td>{block.totals.totalRooms}</td>
          <td>{block.totals.totalBeds}</td>
          <td>{block.totals.warden}</td>
          <td>{block.totals.staff}</td>
          <td>{block.totals.hk}</td>
          <td>{block.totals.guest}</td>
          <td>{block.totals.others}</td>
          <td>{block.totals.totalNSBeds}</td>
          <td>{block.totals.studentBedsAvailable}</td>
          <td>{block.totals.occupiedBeds}</td>
          <td>{block.totals.emptyBeds}</td>
          <td>
            <button onClick={() => handleEdit(block)} className="action-btn edit">Edit</button>
          </td>
        </tr>
      );
    }

    return (
      <tr className="girls-row">
        <td>{block.name}</td>
        <td><input type="number" value={editData.totals.totalRooms} onChange={e => setEditData({...editData, totals: {...editData.totals, totalRooms: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.totalBeds} onChange={e => setEditData({...editData, totals: {...editData.totals, totalBeds: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.warden} onChange={e => setEditData({...editData, totals: {...editData.totals, warden: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.staff} onChange={e => setEditData({...editData, totals: {...editData.totals, staff: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.hk} onChange={e => setEditData({...editData, totals: {...editData.totals, hk: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.guest} onChange={e => setEditData({...editData, totals: {...editData.totals, guest: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.others} onChange={e => setEditData({...editData, totals: {...editData.totals, others: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.totalNSBeds} onChange={e => setEditData({...editData, totals: {...editData.totals, totalNSBeds: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.studentBedsAvailable} onChange={e => setEditData({...editData, totals: {...editData.totals, studentBedsAvailable: +e.target.value}})} /></td>
        <td><input type="number" value={editData.totals.occupiedBeds} onChange={e => setEditData({...editData, totals: {...editData.totals, occupiedBeds: +e.target.value}})} /></td>
        <td>{editData.totals.emptyBeds}</td>
        <td>
          <button onClick={handleSave} className="action-btn save">Save</button>
          <button onClick={handleCancelEdit} className="action-btn cancel">Cancel</button>
        </td>
      </tr>
    );
  };

  const renderFloorRow = (floor: FloorData) => {
    const isCurrentlyEditing = editData && 'floorNumber' in editData && floor.floorNumber === editData.floorNumber;

    if (!isCurrentlyEditing) {
      return (
        <tr key={floor.floorNumber} className={summaryView === 'boys' ? 'boys-row' : 'girls-row'}>
          <td>{floor.floorNumber}</td>
          <td>{floor.totalRooms}</td>
          <td>{floor.totalBeds}</td>
          <td>{floor.warden}</td>
          <td>{floor.staff}</td>
          <td>{floor.hk}</td>
          <td>{floor.guest}</td>
          <td>{floor.others}</td>
          <td>{floor.totalNSBeds}</td>
          <td>{floor.studentBedsAvailable}</td>
          <td>{floor.occupiedBeds}</td>
          <td>{floor.emptyBeds}</td>
          <td>
            <button onClick={() => handleEdit(floor)} className="action-btn edit">Edit</button>
          </td>
        </tr>
      );
    }

    return (
      <tr className={summaryView === 'boys' ? 'boys-row' : 'girls-row'}>
        <td>{floor.floorNumber}</td>
        <td><input type="number" value={editData.totalRooms} onChange={e => setEditData({...editData, totalRooms: +e.target.value})} /></td>
        <td><input type="number" value={editData.totalBeds} onChange={e => setEditData({...editData, totalBeds: +e.target.value})} /></td>
        <td><input type="number" value={editData.warden} onChange={e => setEditData({...editData, warden: +e.target.value})} /></td>
        <td><input type="number" value={editData.staff} onChange={e => setEditData({...editData, staff: +e.target.value})} /></td>
        <td><input type="number" value={editData.hk} onChange={e => setEditData({...editData, hk: +e.target.value})} /></td>
        <td><input type="number" value={editData.guest} onChange={e => setEditData({...editData, guest: +e.target.value})} /></td>
        <td><input type="number" value={editData.others} onChange={e => setEditData({...editData, others: +e.target.value})} /></td>
        <td><input type="number" value={editData.totalNSBeds} onChange={e => setEditData({...editData, totalNSBeds: +e.target.value})} /></td>
        <td><input type="number" value={editData.studentBedsAvailable} onChange={e => setEditData({...editData, studentBedsAvailable: +e.target.value})} /></td>
        <td><input type="number" value={editData.occupiedBeds} onChange={e => setEditData({...editData, occupiedBeds: +e.target.value})} /></td>
        <td>{editData.emptyBeds}</td>
        <td>
          <button onClick={handleSave} className="action-btn save">Save</button>
          <button onClick={handleCancelEdit} className="action-btn cancel">Cancel</button>
        </td>
      </tr>
    );
  };

  const renderRoomAllotmentContent = () => {
    return (
      <div className="room-allotment-container">
        <div className="student-input-section">
          <input
            type="text"
            placeholder="Enter Student Application Number"
            value={studentApplicationNumber}
            onChange={(e) => setStudentApplicationNumber(e.target.value)}
            className="student-application-input"
          />
          <button 
            onClick={() => {
              const existingBooking = studentBookings.find(
                sb => sb.applicationNumber === studentApplicationNumber
              );
              
              if (existingBooking) {
                alert(`Student ${studentApplicationNumber} already has an active booking`);
                return;
              }
              
              setShowStudentInput(true);
            }}
            className="proceed-btn"
            disabled={!studentApplicationNumber}
          >
            Proceed to Room Selection
          </button>
        </div>
        
        {showStudentInput && (
          <div className="hostel-floor-plan-section">
            <HostelFloorPlanViewer
              currentUserBooking={null}
              setCurrentUserBooking={(booking: BookingInfo | null) => {
                if (booking) {
                  // Process the booking only when it has a complete room and bed selection
                  if (booking.bed && booking.roomNumber && booking.block && booking.floor) {
                    handleRoomAllocation(booking);
                  }
                }
              }}
              occupiedBeds={occupiedBeds}
              setOccupiedBeds={setOccupiedBeds}
              navigateToBookingPage={() => {}}
            />
          </div>
        )}

        {studentBookings.length > 0 && (
          <div className="allocations-list">
            <h3>Current Allocations</h3>
            <div className="table-responsive">
              <table className="allocations-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Block</th>
                    <th>Floor</th>
                    <th>Room</th>
                    <th>Bed</th>
                  </tr>
                </thead>
                <tbody>
                  {studentBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.applicationNumber}</td>
                      <td>{booking.booking.block}</td>
                      <td>{booking.booking.floor}</td>
                      <td>{booking.booking.roomNumber}</td>
                      <td>{booking.booking.bed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOverviewContent = () => {
    if (selectedMenu !== 'Overview') return null;

    if (summaryView === 'girls') {
      const { dorms, phase3Blocks } = girlsHostelData;
      
      return (
        <div className="overview-container">
          <div className="summary-controls">
            <select 
              value={summaryView} 
              onChange={handleViewChange}
              className="summary-dropdown"
            >
              <option value="summary">All Blocks</option>
              <option value="girls">Girls Hostels</option>
              <option value="boys">Boys Hostels</option>
            </select>
          </div>

          <div className="summary-container">
            <h3>Dorms Summary</h3>
            <div className="table-responsive">
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Block Name</th>
                    <th>Total Rooms</th>
                    <th>Total Beds</th>
                    <th>Warden</th>
                    <th>Staff</th>
                    <th>H.K</th>
                    <th>Guest</th>
                    <th>Others</th>
                    <th>Total NS Beds</th>
                    <th>Student Beds</th>
                    <th>Occupied Beds</th>
                    <th>Empty Beds</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dorms.map(renderDormRow)}
                </tbody>
              </table>
            </div>

            {phase3Blocks.map(block => (
              <div key={block.blockName}>
                <h3>{block.blockName}</h3>
                <div className="table-responsive">
                  <table className="summary-table">
                    <thead>
                      <tr>
                        <th>Floor</th>
                        <th>Total Rooms</th>
                        <th>Total Beds</th>
                        <th>Warden</th>
                        <th>Staff</th>
                        <th>H.K</th>
                        <th>Guest</th>
                        <th>Others</th>
                        <th>Total NS Beds</th>
                        <th>Student Beds</th>
                        <th>Occupied Beds</th>
                        <th>Empty Beds</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {block.floors.map(renderFloorRow)}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (summaryView === 'boys') {
      return (
        <div className="overview-container">
          <div className="summary-controls">
            <select 
              value={summaryView} 
              onChange={handleViewChange}
              className="summary-dropdown"
            >
              <option value="summary">All Blocks</option>
              <option value="girls">Girls Hostels</option>
              <option value="boys">Boys Hostels</option>
            </select>
          </div>

          <div className="summary-container">
            {Object.entries(boysHostelData).map(([blockKey, block]) => (
              <div key={blockKey}>
                <h3>{block.blockName}</h3>
                <div className="table-responsive">
                  <table className="summary-table">
                    <thead>
                      <tr>
                        <th>Floor</th>
                        <th>Total Rooms</th>
                        <th>Total Beds</th>
                        <th>Warden</th>
                        <th>Staff</th>
                        <th>H.K</th>
                        <th>Guest</th>
                        <th>Others</th>
                        <th>Total NS Beds</th>
                        <th>Student Beds</th>
                        <th>Occupied Beds</th>
                        <th>Empty Beds</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {block.floors.map(renderFloorRow)}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="overview-container">
        <div className="summary-controls">
          <select 
            value={summaryView} 
            onChange={handleViewChange}
            className="summary-dropdown"
          >
            <option value="summary">All Blocks</option>
            <option value="girls">Girls Hostels</option>
            <option value="boys">Boys Hostels</option>
          </select>
        </div>

        <div className="summary-container">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Block Name</th>
                <th>Total Beds</th>
                <th>Occupied Beds</th>
                <th>NS Beds</th>
                <th>Student Beds</th>
                <th>Empty Beds</th>
                <th>Occupied %</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostelSummary.map(renderSummaryRow)}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Add useEffect to fetch complaints when component mounts
  useEffect(() => {
    fetchComplaints();
  }, [selectedMenu]);

  // Function to fetch complaints from the server
  const fetchComplaints = async () => {
    if (selectedMenu !== "Maintenance Complaints") return;
    
    try {
      const response = await fetch('http://localhost:5000/api/complaints');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.complaints) {
          setComplaints(data.complaints);
        }
      } else {
        console.error('Failed to fetch complaints');
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  // Function to update complaint status
  const updateComplaintStatus = async (id: string, newStatus: 'Pending' | 'In Progress' | 'Resolved' | 'Closed', response?: string) => {
    try {
      const updateData: {status: string, wardenResponse?: string} = { status: newStatus };
      if (response) {
        updateData.wardenResponse = response;
      }
      
      const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (res.ok) {
        // Update local state with new status
        setComplaints(prev => 
          prev.map(complaint => 
            complaint._id === id ? { ...complaint, status: newStatus, wardenResponse: response || complaint.wardenResponse } : complaint
          )
        );
        alert(`Complaint has been marked as ${newStatus}`);
      } else {
        const errorData = await res.json();
        alert(`Failed to update complaint status: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating complaint status:', error);
      alert('An error occurred while updating the complaint');
    }
  };

  // Commented out unused function
  /*
  const markAsResolved = (id: string) => {
    setComplaints(prev =>
      prev.map(complaint =>
        complaint._id === id ? { ...complaint, status: "Resolved" } : complaint
      )
    );
  };
  */

  const renderComplaintsContent = () => (
    <div className="complaints-container">
      <div className="table-responsive">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Application No.</th>
              <th>Room Details</th>
              <th>Subject</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map(complaint => (
                <tr key={complaint._id}>
                  <td>{complaint.studentName}</td>
                  <td>{complaint.applicationNo}</td>
                  <td>
                    {complaint.roomDetails ? 
                      `${complaint.roomDetails.block}-${complaint.roomDetails.floor}-${complaint.roomDetails.roomNumber}` : 
                      'Not assigned'}
                  </td>
                  <td>{complaint.subject}</td>
                  <td>
                    <span className={`priority-badge ${complaint.priority.toLowerCase()}`}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td>{new Date(complaint.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    {complaint.status === "Pending" && (
                      <button
                        className="action-btn resolve"
                        onClick={() => updateComplaintStatus(complaint._id, "Resolved")}
                      >
                        Resolve
                      </button>
                    )}
                    {complaint.status === "In Progress" && (
                      <button
                        className="action-btn resolve"
                        onClick={() => updateComplaintStatus(complaint._id, "Resolved")}
                      >
                        Resolve
                      </button>
                    )}
                    {complaint.status === "Resolved" && (
                      <button
                        className="action-btn close"
                        onClick={() => updateComplaintStatus(complaint._id, "Closed")}
                      >
                        Close
                      </button>
                    )}
                    
                    <button
                      className="action-btn view"
                      onClick={() => alert(`Description: ${complaint.description}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="status-legend" style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <div className="legend-item">
          <span className="status-badge pending"></span> Pending
        </div>
        <div className="legend-item">
          <span className="status-badge in-progress"></span> In Progress
        </div>
        <div className="legend-item">
          <span className="status-badge resolved"></span> Resolved
        </div>
        <div className="legend-item">
          <span className="status-badge closed"></span> Closed
        </div>
      </div>
    </div>
  );

  // Function to search for student by application number
  const searchStudent = async () => {
    if (!studentSearchQuery.trim()) {
      alert('Please enter an application number to search');
      return;
    }
    
    setIsLoadingStudent(true);
    setStudentDetails(null); // Clear previous student details
    
    try {
      console.log(`Searching for student with application number: ${studentSearchQuery.trim()}`);
      const response = await fetch(`http://localhost:5000/api/warden/student/${studentSearchQuery.trim()}`);
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('API response data:', data);
        
        // Check if API call was successful
        if (data.success) {
          setStudentDetails(data.studentDetails);
          
          // Set document verification state from response
          if (data.studentDetails.documentVerification) {
            setDocumentVerification({
              antiRagging: data.studentDetails.documentVerification.antiRagging || false,
              antiDrug: data.studentDetails.documentVerification.antiDrug || false,
              keysHandedOver: data.studentDetails.documentVerification.keysHandedOver || false
            });
          } else {
            // Reset verification checkboxes if no verification data
            setDocumentVerification({
              antiRagging: false,
              antiDrug: false,
              keysHandedOver: false
            });
          }
        } else {
          // No student found - keep studentDetails as null
          console.log('API call successful but no student found');
          setStudentDetails(null);
        }
      } else {
        // API error - keep studentDetails as null
        const errorText = await response.text();
        console.error('API error response:', errorText);
        setStudentDetails(null);
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      setStudentDetails(null);
    } finally {
      setIsLoadingStudent(false);
    }
  };

  // Function to submit document verification
  const submitDocumentVerification = async () => {
    if (!studentDetails) return;
    
    const confirmMsg = 'This will mark the following documents as received:\n' + 
      (documentVerification.antiRagging ? '✓ Anti-Ragging Declaration\n' : '✗ Anti-Ragging Declaration\n') +
      (documentVerification.antiDrug ? '✓ Anti-Drug Declaration\n' : '✗ Anti-Drug Declaration\n') +
      (documentVerification.keysHandedOver ? '✓ Room Keys Handed Over\n' : '✗ Room Keys Handed Over\n') +
      '\nDo you want to proceed?';
      
    if (!window.confirm(confirmMsg)) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/warden/student/${studentSearchQuery}/verify-documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentVerification),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Document verification updated successfully');
          // Update student details with new verification status
          setStudentDetails((prev: any) => ({
            ...prev,
            documentVerification: data.documentVerification
          }));
        } else {
          alert('Failed to update document verification');
        }
      } else {
        alert('Error updating document verification');
      }
    } catch (error) {
      console.error('Error submitting document verification:', error);
      alert('Failed to submit document verification. Please try again.');
    }
  };

  // Add a type interface for block data in statistics
  interface BlockStatistics {
    blockName: string;
    floors: Record<string, {
      totalRooms: number;
      totalBeds: number;
      studentBedsAvailable: number;
      occupiedBeds: number;
    }>;
    totalRooms: number;
    totalBeds: number;
    nonStudentBeds: number;
    studentBedsAvailable: number;
    occupiedBeds: number;
  }

  // Create an index signature for boysHostelData
  type BoysHostelData = {
    [key: string]: {
      blockName: string;
      floors: FloorData[];
      totals: Omit<FloorData, "floorNumber">;
    }  }
  const fetchHostelStatistics = async () => {
    try {
      // First try to fetch real data from the server
      const response = await fetch('http://localhost:5000/api/hostels/statistics/all');
      if (!response.ok) {
        throw new Error('Failed to fetch hostel statistics');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Process the real data from the server
        processHostelStatistics(data);
      } else {
        console.error('Error in hostel statistics response:', data.message);
        // Fallback to dummy data if the API fails
        fallbackToLocalData();
      }
    } catch (error) {
      console.error('Error fetching hostel statistics:', error);
      // Fallback to dummy data if the API fails
      fallbackToLocalData();
    }
  };

  // Function to process real data from the server
  const processHostelStatistics = (data: any) => {
    // Format the data for our frontend
    let formattedData;
    
    if (summaryView === 'summary') {
      // For all blocks summary, transform to match our frontend format
      formattedData = data.statistics.allBlocks.map((block: BlockStatistics) => ({
        id: block.blockName,
        blockName: block.blockName,
        totalRooms: block.totalRooms,
        occupiedRooms: Math.ceil(block.occupiedBeds / 2), // Assuming 2 beds per room
        totalStudents: block.occupiedBeds,
        maintenanceRooms: Math.ceil(block.nonStudentBeds / 2), // Assuming 2 beds per room
        type: block.blockName.includes('Phase 3') || ['Aravali', 'Ajanta', 'Himalaya', 'Shivalik', 'Vindhya', 'Nilgiri', 'Satpura', 'Kailash'].includes(block.blockName) ? 'Girls' as const : 'Boys' as const
      }));
      setHostelSummary(formattedData);
    } 
    else if (summaryView === 'girls') {
      // Process girls hostel data
      const girlsBlocks = data.statistics.girlsHostels as BlockStatistics[];
      
      // Process dorms (blocks named Aravali, Ajanta, etc.)
      const dormBlocks = girlsBlocks.filter((block: BlockStatistics) => 
        ['Aravali', 'Ajanta', 'Himalaya', 'Shivalik', 'Vindhya', 
         'Nilgiri', 'Satpura', 'Kailash'].includes(block.blockName)
      );
      
      const dorms = dormBlocks.map((block: BlockStatistics) => ({
        name: block.blockName,
        totals: {
          totalRooms: block.totalRooms,
          totalBeds: block.totalBeds,
          warden: 1,
          staff: 2,
          hk: 3,
          guest: 2,
          others: 1,
          totalNSBeds: block.nonStudentBeds,
          studentBedsAvailable: block.studentBedsAvailable,
          occupiedBeds: block.occupiedBeds,
          emptyBeds: block.studentBedsAvailable - block.occupiedBeds
        }
      }));
      
      // Process Phase 3 blocks
      const phase3Blocks = girlsBlocks.filter((block: BlockStatistics) => 
        block.blockName.startsWith('Phase 3')
      ).map((block: BlockStatistics) => {
        // Extract floor data
        const floors = Object.entries(block.floors).map(([floorName, floorData]) => ({
          floorNumber: floorName,
          totalRooms: floorData.totalRooms,
          totalBeds: floorData.totalBeds,
          warden: 1,
          staff: 1,
          hk: 1,
          guest: 1,
          others: 0,
          totalNSBeds: floorData.totalBeds - floorData.studentBedsAvailable,
          studentBedsAvailable: floorData.studentBedsAvailable,
          occupiedBeds: floorData.occupiedBeds,
          emptyBeds: floorData.studentBedsAvailable - floorData.occupiedBeds
        }));
        
        return {
          blockName: block.blockName,
          floors: floors,
          totals: {
            totalRooms: block.totalRooms,
            totalBeds: block.totalBeds,
            warden: 1,
            staff: 2,
            hk: 3,
            guest: 2,
            others: 1,
            totalNSBeds: block.nonStudentBeds,
            studentBedsAvailable: block.studentBedsAvailable,
            occupiedBeds: block.occupiedBeds,
            emptyBeds: block.studentBedsAvailable - block.occupiedBeds
          }
        };
      });
      
      setGirlsHostelData({ 
        dorms: dorms.length > 0 ? dorms : initialGirlsHostelData.dorms,
        phase3Blocks: phase3Blocks.length > 0 ? phase3Blocks : initialGirlsHostelData.phase3Blocks
      });
    } 
    else if (summaryView === 'boys') {
      // Process boys hostel data
      const boysBlocks = data.statistics.boysHostels as BlockStatistics[];
      
      // Create new boys hostel data object
      const newBoysHostelData = { ...initialBoysHostelData } as BoysHostelData;
      
      // Update each block with its real data
      boysBlocks.forEach((block: BlockStatistics) => {
        let targetBlock = '';
        
        if (block.blockName === 'Phase 1') {
          targetBlock = 'phase1';
        } else if (block.blockName === 'E-wing') {
          targetBlock = 'eWing';
        } else if (block.blockName === 'Phase 2') {
          targetBlock = 'phase2';
        } else if (block.blockName === 'Phase 2- part 5') {
          targetBlock = 'phase2Part5';
        } else if (block.blockName === 'Phase 4') {
          targetBlock = 'phase4';
        }
        
        if (targetBlock && newBoysHostelData[targetBlock]) {
          // Extract floor data
          const floors = Object.entries(block.floors).map(([floorName, floorData]) => ({
            floorNumber: floorName,
            totalRooms: floorData.totalRooms,
            totalBeds: floorData.totalBeds,
            warden: 1,
            staff: 1,
            hk: 1,
            guest: 1,
            others: 0,
            totalNSBeds: floorData.totalBeds - floorData.studentBedsAvailable,
            studentBedsAvailable: floorData.studentBedsAvailable,
            occupiedBeds: floorData.occupiedBeds,
            emptyBeds: floorData.studentBedsAvailable - floorData.occupiedBeds
          }));
          
          newBoysHostelData[targetBlock] = {
            blockName: block.blockName,
            floors: floors.length > 0 ? floors : initialBoysHostelData[targetBlock as keyof typeof initialBoysHostelData].floors,
            totals: {
              totalRooms: block.totalRooms,
              totalBeds: block.totalBeds,
              warden: 1,
              staff: 2,
              hk: 3,
              guest: 2,
              others: 1,
              totalNSBeds: block.nonStudentBeds,
              studentBedsAvailable: block.studentBedsAvailable,
              occupiedBeds: block.occupiedBeds,
              emptyBeds: block.studentBedsAvailable - block.occupiedBeds
            }
          };
        }
      });
      
      setBoysHostelData(newBoysHostelData as typeof initialBoysHostelData);
    }
  };

  // Fallback to local dummy data when API fails
  const fallbackToLocalData = () => {
    // For summary view, use the dummy data with the appropriate filtering
    if (summaryView === 'summary') {
      setHostelSummary(getDummyHostelData());
    } else if (summaryView === 'girls') {
      setHostelSummary(getDummyHostelData().filter(hostel => hostel.type === 'Girls'));    } else if (summaryView === 'boys') {
      setHostelSummary(getDummyHostelData().filter(hostel => hostel.type === 'Boys'));
    }
  };

  // Add this function to fetch profile photo from the server
  const fetchProfilePhoto = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/warden/profile-photo/${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.profilePhoto) {
          const photoUrl = `http://localhost:5000${data.profilePhoto}`;
          setProfilePic(photoUrl);
          localStorage.setItem("profilePic", photoUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching profile photo:', error);
    }  };

  // Handle profile photo updates
  const handleProfilePhotoUpdate = (photoUrl: string) => {
    // Add a timestamp to prevent browser caching
    const photoUrlWithTimestamp = `${photoUrl}?t=${new Date().getTime()}`;
    
    setProfilePic(photoUrlWithTimestamp);
    localStorage.setItem("profilePic", photoUrlWithTimestamp);
    
    // Force immediate update of all profile images in the DOM
    setTimeout(() => {
      const profileElements = document.querySelectorAll('.profile-circle-image');
      profileElements.forEach(el => {
        (el as HTMLImageElement).src = photoUrlWithTimestamp;
      });
      
      // Force a re-render
      window.dispatchEvent(new Event('storage'));
    }, 100);
  };

  return (
    <div className="dashboard-container">
      {/* TOP NAVIGATION BAR */}
      <div className="dashboard-top-nav">
        <div className="profile-section-top">
          <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
        </div>
        <ul className="top-menu">
          <li
            className={`top-menu-item ${selectedMenu === "Overview" ? "active" : ""}`}
            onClick={() => setSelectedMenu("Overview")}
          >
            Room Overview
          </li>
          <li
            className={`top-menu-item ${selectedMenu === "Room Allotment" ? "active" : ""}`}
            onClick={() => setSelectedMenu("Room Allotment")}
          >
            Room Allotment
          </li>
          <li
            className={`top-menu-item ${selectedMenu === "Student Search" ? "active" : ""}`}
            onClick={() => setSelectedMenu("Student Search")}
          >
            Student Search
          </li>
          <li
            className={`top-menu-item ${selectedMenu === "Maintenance Complaints" ? "active" : ""}`}
            onClick={() => setSelectedMenu("Maintenance Complaints")}
          >
            Complaints
          </li>
        </ul>
        <div className="profile-button-container" ref={profileRef}>
          <button
            className="profile-clickable"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
          >
            {profilePic && profilePic !== defaultProfilePic ? (
              <img src={profilePic} alt="Profile" className="profile-circle-image" />
            ) : (
              <div className="profile-circle">
                <span>{wardenName.charAt(0)}</span>
              </div>
            )}
            <p className="profile-name">{wardenName}</p>
          </button>
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {wardenName}
                </p>
                {wardenEmail && (
                  <p>
                    <strong>Email:</strong> {wardenEmail}
                  </p>
                )}
              </div>
              <ul>
                <li onClick={() => setSelectedMenu("Profile")}>
                  Profile Photo
                </li>
                <li onClick={() => navigate("/change-password")}>
                  Change Password
                </li>
                <li onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        <h1>{selectedMenu}</h1>
        {selectedMenu === "Overview" && renderOverviewContent()}
        {selectedMenu === "Room Allotment" && renderRoomAllotmentContent()}
        {selectedMenu === "Student Search" && (          <div className="student-search-container">
            <div className="search-box" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '700px',
              margin: '0 auto 30px',
              height: '50px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              padding: '5px',
              backgroundColor: '#fff'
            }}>
              <input
                type="text"
                placeholder="Enter Student Application/Admission Number"
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
                className="search-input"
                style={{
                  width: '75%',
                  padding: '12px 15px',
                  borderRadius: '6px 0 0 6px',
                  border: '1px solid #e0e0e0',
                  fontSize: '16px',
                  height: '100%',
                  boxSizing: 'border-box',
                  margin: 0,
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchStudent();
                  }
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#c23535';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e0e0e0';
                }}
              />
              <button 
                onClick={searchStudent} 
                className="search-button"
                disabled={isLoadingStudent}
                style={{
                  width: '25%',
                  padding: '12px 15px',
                  backgroundColor: '#c23535',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 6px 6px 0',
                  cursor: 'pointer',
                  fontSize: '16px',
                  height: '100%',
                  boxSizing: 'border-box',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.3s ease',
                  fontWeight: '500'
                }}
              >
                {isLoadingStudent ? (
                  <>
                    <span className="loading-spinner" style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                      borderTopColor: '#fff',
                      animation: 'spin 1s linear infinite'
                    }}></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Search
                  </>
                )}
              </button>
            </div>
            
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                .search-button:hover {
                  background-color: #a52020 !important;
                }
              `}
            </style>
              {studentDetails && (
              <div className="student-details-container" style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                maxWidth: '1000px',
                margin: '0 auto',
                border: '1px solid #e0e0e0'
              }}>
                {/* Student Progress Header */}
                <div className="student-header" style={{
                  backgroundColor: '#f5f5f5',
                  padding: '18px 25px',
                  borderBottom: '1px solid #e0e0e0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}>
                  <h2 style={{
                    margin: 0,
                    fontSize: '22px',
                    color: '#333',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Student Details
                  </h2>
                  
                  <div className="completion-status" style={{
                    display: 'flex',
                    gap: '15px'
                  }}>
                    <div className={`status-item ${studentDetails.progress.formCompleted ? 'completed' : 'pending'}`} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 16px',
                      borderRadius: '30px',
                      backgroundColor: studentDetails.progress.formCompleted ? '#e8f5e9' : '#fff3e0',
                      border: `1px solid ${studentDetails.progress.formCompleted ? '#a5d6a7' : '#ffcc80'}`,
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      <span className="status-icon" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: studentDetails.progress.formCompleted ? '#4caf50' : '#ff9800',
                        color: 'white',
                        fontSize: '14px'
                      }}>
                        {studentDetails.progress.formCompleted ? '✓' : '!'}
                      </span>
                      <span>Form</span>
                    </div>
                    
                    <div className={`status-item ${studentDetails.progress.paymentCompleted ? 'completed' : 'pending'}`} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 16px',
                      borderRadius: '30px',
                      backgroundColor: studentDetails.progress.paymentCompleted ? '#e8f5e9' : '#fff3e0',
                      border: `1px solid ${studentDetails.progress.paymentCompleted ? '#a5d6a7' : '#ffcc80'}`,
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      <span className="status-icon" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: studentDetails.progress.paymentCompleted ? '#4caf50' : '#ff9800',
                        color: 'white',
                        fontSize: '14px'
                      }}>
                        {studentDetails.progress.paymentCompleted ? '✓' : '!'}
                      </span>
                      <span>Payment</span>
                    </div>
                    
                    <div className={`status-item ${studentDetails.progress.roomBooked ? 'completed' : 'pending'}`} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 16px',
                      borderRadius: '30px',
                      backgroundColor: studentDetails.progress.roomBooked ? '#e8f5e9' : '#fff3e0',
                      border: `1px solid ${studentDetails.progress.roomBooked ? '#a5d6a7' : '#ffcc80'}`,
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      <span className="status-icon" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: studentDetails.progress.roomBooked ? '#4caf50' : '#ff9800',
                        color: 'white',
                        fontSize: '14px'
                      }}>
                        {studentDetails.progress.roomBooked ? '✓' : '!'}
                      </span>
                      <span>Room</span>
                    </div>
                  </div>
                </div>
                  {/* Student profile card */}
                <div className="student-profile-card" style={{
                  display: 'flex',
                  padding: '25px',
                  borderBottom: '1px solid #e0e0e0',
                  backgroundColor: '#ffffff'
                }}>
                  {/* Left side - Photo and ID badge */}
                  <div className="profile-photo-section" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '200px',
                    marginRight: '30px'
                  }}>
                    <div className="profile-photo-container" style={{
                      width: '160px',
                      height: '160px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      border: '3px solid #ffffff',
                      position: 'relative'
                    }}>
                      {studentDetails.profilePhoto ? (
                        <img
                          src={`http://localhost:5000${studentDetails.profilePhoto}?t=${new Date().getTime()}`}
                          alt="Student Profile"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f5f5f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="id-badge" style={{
                      marginTop: '15px',
                      textAlign: 'center',
                      padding: '10px 20px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '6px',
                      border: '1px solid #e0e0e0',
                      width: '100%'
                    }}>
                      <div style={{fontSize: '13px', color: '#666', marginBottom: '3px'}}>Application Number</div>
                      <div style={{
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        color: '#333',
                        wordBreak: 'break-word'
                      }}>
                        {studentDetails.formData?.applicationNo || studentDetails.formData?.admission_no || studentSearchQuery}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Student details */}
                  <div className="student-details-content" style={{flex: 1}}>
                    <div className="student-name-section" style={{marginBottom: '20px'}}>
                      <h2 style={{
                        margin: '0 0 8px 0', 
                        fontSize: '26px', 
                        fontWeight: '600',
                        color: '#222'
                      }}>
                        {studentDetails.formData?.student_name || 'Student Name'}
                      </h2>
                      <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                        {studentDetails.formData?.programme && (
                          <div style={{
                            padding: '6px 12px',
                            backgroundColor: '#e3f2fd',
                            borderRadius: '30px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#1565c0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10M22 10V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V10M22 10H2M8 15H16" stroke="#1565c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {studentDetails.formData?.programme}
                          </div>
                        )}
                        
                        {studentDetails.formData?.batch && (
                          <div style={{
                            padding: '6px 12px',
                            backgroundColor: '#f3e5f5',
                            borderRadius: '30px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#7b1fa2',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 2V6" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 2V6" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3 10H21" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {studentDetails.formData?.batch}
                          </div>
                        )}
                        
                        {studentDetails.formData?.school && (
                          <div style={{
                            padding: '6px 12px',
                            backgroundColor: '#e8f5e9',
                            borderRadius: '30px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#2e7d32',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2 17L12 22L22 17" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M2 12L12 17L22 12" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {studentDetails.formData?.school}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Contact information cards */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '15px',
                      marginBottom: '20px'
                    }}>
                      {/* Student Contact */}
                      <div className="contact-card" style={{
                        flex: '1 0 calc(33.33% - 15px)',
                        minWidth: '250px',
                        backgroundColor: '#f9fafc',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        padding: '15px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '10px'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#e8f4fd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3746C21.0391 21.7497 20.5099 21.9604 19.96 21.96C16.4289 21.6533 13.0343 20.3971 10.07 18.32C7.31353 16.4208 5.06218 13.9658 3.5 11C1.42 7.93 0.170038 4.41 0 0.75C-0.000331979 0.204195 0.208058 -0.320209 0.58026 -0.692573C0.952462 -1.06494 1.47989 -1.27311 2.026 -1.27H5.026C5.90343 -1.28437 6.68872 -0.648376 6.9 0.2C7.06261 1.02008 7.3163 1.82546 7.66 2.6C7.91734 3.16497 7.8793 3.81326 7.554 4.347L6.554 5.96C7.97472 8.97284 10.4772 11.4753 13.49 12.898L15.103 11.898C15.6367 11.5727 16.285 11.5347 16.85 11.792C17.6245 12.1357 18.4299 12.3894 19.25 12.552C20.1251 12.7676 20.7735 13.5823 20.75 14.482L22 16.92Z" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <div style={{fontSize: '15px', fontWeight: '600', color: '#333'}}>Student Contact</div>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex', 
                          flexDirection: 'column',
                          gap: '5px'
                        }}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Mobile:</span>
                            <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>
                              {studentDetails.formData?.student_mobile || 'Not provided'}
                            </span>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Email:</span>
                            <span style={{fontSize: '14px', fontWeight: '500', color: '#333', wordBreak: 'break-word'}}>
                              {studentDetails.formData?.student_email || 'Not provided'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Parent Contact */}
                      <div className="contact-card" style={{
                        flex: '1 0 calc(33.33% - 15px)',
                        minWidth: '250px',
                        backgroundColor: '#f9fafc',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        padding: '15px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '10px'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#e8f5e9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <div style={{fontSize: '15px', fontWeight: '600', color: '#333'}}>Parent Information</div>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex', 
                          flexDirection: 'column',
                          gap: '5px'
                        }}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Father:</span>
                            <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>
                              {studentDetails.formData?.father_name || 'Not provided'}
                            </span>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Contact:</span>
                            <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>
                              {studentDetails.formData?.father_mobile || 'Not provided'}
                            </span>
                          </div>
                          {studentDetails.formData?.mother_name && (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Mother:</span>
                              <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>
                                {studentDetails.formData?.mother_name}
                              </span>
                            </div>
                          )}
                          {studentDetails.formData?.mother_mobile && (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Contact:</span>
                              <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>
                                {studentDetails.formData?.mother_mobile}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Emergency Contact */}
                      <div className="contact-card" style={{
                        flex: '1 0 calc(33.33% - 15px)',
                        minWidth: '250px',
                        backgroundColor: '#f9fafc',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                        padding: '15px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '10px'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#fff3e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55198 18.9945C1.551 19.3437 1.64149 19.6871 1.81442 19.9905C1.98736 20.2939 2.23672 20.5467 2.53773 20.7239C2.83875 20.901 3.18058 20.9962 3.53 21H20.47C20.8194 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="#e65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 9V13" stroke="#e65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 17H12.01" stroke="#e65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <div style={{fontSize: '15px', fontWeight: '600', color: '#333'}}>Emergency Contact</div>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex', 
                          flexDirection: 'column',
                          gap: '5px'
                        }}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Contact:</span>
                            <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>
                              {studentDetails.formData?.emergency_contact || 'Not provided'}
                            </span>
                          </div>
                          {studentDetails.formData?.local_guardian && (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Guardian:</span>
                              <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>
                                {studentDetails.formData?.local_guardian}
                              </span>
                            </div>
                          )}
                          {studentDetails.formData?.blood_group && (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <span style={{flex: '0 0 80px', fontSize: '14px', color: '#666'}}>Blood:</span>
                              <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>
                                {studentDetails.formData?.blood_group}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  {/* Room booking card */}
                <div className="room-booking-card" style={{
                  padding: '25px',
                  backgroundColor: '#ffffff',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: studentDetails.bookingDetails ? '#e8f5e9' : '#fff3e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {studentDetails.bookingDetails ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 22V12H15V22" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#e65100"/>
                        </svg>
                      )}
                    </div>
                    <h3 style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '600',
                      color: studentDetails.bookingDetails ? '#2e7d32' : '#e65100'
                    }}>
                      Room Allocation
                    </h3>
                  </div>                    {studentDetails.bookingDetails ? (
                    <div className="room-details-container" style={{
                      backgroundColor: '#f9fafc',
                      borderRadius: '8px',
                      padding: '20px',
                      border: '1px solid #e0e0e0'
                    }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 22V12H15V22" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Room Allocation Details
                      </h3>
                        <div className="table-responsive" style={{ overflowX: 'auto' }}>
                        <table style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          marginTop: '10px',
                          fontSize: '14px',
                          borderSpacing: 0,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          border: '1px solid #d0e8f2',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          <thead>
                            <tr style={{
                              backgroundColor: '#1976d2',
                            }}>
                              <th style={{
                                padding: '14px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: 'white',
                                borderRight: '1px solid rgba(255,255,255,0.2)'
                              }}>Block</th>
                              <th style={{
                                padding: '14px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: 'white',
                                borderRight: '1px solid rgba(255,255,255,0.2)'
                              }}>Floor</th>
                              <th style={{
                                padding: '14px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: 'white',
                                borderRight: '1px solid rgba(255,255,255,0.2)'
                              }}>Room Number</th>
                              <th style={{
                                padding: '14px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: 'white',
                                borderRight: '1px solid rgba(255,255,255,0.2)'
                              }}>Bed</th>
                              <th style={{
                                padding: '14px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: 'white',
                                borderRight: '1px solid rgba(255,255,255,0.2)'
                              }}>Booking Date</th>
                              <th style={{
                                padding: '14px 16px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: 'white'
                              }}>Allotted By</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{
                              backgroundColor: '#ffffff',
                              transition: 'background-color 0.2s'
                            }}>
                              <td style={{
                                padding: '14px 16px',
                                fontWeight: '500',
                                borderRight: '1px solid #e0e0e0',
                                borderBottom: '1px solid #e0e0e0'
                              }}>{studentDetails.bookingDetails.block}</td>
                              <td style={{
                                padding: '14px 16px',
                                fontWeight: '500',
                                borderRight: '1px solid #e0e0e0',
                                borderBottom: '1px solid #e0e0e0'
                              }}>{studentDetails.bookingDetails.floor}</td>
                              <td style={{
                                padding: '14px 16px',
                                fontWeight: '500',
                                borderRight: '1px solid #e0e0e0',
                                borderBottom: '1px solid #e0e0e0'
                              }}>{studentDetails.bookingDetails.roomNumber}</td>
                              <td style={{
                                padding: '14px 16px',
                                fontWeight: '500',
                                borderRight: '1px solid #e0e0e0',
                                borderBottom: '1px solid #e0e0e0'
                              }}>{studentDetails.bookingDetails.bed}</td>
                              <td style={{
                                padding: '14px 16px',
                                fontWeight: '500',
                                borderRight: '1px solid #e0e0e0',
                                borderBottom: '1px solid #e0e0e0'
                              }}>{studentDetails.bookingDetails.bookingDate ? new Date(studentDetails.bookingDetails.bookingDate).toLocaleDateString() : 'N/A'}</td>
                              <td style={{
                                padding: '14px 16px',
                                fontWeight: '500',
                                borderBottom: '1px solid #e0e0e0'
                              }}>{studentDetails.bookingDetails.allottedBy || 'N/A'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      {studentDetails.bookingDetails.allotmentReason && (
                        <div style={{
                          marginTop: '15px',
                          backgroundColor: '#e3f2fd',
                          padding: '12px 16px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          border: '1px solid #bbdefb',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px'
                        }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop: '2px', flexShrink: 0}}>
                            <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <div>
                            <span style={{ fontWeight: '600', color: '#1976d2' }}>Allotment Reason: </span>
                            <span style={{ color: '#333' }}>{studentDetails.bookingDetails.allotmentReason}</span>
                          </div>
                        </div>                      )}
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: '#fff8e1',
                      borderRadius: '8px',
                      padding: '15px',
                      border: '1px solid #ffe082',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8V12" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16H12.01" stroke="#f57c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p style={{margin: '0', fontSize: '15px', color: '#e65100', fontWeight: '500'}}>
                        No room allocation found. This student needs to be assigned a room.
                      </p>
                    </div>
                  )}
                </div>
                  {/* Document verification card */}
                <div className="document-verification-card" style={{
                  padding: '25px',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#e3f2fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 13H8" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 17H8" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 9H9H8" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1976d2'
                    }}>
                      Document Verification
                    </h3>
                  </div>
                  
                  <div className="verification-form" style={{
                    backgroundColor: '#f9fafc',
                    borderRadius: '8px',
                    padding: '20px 25px',
                    border: '1px solid #e0e0e0'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                      gap: '15px',
                      marginBottom: '25px'
                    }}>
                      <div className="verification-item" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <input
                          type="checkbox"
                          id="anti-ragging"
                          checked={documentVerification.antiRagging}
                          onChange={(e) => setDocumentVerification(prev => ({...prev, antiRagging: e.target.checked}))}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#1976d2',
                            cursor: 'pointer'
                          }}
                        />
                        <label htmlFor="anti-ragging" style={{
                          fontSize: '15px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          color: '#444'
                        }}>
                          Anti-Ragging Declaration
                        </label>
                      </div>
                      
                      <div className="verification-item" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <input
                          type="checkbox"
                          id="anti-drug"
                          checked={documentVerification.antiDrug}
                          onChange={(e) => setDocumentVerification(prev => ({...prev, antiDrug: e.target.checked}))}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#1976d2',
                            cursor: 'pointer'
                          }}
                        />
                        <label htmlFor="anti-drug" style={{
                          fontSize: '15px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          color: '#444'
                        }}>
                          Anti-Drug Declaration
                        </label>
                      </div>
                      
                      <div className="verification-item" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <input
                          type="checkbox"
                          id="keys-handed"
                          checked={documentVerification.keysHandedOver}
                          onChange={(e) => setDocumentVerification(prev => ({...prev, keysHandedOver: e.target.checked}))}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#1976d2',
                            cursor: 'pointer'
                          }}
                        />
                        <label htmlFor="keys-handed" style={{
                          fontSize: '15px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          color: '#444'
                        }}>
                          Room Keys Handed Over
                        </label>
                      </div>
                    </div>
                    
                    {studentDetails.documentVerification && studentDetails.documentVerification.verifiedAt && (
                      <div className="verification-timestamp" style={{
                        backgroundColor: '#e8f5e9',
                        borderRadius: '6px',
                        padding: '10px 15px',
                        marginBottom: '20px',
                        border: '1px solid #c8e6c9',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p style={{margin: 0, fontSize: '14px', color: '#2e7d32', fontWeight: '500'}}>
                          Last verification: {new Date(studentDetails.documentVerification.verifiedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                    
                    <button 
                      onClick={submitDocumentVerification}
                      style={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        border: 'none',
                        padding: '12px 25px',
                        borderRadius: '6px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H15L21 9V19C21 20.1046 20.1046 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 3V7H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Update Verification Status
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {!studentDetails && studentSearchQuery && !isLoadingStudent && (
              <div className="no-results">
                <h3 style={{ color: '#c23535', marginBottom: '10px' }}>Student Not Found</h3>
                <p>No student found with application number: <strong>{studentSearchQuery}</strong></p>
                <p style={{ marginTop: '10px' }}>Please check the application number and try again.</p>
              </div>
            )}
          </div>
        )}
        {selectedMenu === "Maintenance Complaints" && renderComplaintsContent()}
        
        {selectedMenu === "Profile" && (
          <div className="profile-section">
            <h2>Profile Settings</h2>
              
            <div className="profile-container" style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div className="profile-header" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <h3>Warden Profile</h3>
                  <p>Manage your profile photo and account settings</p>
                </div>
              </div>
              
              {/* Profile Photo Uploader Component */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '30px'
              }}>
                <ProfilePhotoUploader 
                  applicationNumber={localStorage.getItem('warden_userId') || ''}
                  onPhotoUpdate={handleProfilePhotoUpdate}
                  userType="warden"
                />
              </div>
              
              <div style={{
                marginTop: '30px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{color: '#666'}}>
                  Your profile photo will be visible throughout the hostel management system.
                  Please upload a clear, professional photo of yourself.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WardenDashboard;
