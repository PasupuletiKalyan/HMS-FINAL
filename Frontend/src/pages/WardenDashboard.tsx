import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WardenDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import HostelFloorPlanViewer from "../components/HostelFloorPlanViewer"; // Add this import

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
    { name: "Phase 1", gender: "Boys" },
    { name: "E-wing", gender: "Boys" },
    { name: "Phase 2", gender: "Boys" },
    { name: "Phase 4", gender: "Boys" },
    { name: "Phase 2- part 5", gender: "Boys" },
    { name: "Dorms", gender: "Girls" },
    { name: "Phase 3-NW", gender: "Girls" },
    { name: "Phase 3-SW", gender: "Girls" },
  ];

  const filteredSuggestions = suggestions.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDummyHostelData = () => {
    return [
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
      },
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
        id: "5",
        blockName: "Phase 2",
        totalRooms: 621,
        occupiedRooms: 584,
        totalStudents: 1168,
        maintenanceRooms: 5,
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
        id: "7",
        blockName: "Phase 4",
        totalRooms: 102,
        occupiedRooms: 51,
        totalStudents: 101,
        maintenanceRooms: 13,
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
      }
    ];
  };

  useEffect(() => {
    const storedWarden = localStorage.getItem("warden_userName");
    if (storedWarden) {
      setWardenName(storedWarden);
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
      // setCurrentAllocation(null);
      setShowStudentInput(false);
      setStudentApplicationNumber("");
      
      // Show success message
      alert(`Room successfully allocated to student ${studentApplicationNumber}`);
    } catch (error) {
      console.error('Error allocating room:', error);
      alert('Failed to allocate room. Please try again.');
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
                  handleRoomAllocation(booking);
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
      const response = await fetch(`http://localhost:5000/api/warden/student/${studentSearchQuery.trim()}`);
      
      if (response.ok) {
        const data = await response.json();
        
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
          setStudentDetails(null);
        }
      } else {
        // API error - keep studentDetails as null
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
    }
  }

  const fetchHostelStatistics = async () => {
    try {
      // Real API call to get statistics from the backend
      const response = await fetch('http://localhost:5000/api/hostels/statistics/all');
      if (!response.ok) {
        throw new Error('Failed to fetch hostel statistics');
      }
      
      const data = await response.json();
      
      if (data.success) {
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
      } else {
        console.error('Error in hostel statistics response:', data.message);
        // Fallback to dummy data if the API fails
        fetchHostelSummary();
      }
    } catch (error) {
      console.error('Error fetching hostel statistics:', error);
      // Fallback to dummy data if the API fails
      fetchHostelSummary();
    }
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
            <div className="profile-circle">
              <span>{wardenName.charAt(0)}</span>
            </div>
            <p className="profile-name">{wardenName}</p>
          </button>
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <ul>
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
        {selectedMenu === "Student Search" && (
          <div className="student-search-container">
            <div className="search-box" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '600px',
              margin: '0 auto 30px',
              height: '45px'
            }}>
              <input
                type="text"
                placeholder="Enter Student Application Number"
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
                className="search-input"
                style={{
                  width: '70%',
                  padding: '12px',
                  borderRadius: '4px 0 0 4px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                  height: '100%',
                  boxSizing: 'border-box',
                  margin: 0
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchStudent();
                  }
                }}
              />
              <button 
                onClick={searchStudent} 
                className="search-button"
                disabled={isLoadingStudent}
                style={{
                  width: '30%',
                  padding: '12px',
                  backgroundColor: '#c23535',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer',
                  fontSize: '16px',
                  height: '100%',
                  boxSizing: 'border-box',
                  margin: 0
                }}
              >
                {isLoadingStudent ? 'Searching...' : 'Search'}
              </button>
            </div>
            
            {studentDetails && (
              <div className="student-details-container">
                <div className="student-header">
                  <h2>Student Details</h2>
                  <div className="completion-status">
                    <div className={`status-item ${studentDetails.progress.formCompleted ? 'completed' : 'pending'}`}>
                      <span className="status-label">Form</span>
                      <span className="status-icon">{studentDetails.progress.formCompleted ? '✓' : '✗'}</span>
                    </div>
                    <div className={`status-item ${studentDetails.progress.paymentCompleted ? 'completed' : 'pending'}`}>
                      <span className="status-label">Payment</span>
                      <span className="status-icon">{studentDetails.progress.paymentCompleted ? '✓' : '✗'}</span>
                    </div>
                    <div className={`status-item ${studentDetails.progress.roomBooked ? 'completed' : 'pending'}`}>
                      <span className="status-label">Room Booking</span>
                      <span className="status-icon">{studentDetails.progress.roomBooked ? '✓' : '✗'}</span>
                    </div>
                  </div>
                </div>
                
                {studentDetails.formData && (
                  <div className="form-details">
                    <h3>Hostel Form Details</h3>
                    <div className="form-grid">
                      <div className="form-item">
                        <label>Name</label>
                        <p>{studentDetails.formData.student_name || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Application Number</label>
                        <p>{studentDetails.formData.applicationNo || studentSearchQuery}</p>
                      </div>
                      <div className="form-item">
                        <label>Admission Number</label>
                        <p>{studentDetails.formData.admission_no || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Email</label>
                        <p>{studentDetails.formData.student_email || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Phone</label>
                        <p>{studentDetails.formData.phone_number || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Programme</label>
                        <p>{studentDetails.formData.programme || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>School</label>
                        <p>{studentDetails.formData.school || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Batch</label>
                        <p>{studentDetails.formData.batch || 'Not provided'}</p>
                      </div>
                      
                      <div className="form-item">
                        <label>Father's Name</label>
                        <p>{studentDetails.formData.father_name || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Father's Mobile</label>
                        <p>{studentDetails.formData.father_mobile || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Mother's Name</label>
                        <p>{studentDetails.formData.mother_name || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Mother's Mobile</label>
                        <p>{studentDetails.formData.mother_mobile || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Emergency Contact</label>
                        <p>{studentDetails.formData.emergency_contact || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Date of Birth</label>
                        <p>{studentDetails.formData.dob ? new Date(studentDetails.formData.dob).toLocaleDateString() : 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Blood Group</label>
                        <p>{studentDetails.formData.blood_group || 'Not provided'}</p>
                      </div>
                      <div className="form-item">
                        <label>Nationality</label>
                        <p>{studentDetails.formData.nationality || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <h3>Address & Medical Information</h3>
                    <div className="form-grid">
                      <div className="form-item full-width">
                        <label>Permanent Address</label>
                        <p>{studentDetails.formData.permanent_address || 'Not provided'}</p>
                      </div>
                      <div className="form-item full-width">
                        <label>Medical History</label>
                        <p>{studentDetails.formData.medical_history || 'None'}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {studentDetails.bookingDetails && (
                  <div className="booking-details">
                    <h3>Current Room Details</h3>
                    <div className="form-grid">
                      <div className="form-item">
                        <label>Block</label>
                        <p>{studentDetails.bookingDetails.block}</p>
                      </div>
                      <div className="form-item">
                        <label>Floor</label>
                        <p>{studentDetails.bookingDetails.floor}</p>
                      </div>
                      <div className="form-item">
                        <label>Room Number</label>
                        <p>{studentDetails.bookingDetails.roomNumber}</p>
                      </div>
                      <div className="form-item">
                        <label>Bed</label>
                        <p>{studentDetails.bookingDetails.bed}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="document-verification">
                  <h3>Document Verification</h3>
                  <div className="verification-form">
                    <div className="verification-item">
                      <input
                        type="checkbox"
                        id="anti-ragging"
                        checked={documentVerification.antiRagging}
                        onChange={(e) => setDocumentVerification(prev => ({...prev, antiRagging: e.target.checked}))}
                      />
                      <label htmlFor="anti-ragging">Anti-Ragging Declaration Received</label>
                    </div>
                    <div className="verification-item">
                      <input
                        type="checkbox"
                        id="anti-drug"
                        checked={documentVerification.antiDrug}
                        onChange={(e) => setDocumentVerification(prev => ({...prev, antiDrug: e.target.checked}))}
                      />
                      <label htmlFor="anti-drug">Anti-Drug Declaration Received</label>
                    </div>
                    <div className="verification-item">
                      <input
                        type="checkbox"
                        id="keys-handed"
                        checked={documentVerification.keysHandedOver}
                        onChange={(e) => setDocumentVerification(prev => ({...prev, keysHandedOver: e.target.checked}))}
                      />
                      <label htmlFor="keys-handed">Room Keys Handed Over</label>
                    </div>
                    
                    <button 
                      onClick={submitDocumentVerification}
                      className="submit-verification-btn"
                    >
                      Update Verification Status
                    </button>
                  </div>
                  
                  {studentDetails.documentVerification && studentDetails.documentVerification.verifiedAt && (
                    <div className="verification-timestamp">
                      <p>Last verified: {new Date(studentDetails.documentVerification.verifiedAt).toLocaleString()}</p>
                    </div>
                  )}
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
      </div>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WardenDashboard;
