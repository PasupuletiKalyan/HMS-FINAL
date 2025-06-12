import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../config/api';
import {
  Phase1FloorPlan,
  Phase1EBlockFloorPlan,
  Phase2FloorPlan,
  Phase2ThirdFloorPlan, 
  Phase2FourthFloorPlan,
  Phase2FifthFloorPlan,
  Phase2SixthFloorPlan, 
  Phase2SeventhFloorPlan,
  Phase2EighthFloorPlan, 
  Phase2NinthFloorPlan,
  Phase2TenthFloorPlan,
  Phase2EleventhFloorPlan,
  Phase2TwelfthFloorPlan,
  Phase2Part5FloorPlan,
  Phase3NorthWingFloorPlan,
  Phase3SouthWingFloorPlan,
  Phase4BFloorPlan,
  Phase4ACombinedFloorPlan,
  AravaliFloorPlan,
  AjantaFloorPlan,
  HimalayaFloorPlan,
  ShivalikFloorPlan,
  VindyaFloorPlan,
  NilgiriFloorPlan,
  SatpuraFloorPlan,
  KailashFloorPlan,
  RoomLayout,
  phase1Config,
  phase1EBlockConfig,
  phase2Config,
  phase2ThirdFloorConfig,
  phase2FourthFloorConfig,
  phase2FifthFloorConfig,
  phase2SixthFloorConfig,
  phase2SeventhFloorConfig,
  phase2EighthFloorConfig,
  phase2NinthFloorConfig,
  phase2TenthFloorConfig,
  phase2EleventhFloorConfig,
  phase2TwelfthFloorConfig,
  phase2Part5Config,
  phase3NorthWingConfig,
  phase3SouthWingConfig,
  phase4AConfig,
  phase4BConfig,
  phase4AUpperConfig,
  aravaliConfig,
  ajantaConfig,
  himalayaConfig,
  shivalikConfig,
  vindyaConfig,
  nilgiriConfig,
  satpuraConfig,
  kailashConfig,
  FloorConfig
} from './hostels';
import '../styles/HostelFloorPlanViewer.css';

// Define interfaces
interface BookingInfo {
  block: string;
  floor: string;
  roomNumber: string;
  bed: string;
  roomKey: string;
}

interface ModalRoomInfo {
  number: string;
  block: string;
  floor: string;
  bed: string | null;
}

interface OccupiedBedsRecord {
  [key: string]: boolean;
}

interface HostelFloorPlanViewerProps {
  currentUserBooking: BookingInfo | null;
  setCurrentUserBooking: (booking: BookingInfo | null) => void;
  occupiedBeds: OccupiedBedsRecord;
  setOccupiedBeds: React.Dispatch<React.SetStateAction<OccupiedBedsRecord>>;
  navigateToBookingPage: () => void;
}

const HostelFloorPlanViewer: React.FC<HostelFloorPlanViewerProps> = ({ 
  currentUserBooking, 
  setCurrentUserBooking, 
  occupiedBeds, 
  setOccupiedBeds,
  navigateToBookingPage 
}) => {
  const [selectedBlock, setSelectedBlock] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  // State for available blocks and floors from admin configuration
  const [availableBlocks, setAvailableBlocks] = useState<any[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState<boolean>(true);
  const [modalRoomInfo, setModalRoomInfo] = useState<ModalRoomInfo>({ 
    number: '', 
    block: '', 
    floor: '', 
    bed: null 
  });
  // Helper function to convert floor numbers to floor names
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
  
  // Load booking data from localStorage when component mounts
  useEffect(() => {
    // Fetch available blocks from admin configuration
    const fetchAvailableBlocks = async () => {
      try {
        setIsLoadingAvailability(true);        const response = await fetch(buildApiUrl('/api/hostels/available-blocks'));
        if (response.ok) {
          const data = await response.json();
          setAvailableBlocks(data.availableBlocks || []);
        } else {
          console.error('Failed to fetch available blocks');
          setAvailableBlocks([]); // No blocks available if fetch fails
        }
      } catch (error) {
        console.error('Error fetching available blocks:', error);
        setAvailableBlocks([]); // No blocks available if error occurs
      } finally {
        setIsLoadingAvailability(false);
      }
    };

    fetchAvailableBlocks();
    
    // Load occupied beds from the backend API
    const fetchOccupiedBeds = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/occupied-beds'));
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Set occupied beds from the backend
            setOccupiedBeds(data.occupiedBeds);
          }
        } else {
          console.error('Failed to fetch occupied beds');
        }
      } catch (error) {
        console.error('Error fetching occupied beds:', error);
      }
    };
    
    // Load booking data from localStorage when component mounts
    const userRole = localStorage.getItem("userRole") || "student";
    const userId = localStorage.getItem(`${userRole}_userId`);
    
    if (userId) {
      // Load current user booking from localStorage
      const bookingKey = `${userRole}_${userId}_userBooking`;
      const savedUserBooking = localStorage.getItem(bookingKey);
      if (savedUserBooking) {
        try {
          setCurrentUserBooking(JSON.parse(savedUserBooking));
        } catch (error) {
          console.error('Error parsing user booking from localStorage:', error);
        }
      }
    }
    
    // Fetch all occupied beds from backend
    fetchOccupiedBeds();
    
    // Set up interval to refresh occupied beds less frequently (30 seconds instead of 5)
    // This helps reduce the flickering issue
    const intervalId = setInterval(fetchOccupiedBeds, 30000);
    
    return () => clearInterval(intervalId);
  }, [setOccupiedBeds, setCurrentUserBooking]);

  // Save booking data to localStorage whenever it changes
  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "student";
    const userId = localStorage.getItem(`${userRole}_userId`);
    if (userId) {
      localStorage.setItem(`occupiedBeds_${userId}`, JSON.stringify(occupiedBeds));
    }
  }, [occupiedBeds]);

  useEffect(() => {
    if (currentUserBooking) {
      const userRole = localStorage.getItem("userRole") || "student";
      const userId = localStorage.getItem(`${userRole}_userId`);
      if (userId) {
        const bookingKey = `${userRole}_${userId}_userBooking`;
        localStorage.setItem(bookingKey, JSON.stringify(currentUserBooking));
      }
    }
  }, [currentUserBooking]);
  
  const hostelData = {
    "Phase 1": phase1Config,
    "Phase 1 E Block": phase1EBlockConfig,
    "Phase 2": {
      "Ground Floor": phase2Config["Ground Floor"],
      "1st Floor": phase2Config["1st Floor"],
      "2nd Floor": phase2Config["2nd Floor"],
      "3rd Floor": phase2ThirdFloorConfig["3rd Floor"],
      "4th Floor": phase2FourthFloorConfig["4th Floor"],
      "5th Floor": phase2FifthFloorConfig["5th Floor"],
      "6th Floor": phase2SixthFloorConfig["6th Floor"],
      "7th Floor": phase2SeventhFloorConfig["7th Floor"],
      "8th Floor": phase2EighthFloorConfig["8th Floor"],
      "9th Floor": phase2NinthFloorConfig["9th Floor"],
      "10th Floor": phase2TenthFloorConfig["10th Floor"],
      "11th Floor": phase2EleventhFloorConfig["11th Floor"],
      "12th Floor": phase2TwelfthFloorConfig["12th Floor"]
    },
    "Phase 2 Part 5": phase2Part5Config,
    "Phase 3 North Wing": phase3NorthWingConfig,
    "Phase 3 South Wing": phase3SouthWingConfig,
    "Phase 4A": { ...phase4AConfig, ...phase4AUpperConfig },
    "Phase 4B": phase4BConfig,
    "Aravali": aravaliConfig,
    "Ajanta": ajantaConfig,
    "Himalaya": himalayaConfig,
    "Shivalik": shivalikConfig,
    "Vindya": vindyaConfig,
    "Nilgiri": nilgiriConfig,
    "Satpura": satpuraConfig,
    "Kailash": kailashConfig
  };
  
  // Fix the room occupancy status function - completely separate from SVG
  const getRoomOccupancyStatus = (roomNumber: string | number): string => {
    // Special case for Warden Room (33)
    if (roomNumber === 33 || roomNumber === "33") {
      return "fully-occupied"; // Mark Warden Room as unbookable
    } 
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    const isBedAOccupied = occupiedBeds[bedAKey] || false;
    const isBedBOccupied = occupiedBeds[bedBKey] || false;
    if (isBedAOccupied && isBedBOccupied) {
      return "fully-occupied"; // Both beds occupied
    } else if (isBedAOccupied || isBedBOccupied) {
      return "partially-occupied"; // Only one bed occupied
    } else {
      return "available"; // No beds occupied
    } 
  }; 

  // Check if room is fully occupied
  const isRoomFullyOccupied = (roomNumber: string | number): boolean => {
    return getRoomOccupancyStatus(roomNumber) === "fully-occupied";
  }; 

  // Handle block selection
  const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBlock(e.target.value); 
    setSelectedFloor('');
  }; 

  // Handle floor selection
  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedFloor(e.target.value); 
  }; 

  // Handle room click
  const handleRoomClick = (roomNumber: string): void => {
    // Special case for Warden Room (33)
    if (roomNumber === "33") {
      return; // Don't allow booking of warden room
    } 
    // Don't open modal if room is fully occupied
    if (isRoomFullyOccupied(roomNumber)) {
      return;
    } 
    // If user already has a booking and tries to book another room
    if (currentUserBooking) {
      setShowWarningModal(true);
      return;
    } 
    setModalRoomInfo({
      number: roomNumber,
      block: selectedBlock,
      floor: selectedFloor,
      bed: null
    });
    setShowModal(true);
  };

  // Handle bed click
  const handleBedClick = (bed: string): void => {
    // Check if the bed is already occupied
    if (isBedOccupied(modalRoomInfo.number, bed)) {
      return; // Don't allow selecting an occupied bed
    }
    
    setModalRoomInfo(prev => ({
      ...prev,
      bed: bed
    }));
  };

  // Handle proceeding to booking confirmation
  const handleProceedToConfirmation = (): void => {
    if (!modalRoomInfo.bed) return;
    
    // Close the selection modal and open the confirmation modal
    setShowModal(false);
    setShowConfirmationModal(true);
  };

  // Handle booking confirmation
  const handleConfirmBooking = async (): Promise<void> => {
    if (!modalRoomInfo.bed) return;
    // If user already has a booking, don't allow another one
    if (currentUserBooking) {
      setShowConfirmationModal(false);
      setShowWarningModal(true);
      return;
    } 
    const roomKey = `${modalRoomInfo.block}_${modalRoomInfo.floor}_${modalRoomInfo.number}_${modalRoomInfo.bed}`;
    
    // Create booking object
    const bookingInfo = {
      block: modalRoomInfo.block,
      floor: modalRoomInfo.floor,
      roomNumber: modalRoomInfo.number,
      bed: modalRoomInfo.bed as string,
      roomKey: roomKey
    };
    
    try {
      const applicationNumber = localStorage.getItem("applicationNo");
      if (!applicationNumber) {
        console.error("Application number not found in localStorage");
        return;
      }
      
      // 1. Save to the OccupiedBeds collection in the database
      const occupiedBedResponse = await fetch(buildApiUrl('/api/occupied-beds'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bedKey: roomKey,
          block: modalRoomInfo.block,
          floor: modalRoomInfo.floor,
          roomNumber: modalRoomInfo.number,
          bed: modalRoomInfo.bed,
          applicationNo: applicationNumber
        }),
      });
      
      if (!occupiedBedResponse.ok) {
        const errorData = await occupiedBedResponse.json();
        console.error("Error marking bed as occupied:", errorData.message);
        
        // If the bed is already occupied, refresh the occupied beds data
        if (errorData.message === "This bed is already occupied") {
          // Refresh occupied beds from server
          const refreshResponse = await fetch(buildApiUrl('/api/occupied-beds'));
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            if (refreshData.success) {
              setOccupiedBeds(refreshData.occupiedBeds);
            }
          }
          
          // Replace alert with a more user-friendly notification
          setShowConfirmationModal(false);
          setModalRoomInfo(prev => ({...prev, bed: null}));
          
          // Create a notification element that self-removes after a few seconds
          const notification = document.createElement('div');
          notification.className = 'booking-notification error';
          notification.innerHTML = `
            <div class="notification-content">
              <div class="notification-icon">⚠️</div>
              <div class="notification-message">This bed has just been booked by another student. Please select a different bed.</div>
            </div>
          `;
          document.body.appendChild(notification);
          
          // Remove notification after 4 seconds
          setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 500); // Wait for fade out animation
          }, 4000);
          
          return;
        }
      }
      
      // 2. Set the bed as occupied in local state
      setOccupiedBeds(prev => ({
        ...prev,
        [roomKey]: true
      }));
      
      // 3. Save the current user's booking
      setCurrentUserBooking(bookingInfo);
      
      // 4. Update the booking status in the student progress
      const progressResponse = await fetch(buildApiUrl(`/api/progress/${applicationNumber}/booking`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingDetails: bookingInfo,
          completedAt: new Date().toISOString()
        }),
      });

      if (progressResponse.ok) {
        const data = await progressResponse.json();
        if (data.success) {
          // Update completedSteps in localStorage
          const completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
          if (!completedSteps.includes(3)) {
            completedSteps.push(3); // Mark booking (step 3) as completed
            localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
          }
        } else {
          console.error("Error updating booking status in backend:", data.message);
        }
      } else {
        console.error("Failed to update booking status in backend");
      }
      
      // 5. Refresh hostel statistics to update warden dashboard
      try {
        // This fetch doesn't need to return anything to the client
        // It just triggers the backend to recalculate statistics
        await fetch(buildApiUrl('/api/hostels/statistics/all'));
      } catch (err) {
        console.error("Error refreshing hostel statistics:", err);
        // Non-blocking error - continue with booking process
      }
      
      setShowConfirmationModal(false);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Error during booking process:", error);
      
      // Replace alert with a more user-friendly notification
      const notification = document.createElement('div');
      notification.className = 'booking-notification error';
      notification.innerHTML = `
        <div class="notification-content">
          <div class="notification-icon">❌</div>
          <div class="notification-message">There was an error with your booking. Please try again.</div>
        </div>
      `;
      document.body.appendChild(notification);
      
      // Remove notification after 4 seconds
      setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500); // Wait for fade out animation
      }, 4000);
    }
  };

  // Check if bed is occupied
  const isBedOccupied = (room: string, bed: string): boolean => {
    const roomKey = `${selectedBlock}_${selectedFloor}_${room}_${bed}`;
    return occupiedBeds[roomKey] || false;
  };
  // Render floor plan content
  const renderFloorPlan = (): React.ReactNode => {
    // Show loading message while fetching availability
    if (isLoadingAvailability) {
      return <p className="text-center text-gray-500">Loading available blocks...</p>;
    }
    
    // Show message if no blocks are available
    if (availableBlocks.length === 0) {
      return (
        <div className="text-center p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Blocks Available for Booking</h3>
          <p className="text-yellow-700">
            Room booking is currently not available. Please contact the administration for more information.
          </p>
        </div>
      );
    }

    if (!selectedBlock) {
      return <p className="text-center text-gray-500">Please select a block and floor to see the available rooms.</p>;
    } 
    if (!selectedFloor) {
      return <p className="text-center text-gray-500">Please select a floor.</p>;
    }
    
    // Get the floor data with proper type assertions
    const blockData = hostelData[selectedBlock as keyof typeof hostelData];
    // Using Record<string, FloorConfig> type to ensure TypeScript knows this is a string-indexed object
    const floorInfo = blockData ? (blockData as Record<string, FloorConfig>)[selectedFloor] : undefined;
    
    if (!floorInfo) {
      return <p className="text-center text-gray-500">No data available for this selection.</p>;
    }
    
    // Render the appropriate component based on selected block and floor
    switch(selectedBlock) {
      case 'Phase 1':
        return (
          <Phase1FloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Phase 1 E Block':
        return (
          <Phase1EBlockFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Phase 2':
        // For Phase 2, select the appropriate floor component based on the selected floor
        if (selectedFloor === "3rd Floor") {
          return (
            <Phase2ThirdFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "4th Floor") {
          return (
            <Phase2FourthFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "5th Floor") {
          return (
            <Phase2FifthFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "6th Floor") {
          return (
            <Phase2SixthFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "7th Floor") {
          return (
            <Phase2SeventhFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "8th Floor") {
          return (
            <Phase2EighthFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "9th Floor") {
          return (
            <Phase2NinthFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "10th Floor") {
          return (
            <Phase2TenthFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "11th Floor") {
          return (
            <Phase2EleventhFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else if (selectedFloor === "12th Floor") {
          return (
            <Phase2TwelfthFloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        } else {
          // For other floors (Ground, 1st, 2nd), use the generic Phase2FloorPlan
          return (
            <Phase2FloorPlan
              floor={selectedFloor}
              onRoomClick={handleRoomClick}
              occupiedBeds={occupiedBeds}
              selectedBlock={selectedBlock}
              selectedFloor={selectedFloor}
            />
          );
        }
      case 'Phase 2 Part 5':
        return (
          <Phase2Part5FloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Phase 3 North Wing':
        return (
          <Phase3NorthWingFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Phase 3 South Wing':
        return (
          <Phase3SouthWingFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Phase 4A':
        // Use the combined component for Phase 4A that selects the appropriate component
        const Phase4AComponent = Phase4ACombinedFloorPlan.component({
          floor: selectedFloor,
          onRoomClick: handleRoomClick,
          occupiedBeds: occupiedBeds,
          selectedBlock: selectedBlock,
          selectedFloor: selectedFloor
        });
        return <Phase4AComponent.type {...Phase4AComponent.props} />;
      case 'Phase 4B':
        const Phase4BComponent = Phase4BFloorPlan.component({
          floor: selectedFloor,
          onRoomClick: handleRoomClick,
          occupiedBeds: occupiedBeds,
          selectedBlock: selectedBlock,
          selectedFloor: selectedFloor
        });
        return <Phase4BComponent.type {...Phase4BComponent.props} />;
      // Rest of the cases remain unchanged
      case 'Aravali':
      case 'Ajanta':
      case 'Himalaya':
      case 'Shivalik':
      case 'Vindya':
      case 'Nilgiri':
      case 'Satpura':
      case 'Kailash':
        // Use the appropriate component based on the selected block
        const ComponentMap = {
          'Aravali': AravaliFloorPlan,
          'Ajanta': AjantaFloorPlan,
          'Himalaya': HimalayaFloorPlan,
          'Shivalik': ShivalikFloorPlan,
          'Vindya': VindyaFloorPlan,
          'Nilgiri': NilgiriFloorPlan,
          'Satpura': SatpuraFloorPlan,
          'Kailash': KailashFloorPlan
        };
        const Component = ComponentMap[selectedBlock as keyof typeof ComponentMap];
        return (
          <Component
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      default:
        return <p>Floor plan not available for {selectedBlock}</p>;
    }
  };

  // Render room occupancy legend
  const renderRoomOccupancyLegend = (): React.ReactNode => {
    return (
      <div className="room-occupancy-legend">
        <div className="legend-item">
          <div className="legend-color legend-available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-partially"></div>
          <span>Partially Occupied</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-fully"></div>
          <span>Fully Occupied</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#d8b4fe', border: '1px solid #9333ea' }}></div>
          <span>Warden Room 👮‍♂️</span>
        </div>
      </div>
    );
  };

  // Check if the current room is a single bed room (1214, 1215, 1112A, 1112, 912, 1012, 814)
  const isSingleBedRoom = (roomNumber: string): boolean => {
    return roomNumber === '1214' || roomNumber === '1215' || roomNumber === '1112A' || 
           roomNumber === '1112' || roomNumber === '912' || roomNumber === '1012' ||
           roomNumber === '814';
  };

  // Check if the current block is one of the new blocks with the RoomLayout
  const isNewBlock = (): boolean => {
    return ["Aravali", "Ajanta", "Himalaya", "Shivalik", "Vindya", "Nilgiri", "Satpura", "Kailash"].includes(modalRoomInfo.block);
  };
  
  // Check if the current block is one of the newer phases with different layout
  const isNewLayoutBlock = (): boolean => {
    return ["Phase 3 North Wing", "Phase 3 South Wing", "Phase 4A", "Phase 4B"].includes(modalRoomInfo.block);
  };
  
  // Base styles for modern room layout items
  const roomItemBaseStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '500',
    border: '1px solid #9ca3af',
    backgroundColor: '#e5e7eb',
    color: '#374151',
    borderRadius: '0.375rem',
    padding: '0.25rem 0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box'
  };

  // Get current date formatted
  const getCurrentDate = (): string => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // ... rest of the component stays the same (modals, etc.) ...
  return (
    <div className="hostel-floor-plan-container">
      <h1 className="heading">Hostel Floor Plan Viewer</h1>
      {/* Show link to booking page if user has a booking */}
      {currentUserBooking && (
        <div className="booking-link-container">
          <p>You have an active booking. View or manage your booking here:</p>
          <button className="view-booking-btn" onClick={navigateToBookingPage}>
            View My Booking
          </button>
        </div>
      )}      <div className="controls">
        <div className="control-group">
          <label htmlFor="block-select">Select Block:</label>
          <select 
            id="block-select" 
            value={selectedBlock} 
            onChange={handleBlockChange}
            disabled={isLoadingAvailability}
          >
            <option value="">
              {isLoadingAvailability ? "Loading blocks..." : 
               availableBlocks.length === 0 ? "No blocks available for booking" : 
               "-- Select Block --"}
            </option>
            {availableBlocks.map(block => (
              <option key={block.id} value={block.name}>
                {block.name} ({block.gender})
              </option>
            ))}
          </select>
        </div>        <div className="control-group">
          <label htmlFor="floor-select">Select Floor:</label>
          <select 
            id="floor-select" 
            value={selectedFloor} 
            onChange={handleFloorChange}
            disabled={!selectedBlock}
          >
            <option value="">-- {selectedBlock ? "Select Floor" : "Select Block First"} --</option>            {selectedBlock && (() => {
              // Find the selected block in available blocks to get its available floors
              const selectedBlockData = availableBlocks.find(block => block.name === selectedBlock);
              if (selectedBlockData && selectedBlockData.availableFloors) {
                return selectedBlockData.availableFloors.map((floor: any) => (
                  <option key={floor.floorNumber} value={`${getFloorName(floor.floorNumber)}`}>
                    {getFloorName(floor.floorNumber)}
                  </option>
                ));
              }
              // Fallback to original behavior if no restriction data
              return Object.keys(hostelData[selectedBlock as keyof typeof hostelData] || {}).map(floor => (
                <option key={floor} value={floor}>{floor}</option>
              ));
            })()}
          </select>
        </div>
      </div>
      <div className="floor-plan-display">
        {renderFloorPlan()}
      </div>
      {/* Add legend below the floor plan */}
      {selectedBlock && selectedFloor && renderRoomOccupancyLegend()}

      {/* Warning Modal - for existing booking */}
      {showWarningModal && (
        <div className="modal warning-modal" onClick={() => setShowWarningModal(false)}>
          <div className="modal-content warning-content" onClick={e => e.stopPropagation()}>
            <span className="modal-close-btn" onClick={() => setShowWarningModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </span>
            <div className="warning-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h2 className="warning-title">Booking Already Exists</h2>
            <p className="warning-message">You already have a booking. Please cancel your existing booking before making a new one.</p>
            <div className="warning-actions">
              <button
                className="close-warning-btn"
                onClick={() => setShowWarningModal(false)}
              >
                Close
              </button>
              <button
                className="view-booking-btn"
                onClick={() => {
                  setShowWarningModal(false);
                  navigateToBookingPage();
                }}
              >
                View My Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room selection modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="modal-close-btn" onClick={() => setShowModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </span>
            <h2 className="modal-title">
              {`Room ${modalRoomInfo.number} (${modalRoomInfo.block} - ${modalRoomInfo.floor})`}
            </h2>
            <p className="modal-description">
              {modalRoomInfo.bed 
                ? `Bed ${modalRoomInfo.bed} ${isBedOccupied(modalRoomInfo.number, modalRoomInfo.bed) ? 'already booked' : 'selected'}` 
                : 'Click on a bed to select it'}
            </p>
            
            {isNewBlock() ? (
              // New blocks use the enhanced RoomLayout component
              <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <RoomLayout 
                  bedAOccupied={isBedOccupied(modalRoomInfo.number, 'A')}
                  bedBOccupied={isBedOccupied(modalRoomInfo.number, 'B')}
                  roomNumber={modalRoomInfo.number}
                  block={modalRoomInfo.block}
                  floor={modalRoomInfo.floor}
                  onSelectBed={handleBedClick}
                />
                
                {/* Add bed selection buttons below the layout */}
                <div className="bed-selection-buttons" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-around', 
                  marginTop: '1rem' 
                }}>
                  <button
                    style={{
                      backgroundColor: isBedOccupied(modalRoomInfo.number, 'A') ? 
                        '#fecaca' : modalRoomInfo.bed === 'A' ? 
                        '#bbf7d0' : '#f9fafb',
                      border: `1px solid ${isBedOccupied(modalRoomInfo.number, 'A') ? 
                        '#ef4444' : modalRoomInfo.bed === 'A' ? 
                        '#22c55e' : '#d1d5db'}`,
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      fontWeight: 500,
                      cursor: isBedOccupied(modalRoomInfo.number, 'A') ? 'not-allowed' : 'pointer',
                      opacity: isBedOccupied(modalRoomInfo.number, 'A') ? 0.7 : 1
                    }}
                    disabled={isBedOccupied(modalRoomInfo.number, 'A')}
                    onClick={() => !isBedOccupied(modalRoomInfo.number, 'A') && handleBedClick('A')}
                  >
                    {isBedOccupied(modalRoomInfo.number, 'A') ? 'Bed A (Occupied)' : 'Select Bed A'}
                  </button>
                  
                  {/* Only display Bed B button for rooms other than 1214 and 1215 */}
                  {!isSingleBedRoom(modalRoomInfo.number) && (
                    <button
                      style={{
                        backgroundColor: isBedOccupied(modalRoomInfo.number, 'B') ? 
                          '#fecaca' : modalRoomInfo.bed === 'B' ? 
                          '#bbf7d0' : '#f9fafb',
                        border: `1px solid ${isBedOccupied(modalRoomInfo.number, 'B') ? 
                          '#ef4444' : modalRoomInfo.bed === 'B' ? 
                          '#22c55e' : '#d1d5db'}`,
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        fontWeight: 500,
                        cursor: isBedOccupied(modalRoomInfo.number, 'B') ? 'not-allowed' : 'pointer',
                        opacity: isBedOccupied(modalRoomInfo.number, 'B') ? 0.7 : 1
                      }}
                      disabled={isBedOccupied(modalRoomInfo.number, 'B')}
                      onClick={() => !isBedOccupied(modalRoomInfo.number, 'B') && handleBedClick('B')}
                    >
                      {isBedOccupied(modalRoomInfo.number, 'B') ? 'Bed B (Occupied)' : 'Select Bed B'}
                    </button>
                  )}
                </div>
              </div>
            ) : isNewLayoutBlock() ? (
              // Modern layout for Phase 3 and Phase 4 blocks using inline styles
              <div style={{
                position: 'relative',
                border: '2px solid #d1d5db',
                width: '260px',
                height: '260px',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                margin: '0 auto'
              }}>
                {/* Wardrobe A: Top Left */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '40px',
                    height: '60px',
                    backgroundColor: '#d1d5db',
                    top: '2rem',
                    left: '1rem'
                  }}
                >
                  WRB A
                </div>

                {/* Wardrobe B: Top Right */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '40px',
                    height: '60px',
                    backgroundColor: '#d1d5db',
                    top: '2rem',
                    right: '1rem'
                  }}
                >
                  WRB B
                </div>

                {/* Entry: Top Center */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '50px',
                    height: '20px',
                    backgroundColor: '#c2410c',
                    border: 'none',
                    color: 'white',
                    top: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  ENTRY
                </div>

                {/* Window: Middle Left */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '20px',
                    height: '60px',
                    backgroundColor: '#a5f3fc',
                    borderColor: '#22d3ee',
                    top: '60%',
                    transform: 'translateY(-50%)',
                    left: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{
                    transform: 'rotate(90deg)',
                    fontSize: '12px',
                    color: '#0891b2'
                  }}>
                    mirror
                  </span>
                </div>

                {/* Bed A: Bottom Left */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '55px',
                    height: '100px',
                    backgroundColor: isBedOccupied(modalRoomInfo.number, 'A') ? 
                      '#fecaca' : modalRoomInfo.bed === 'A' ? 
                      '#bbf7d0' : '#fed7aa',
                    borderColor: isBedOccupied(modalRoomInfo.number, 'A') ? 
                      '#ef4444' : modalRoomInfo.bed === 'A' ? 
                      '#22c55e' : '#fb923c',
                    bottom: '3rem',
                    left: '2rem',
                    cursor: isBedOccupied(modalRoomInfo.number, 'A') ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out'
                  }}
                  onClick={() => !isBedOccupied(modalRoomInfo.number, 'A') && handleBedClick('A')}
                >
                  Bed A
                </div>

                {/* Bed B: Bottom Right */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '55px',
                    height: '100px',
                    backgroundColor: isBedOccupied(modalRoomInfo.number, 'B') ? 
                      '#fecaca' : modalRoomInfo.bed === 'B' ? 
                      '#bbf7d0' : '#fed7aa',
                    borderColor: isBedOccupied(modalRoomInfo.number, 'B') ? 
                      '#ef4444' : modalRoomInfo.bed === 'B' ? 
                      '#22c55e' : '#fb923c',
                    bottom: '3rem',
                    right: '2rem',
                    cursor: isBedOccupied(modalRoomInfo.number, 'B') ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out'
                  }}
                  onClick={() => !isBedOccupied(modalRoomInfo.number, 'B') && handleBedClick('B')}
                >
                  Bed B
                </div>

                {/* Table A: Below Bed A */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '60px',
                    height: '30px',
                    backgroundColor: '#fef9c3',
                    borderColor: '#fef08a',
                    bottom: '0.5rem',
                    left: '1rem'
                  }}
                >
                  Table A
                </div>

                {/* Table B: Below Bed B */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '60px',
                    height: '30px',
                    backgroundColor: '#fef9c3',
                    borderColor: '#fef08a',
                    bottom: '0.5rem',
                    right: '1rem'
                  }}
                >
                  Table B
                </div>

                {/* Mirror: Bottom Center */}
                <div
                  style={{
                    ...roomItemBaseStyle,
                    width: '70px',
                    height: '15px',
                    backgroundColor: '#e0e7ff',
                    borderColor: '#a5b4fc',
                    bottom: '0.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0'
                  }}
                >
                  Window
                </div>
              </div>
            ) : (
              // Original layout for other blocks
              <div className="room-layout">
                <div className="room-item furniture">Furniture</div>
                <div
                  className={`room-item bed-a ${isBedOccupied(modalRoomInfo.number, 'A') ? 'occupied' : ''} ${modalRoomInfo.bed === 'A' ? 'selected' : ''}`}
                  onClick={() => !isBedOccupied(modalRoomInfo.number, 'A') && handleBedClick('A')}
                  style={isSingleBedRoom(modalRoomInfo.number) ? { left: '50%', transform: 'translateX(-50%)' } : {}}
                >
                  Bed A
                </div>
                {!isSingleBedRoom(modalRoomInfo.number) && (
                  <div
                    className={`room-item bed-b ${isBedOccupied(modalRoomInfo.number, 'B') ? 'occupied' : ''} ${modalRoomInfo.bed === 'B' ? 'selected' : ''}`}
                    onClick={() => !isBedOccupied(modalRoomInfo.number, 'B') && handleBedClick('B')}
                  >
                    Bed B
                  </div>
                )}
                <div className="room-item mirror">Mirror</div>
                <div className="room-item window">Window</div>
                <div className="room-item entry">Entry</div>
                <div className="room-item corner-square square-1"></div>
                <div className="room-item corner-square square-2"></div>
              </div>
            )}
            
            <div className="bed-booking-info">
              {modalRoomInfo.bed && !isBedOccupied(modalRoomInfo.number, modalRoomInfo.bed) && (
                <div className="booking-actions">
                  <p className="selection-info">
                    You've selected Bed {modalRoomInfo.bed} in Room {modalRoomInfo.number}.
                  </p>
                  <button 
                    className="confirm-booking-btn"
                    onClick={handleProceedToConfirmation}
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* BookMyShow-style Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal confirmation-modal" onClick={() => setShowConfirmationModal(false)}>
          <div className="modal-content confirmation-content" onClick={e => e.stopPropagation()}>
            <span className="modal-close-btn" onClick={() => setShowConfirmationModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </span>
            
            <h2 className="confirmation-title">Confirm Your Booking</h2>
            
            <div className="booking-summary" style={{
              backgroundColor: '#f7f7f7', 
              borderRadius: '8px',
              padding: '16px',
              margin: '16px 0',
              border: '1px solid #e5e7eb'
            }}>
              <div className="booking-header" style={{
                borderBottom: '1px solid #e5e7eb',
                marginBottom: '12px',
                paddingBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', color: '#1f2937' }}>Hostel Bed Booking</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>{getCurrentDate()}</p>
                </div>
                <div style={{
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  alignSelf: 'flex-start'
                }}>
                  BOOKING
                </div>
              </div>
              
              <div className="booking-details" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div className="detail-column">
                  <div className="detail-item" style={{ marginBottom: '8px' }}>
                    <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Block</p>
                    <p style={{ margin: '0', fontWeight: '500', color: '#1f2937' }}>{modalRoomInfo.block}</p>
                  </div>
                  <div className="detail-item" style={{ marginBottom: '8px' }}>
                    <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Floor</p>
                    <p style={{ margin: '0', fontWeight: '500', color: '#1f2937' }}>{modalRoomInfo.floor}</p>
                  </div>
                </div>
                <div className="detail-column">
                  <div className="detail-item" style={{ marginBottom: '8px' }}>
                    <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Room</p>
                    <p style={{ margin: '0', fontWeight: '500', color: '#1f2937' }}>{modalRoomInfo.number}</p>
                  </div>
                  <div className="detail-item" style={{ marginBottom: '8px' }}>
                    <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Bed</p>
                    <p style={{ margin: '0', fontWeight: '500', color: '#1f2937' }}>{modalRoomInfo.bed}</p>
                  </div>
                </div>
              </div>
              
              <div className="selected-info" style={{
                backgroundColor: '#f3f4f6',
                border: '1px dashed #d1d5db',
                padding: '12px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#bbf7d0',
                  marginBottom: '8px'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p style={{ margin: '4px 0 0 0', fontWeight: '500', color: '#374151' }}>
                  Room {modalRoomInfo.number}, Bed {modalRoomInfo.bed} selected
                </p>
              </div>
            </div>
            
            <div className="important-note" style={{
              backgroundColor: '#fff7ed',
              border: '1px solid #fed7aa',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '16px'
            }}>
              <p style={{ margin: '0', fontSize: '14px', color: '#9a3412' }}>
                <strong>Important:</strong> Once confirmed, this booking cannot be changed without contacting the hostel administration.
              </p>
            </div>
            
            <div className="confirmation-actions" style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <button
                style={{
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#f9fafb',
                  color: '#4b5563',
                  fontWeight: '500',
                  cursor: 'pointer',
                  flex: '1'
                }}
                onClick={() => setShowConfirmationModal(false)}
              >
                Back
              </button>
              <button
                style={{
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  flex: '1'
                }}
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal success-modal" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content success-content" onClick={e => e.stopPropagation()}>
            <span className="modal-close-btn" onClick={() => setShowSuccessModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </span>
            <div className="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="success-title">Booking Successful!</h2>
            <div className="booking-details">
              <p><strong>Room Details:</strong></p>
              <p>Room Number: {modalRoomInfo.number}</p>
              <p>Bed: {modalRoomInfo.bed}</p>
              <p>Floor: {modalRoomInfo.floor}</p>
              <p>Block: {modalRoomInfo.block}</p>
            </div>
            <p className="note">Note: You can only have one active booking at a time.</p>
            <div className="success-actions">
              <button
                className="close-success-btn"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
              <button
                className="view-booking-btn"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigateToBookingPage();
                }}
              >
                View My Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelFloorPlanViewer;