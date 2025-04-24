import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 2 configuration
export const phase2Config: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 40, exceptions: [] },
  "1st Floor": { start: 101, end: 140, exceptions: [] },
  "2nd Floor": { start: 201, end: 240, exceptions: [] },
  "3rd Floor": { start: 301, end: 340, exceptions: [] },
  "4th Floor": { start: 401, end: 440, exceptions: [] },
  "5th Floor": { start: 501, end: 540, exceptions: [] },
  "6th Floor": { start: 601, end: 640, exceptions: [] },
  "7th Floor": { start: 701, end: 740, exceptions: [] },
  "8th Floor": { start: 801, end: 840, exceptions: [] },
  "9th Floor": { start: 901, end: 940, exceptions: [] },
  "10th Floor": { start: 1001, end: 1040, exceptions: [] }
};

// Component for rendering Phase 2 floors
const Phase2FloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase2Config[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // Generate grid layout for Phase 2
  const renderPhase2Layout = () => {
    const rooms = [];
    const { start, end, exceptions } = floorInfo;
    
    // Determine room positions
    // Phase 2 has a specific layout with rooms organized in rows
    // For this example, let's use a simple grid layout
    const roomsPerRow = 10;
    
    for (let i = start; i <= end; i++) {
      if (exceptions.includes(i)) continue;
      
      const roomNumber = i.toString();
      
      // Get occupancy status for this room
      const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
      const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
      
      const isOccupiedA = occupiedBeds[bedAKey] || false;
      const isOccupiedB = occupiedBeds[bedBKey] || false;
      
      // Determine color based on occupancy
      let fillColor = '#bbf7d0'; // Green-200 for available
      let occupancyText = 'Available';
      
      if (isOccupiedA && isOccupiedB) {
        fillColor = '#fecaca'; // Red-200 for fully occupied
        occupancyText = 'Fully Occupied';
      } else if (isOccupiedA || isOccupiedB) {
        fillColor = '#fef08a'; // Yellow-200 for partially occupied
        occupancyText = 'Partially Occupied';
      }
      
      // Position calculation 
      const row = Math.floor((i - start) / roomsPerRow);
      const col = (i - start) % roomsPerRow;
      
      rooms.push(
        <div 
          key={roomNumber} 
          className="room-box"
          style={{
            position: 'absolute',
            left: `${col * 70 + 20}px`,
            top: `${row * 60 + 80}px`,
            width: '60px',
            height: '50px',
            backgroundColor: fillColor,
            border: '1px solid #1976d2',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onClick={() => onRoomClick(roomNumber)}
          title={occupancyText}
        >
          {roomNumber}
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
        height: '600px',
        backgroundColor: '#f7fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'auto',
        padding: '10px'
      }}
    >
      <div 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#e2e8f0', 
          textAlign: 'center', 
          fontWeight: 'bold',
          borderRadius: '4px',
          marginBottom: '10px' 
        }}
      >
        Phase 2 - {floor}
      </div>
      
      {renderPhase2Layout()}
      
      {/* Legend */}
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#bbf7d0', marginRight: '5px', border: '1px solid #22c55e' }}></div>
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#fef08a', marginRight: '5px', border: '1px solid #eab308' }}></div>
          <span>Partially Occupied</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#fecaca', marginRight: '5px', border: '1px solid #ef4444' }}></div>
          <span>Fully Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default Phase2FloorPlan;