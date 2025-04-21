import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 1 E Block configuration
export const phase1EBlockConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 12, exceptions: [] },
  "1st Floor": { start: 101, end: 112, exceptions: [] },
  "2nd Floor": { start: 201, end: 212, exceptions: [] },
  "3rd Floor": { start: 301, end: 312, exceptions: [] },
  "4th Floor": { start: 401, end: 412, exceptions: [] }
};

// Create visual layout for E Block floors
const Phase1EBlockFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase1EBlockConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  let offset = 0;
  switch(floor) {
    case "Ground Floor": 
      offset = 0;
      break;
    case "1st Floor":
      offset = 100;
      break;
    case "2nd Floor":
      offset = 200;
      break;
    case "3rd Floor":
      offset = 300;
      break;
    case "4th Floor":
      offset = 400;
      break;
  }
  
  // Generate rooms based on floor configuration
  const renderRooms = () => {
    const rooms = [];
    const { start, end, exceptions } = floorInfo;
    
    for (let i = start; i <= end; i++) {
      if (exceptions.includes(i)) continue;
      
      const roomNumber = i.toString();
      
      // Get occupancy status for this room
      const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
      const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
      
      const isOccupiedA = occupiedBeds[bedAKey] || false;
      const isOccupiedB = occupiedBeds[bedBKey] || false;
      
      // Determine color based on occupancy
      let fillColor = '#bbdefb'; // Default blue for available
      
      if (isOccupiedA && isOccupiedB) {
        fillColor = '#ef5350'; // Red for fully occupied
      } else if (isOccupiedA || isOccupiedB) {
        fillColor = '#ffca28'; // Yellow for partially occupied
      }
      
      // Position calculation 
      const row = Math.floor((i - start) / 4);
      const col = (i - start) % 4;
      
      rooms.push(
        <div 
          key={roomNumber} 
          className="room-box"
          style={{
            position: 'absolute',
            left: `${col * 100 + 50}px`,
            top: `${row * 80 + 100}px`,
            width: '80px',
            height: '60px',
            backgroundColor: fillColor,
            border: '1px solid #1976d2',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => onRoomClick(roomNumber)}
        >
          {i}
        </div>
      );
    }
    
    return rooms;
  };
  
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '500px',
        backgroundColor: '#f7fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#e2e8f0', 
          textAlign: 'center', 
          fontWeight: 'bold' 
        }}
      >
        Phase 1 E Block - {floor}
      </div>
      
      {renderRooms()}
      
      {/* Corridor */}
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          top: '100px',
          height: '350px',
          width: '20px',
          backgroundColor: '#e2e8f0',
          transform: 'translateX(-50%)'
        }}
      >
        <span 
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(90deg)',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            color: '#4a5568'
          }}
        >
          Corridor
        </span>
      </div>
      
      {/* Stairs */}
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '30px',
          height: '40px',
          width: '80px',
          backgroundColor: '#a0aec0',
          transform: 'translateX(-50%)',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}
      >
        Stairs
      </div>
    </div>
  );
};

export default Phase1EBlockFloorPlan;