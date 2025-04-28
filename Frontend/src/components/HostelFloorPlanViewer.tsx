import React, { useState } from 'react';
import {
  Phase1FloorPlan,
  Phase1EBlockFloorPlan,
  Phase2FloorPlan,
  Phase2ThirdFloorPlan, // Added the new Phase 2 Third Floor component
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
  phase2ThirdFloorConfig, // Added the missing configuration
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
  kailashConfig
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
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [modalRoomInfo, setModalRoomInfo] = useState<ModalRoomInfo>({ 
    number: '', 
    block: '', 
    floor: '', 
    bed: null 
  });
  
  const hostelData = {
    "Phase 1": phase1Config,
    "Phase 1 E Block": phase1EBlockConfig,
    "Phase 2": phase2Config,
    "Phase 2 Third Floor": phase2ThirdFloorConfig,
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
    setModalRoomInfo(prev => ({
      ...prev,
      bed: bed
    }));
  };

  // Handle booking confirmation
  const handleConfirmBooking = (): void => {
    if (!modalRoomInfo.bed) return;
    // If user already has a booking, don't allow another one
    if (currentUserBooking) {
      setShowModal(false);
      setShowWarningModal(true);
      return;
    } 
    const roomKey = `${modalRoomInfo.block}_${modalRoomInfo.floor}_${modalRoomInfo.number}_${modalRoomInfo.bed}`;
    // Set the bed as occupied
    setOccupiedBeds(prev => ({
      ...prev,
      [roomKey]: true
    }));
    // Save the current user's booking
    setCurrentUserBooking({
      block: modalRoomInfo.block,
      floor: modalRoomInfo.floor,
      roomNumber: modalRoomInfo.number,
      bed: modalRoomInfo.bed as string,
      roomKey: roomKey
    });
        
    setShowModal(false);
    setShowSuccessModal(true);
  };

  // Check if bed is occupied
  const isBedOccupied = (room: string, bed: string): boolean => {
    const roomKey = `${modalRoomInfo.block}_${modalRoomInfo.floor}_${room}_${bed}`;
    return occupiedBeds[roomKey] || false;
  };

  // Render floor plan content
  const renderFloorPlan = (): React.ReactNode => {
    if (!selectedBlock) {
      return <p className="text-center text-gray-500">Please select a block and floor to see the available rooms.</p>;
    } 
    if (!selectedFloor) {
      return <p className="text-center text-gray-500">Please select a floor.</p>;
    }
    const floorInfo = hostelData[selectedBlock as keyof typeof hostelData]?.[selectedFloor];
    if (!floorInfo) {
      return <p className="text-center text-gray-500">No data available for this selection.</p>;
    }
    // Render the appropriate component based on selected block
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
        return (
          <Phase2FloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Phase 2 Third Floor': // Render the new Phase 2 Third Floor
        return (
          <Phase2ThirdFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
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
      case 'Aravali':
        return (
          <AravaliFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Ajanta':
        return (
          <AjantaFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Himalaya':
        return (
          <HimalayaFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Shivalik':
        return (
          <ShivalikFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Vindya':
        return (
          <VindyaFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Nilgiri':
        return (
          <NilgiriFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Satpura':
        return (
          <SatpuraFloorPlan
            floor={selectedFloor}
            onRoomClick={handleRoomClick}
            occupiedBeds={occupiedBeds}
            selectedBlock={selectedBlock}
            selectedFloor={selectedFloor}
          />
        );
      case 'Kailash':
        return (
          <KailashFloorPlan
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
      )}
      <div className="controls">
        <div className="control-group">
          <label htmlFor="block-select">Select Block:</label>
          <select 
            id="block-select" 
            value={selectedBlock} 
            onChange={handleBlockChange}
          >
            <option value="">-- Select Block --</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 1 E Block">Phase 1 E Block</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 2 Third Floor">Phase 2 Third Floor</option>
            <option value="Phase 2 Part 5">Phase 2 Part 5</option>
            <option value="Phase 3 North Wing">Phase 3 North Wing</option>
            <option value="Phase 3 South Wing">Phase 3 South Wing</option>
            <option value="Phase 4A">Phase 4A</option>
            <option value="Phase 4B">Phase 4B</option>
            <option value="Aravali">Aravali</option>
            <option value="Ajanta">Ajanta</option>
            <option value="Himalaya">Himalaya</option>
            <option value="Shivalik">Shivalik</option>
            <option value="Vindya">Vindya</option>
            <option value="Nilgiri">Nilgiri</option>
            <option value="Satpura">Satpura</option>
            <option value="Kailash">Kailash</option>
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="floor-select">Select Floor:</label>
          <select 
            id="floor-select" 
            value={selectedFloor} 
            onChange={handleFloorChange}
            disabled={!selectedBlock}
          >
            <option value="">-- {selectedBlock ? "Select Floor" : "Select Block First"} --</option>
            {selectedBlock && 
              Object.keys(hostelData[selectedBlock as keyof typeof hostelData] || {}).map(floor => (
                <option key={floor} value={floor}>{floor}</option>
              ))
            }
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
                >
                  Bed A
                </div>
                <div
                  className={`room-item bed-b ${isBedOccupied(modalRoomInfo.number, 'B') ? 'occupied' : ''} ${modalRoomInfo.bed === 'B' ? 'selected' : ''}`}
                  onClick={() => !isBedOccupied(modalRoomInfo.number, 'B') && handleBedClick('B')}
                >
                  Bed B
                </div>
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
                    onClick={handleConfirmBooking}
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
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