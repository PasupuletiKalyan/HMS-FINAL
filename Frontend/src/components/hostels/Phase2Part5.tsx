import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 2 Part 5 configuration
export const phase2Part5Config: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 30, exceptions: [] },
  "1st Floor": { start: 101, end: 130, exceptions: [] },
  "2nd Floor": { start: 201, end: 230, exceptions: [] },
  "3rd Floor": { start: 301, end: 330, exceptions: [] },
  "4th Floor": { start: 401, end: 430, exceptions: [] },
  "5th Floor": { start: 501, end: 530, exceptions: [] },
  "6th Floor": { start: 601, end: 630, exceptions: [] },
  "7th Floor": { start: 701, end: 730, exceptions: [] },
  "8th Floor": { start: 801, end: 830, exceptions: [] },
  "9th Floor": { start: 901, end: 930, exceptions: [] },
  "10th Floor": { start: 1001, end: 1030, exceptions: [] },
  "11th Floor": { start: 1101, end: 1130, exceptions: [] },
  "12th Floor": { start: 1201, end: 1230, exceptions: [] }
};

// Create a simple list view for Phase 2 Part 5 floors
const Phase2Part5FloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase2Part5Config[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  const getRoomOccupancyStatus = (roomNumber: number | string): string => {
    const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
    const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
    const isBedAOccupied = occupiedBeds[bedAKey] || false;
    const isBedBOccupied = occupiedBeds[bedBKey] || false;
    
    if (isBedAOccupied && isBedBOccupied) {
      return "fully-occupied";
    } else if (isBedAOccupied || isBedBOccupied) {
      return "partially-occupied";
    } else {
      return "available";
    }
  };
  
  const createRoomButton = (roomNumber: number): React.ReactNode => {
    const occupancyStatus = getRoomOccupancyStatus(roomNumber);
    return (
      <button
        key={roomNumber}
        className={`room-button ${occupancyStatus}`}
        data-room-number={roomNumber}
        onClick={() => onRoomClick(roomNumber.toString())}
        disabled={occupancyStatus === "fully-occupied"}
      >
        {roomNumber}
      </button>
    );
  };
  
  // Render Phase 2 Part 5 as a grid of room buttons
  const rooms: React.ReactNode[] = [];
  for (let i = floorInfo.start; i <= floorInfo.end; i++) {
    if (floorInfo.exceptions && floorInfo.exceptions.includes(i)) continue;
    rooms.push(createRoomButton(i));
  }
  
  return (
    <div className="room-list-container">
      <h3>{`${selectedBlock} - ${floor}`}</h3>
      <div className="room-grid">
        {rooms}
      </div>
    </div>
  );
};

export default Phase2Part5FloorPlan;