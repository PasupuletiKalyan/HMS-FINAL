import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WardenDashboardStyles.css";
import collegeLogo from "../assets/college-logo.jpg";
import HostelFloorPlanViewer from '../components/HostelFloorPlanViewer';

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

type Complaint = {
  id: number;
  studentName: string;
  roomNumber: string;
  complaint: string;
  phase: string; // Added phase property
  status: 'Pending' | 'Resolved';
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [filteredRoomData, setFilteredRoomData] = useState<Student[]>([]);
  const [roomSearchTerm, setRoomSearchTerm] = useState("");
  const [wardenName, setWardenName] = useState("Warden");
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [summaryView, setSummaryView] = useState<'summary' | 'girls' | 'boys'>('summary');
  const [hostelSummary, setHostelSummary] = useState<HostelSummary[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditableData | null>(null);
  const [girlsHostelData, setGirlsHostelData] = useState(initialGirlsHostelData);
  const [boysHostelData, setBoysHostelData] = useState(initialBoysHostelData);
  const [currentAllocation, setCurrentAllocation] = useState<BookingInfo | null>(null);
  const [occupiedBeds, setOccupiedBeds] = useState<{[key: string]: boolean}>({});
  const [studentApplicationNumber, setStudentApplicationNumber] = useState<string>("");
  const [showStudentInput, setShowStudentInput] = useState<boolean>(false);
  const [studentBookings, setStudentBookings] = useState<StudentBooking[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 1, studentName: "Om Sai Vikranth", roomNumber: "12-27", complaint: "AC Not Working", phase: "Phase 2", status: "Pending" },
    { id: 2, studentName: "Mohana Krishna", roomNumber: "12-31", complaint: "Smell From Washroom Spreading all over corridor", phase: "Phase 2", status: "Pending" },
    { id: 3, studentName: "SJ Satwik", roomNumber: "9-27", complaint: "Flickering light in room", phase: "Phase 2", status: "Resolved" },
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
    setSelectedBlock(blockName);
    setShowSuggestions(false);
    setSearchTerm(blockName);
    setSelectedSuggestionIndex(-1);

    setStudentData([]);
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

  const handleEdit = (data: EditableData) => {
    setIsEditing(true);
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
      setIsEditing(false);
      setEditData(null);
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to save changes');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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
      setCurrentAllocation(null);
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
            <td>{('totals' in editData ? editData.totals.emptyBeds : editData.emptyBeds)}</td>
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

  const markAsResolved = (id: number) => {
    setComplaints(prev =>
      prev.map(complaint =>
        complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
      )
    );
  };

  const renderComplaintsContent = () => (
    <div className="complaints-container">
      <div className="table-responsive">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Room Number</th>
              <th>Complaint</th>
              <th>Phase</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(complaint => (
              <tr key={complaint.id}>
                <td>{complaint.studentName}</td>
                <td>{complaint.roomNumber}</td>
                <td>{complaint.complaint}</td>
                <td>{complaint.phase}</td>
                <td>
                  <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                    {complaint.status}
                  </span>
                </td>
                <td>
                  {complaint.status === "Pending" && (
                    <button
                      className="resolve-btn"
                      onClick={() => markAsResolved(complaint.id)}
                    >
                      Mark as Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-top-nav">
          <div className="profile-section-top">
            <img src={collegeLogo} alt="College Logo" className="college-logo-top" />
            <p className="user-name-top">{wardenName}</p>
          </div>

          <ul className="top-menu">
            {["Overview", "Room Allotment", "Maintenance Complaints"].map((item) => (
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

        <div className="dashboard-content">
          <h1>{selectedMenu}</h1>
          {selectedMenu === "Overview" && renderOverviewContent()}
          {selectedMenu === "Room Allotment" && renderRoomAllotmentContent()}
          {selectedMenu === "Maintenance Complaints" && renderComplaintsContent()}
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Hostel Management System. All rights reserved.</p>
      </footer>
    </>
  );
};

export default WardenDashboard;
