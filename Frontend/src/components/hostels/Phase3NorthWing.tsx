import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 3 North Wing configuration
export const phase3NorthWingConfig: Record<string, FloorConfig> = {
  "Ground Floor": { start: 1, end: 35, exceptions: [] },
  "1st Floor": { start: 101, end: 135, exceptions: [] },
  "2nd Floor": { start: 201, end: 235, exceptions: [] },
  "3rd Floor": { start: 301, end: 335, exceptions: [] },
  "4th Floor": { start: 401, end: 435, exceptions: [] },
  "5th Floor": { start: 501, end: 535, exceptions: [] },
  "6th Floor": { start: 601, end: 635, exceptions: [] },
  "7th Floor": { start: 701, end: 735, exceptions: [] },
  "8th Floor": { start: 801, end: 835, exceptions: [] },
  "9th Floor": { start: 901, end: 935, exceptions: [] }
};

// SVG String for Phase 3 North Wing Ground Floor
export const phase3NorthWingGroundFloorSvgString = `
  <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="100%" height="100%" fill="#ffffff"/>
    <rect width="1198" height="598" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    
    <!-- Title -->
    <rect x="200" y="300" width="500" height="100" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="450" y="360" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 3 North Wing - Ground Floor</text>
    
    <!-- Top WS Room -->
    <rect x="100" y="50" width="200" height="80" rx="4" fill="#f56565" stroke="#c53030" strokeWidth="1.5" />
    <text x="200" y="95" fontSize="20" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
    
    <!-- Corridor between WS and bottom rooms -->
    <rect x="140" y="140" width="120" height="30" rx="5" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="200" y="160" fontSize="16" textAnchor="middle" fontFamily="Inter, sans-serif">Corridor</text>
    
    <!-- Room 05, 04, 03 aligned under WS, facing it -->
    <g data-room-number="5">
      <rect x="100" y="180" width="50" height="50" rx="4" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5" />
      <text x="125" y="210" fontSize="16" textAnchor="middle" fontFamily="Inter, sans-serif">05</text>
    </g>
    
    <!-- ...existing code for other rooms... -->
    
    <!-- Building Outline -->
    <path d="M50,20 L800,20 L800,50 L900,50 L900,450 L50,450 Z" fill="none" stroke="#718096" strokeWidth="2" strokeDasharray="5,5" />
  </svg>
`;

// Component for rendering Phase 3 North Wing SVG
const Phase3NorthWingFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase3NorthWingConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For Ground Floor, use the SVG rendering
  if (floor === 'Ground Floor') {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Apply room occupancy status colors
      const roomElements = container.querySelectorAll('g[data-room-number]');
      roomElements.forEach(roomElement => {
        const roomNumber = roomElement.getAttribute('data-room-number') || '';
        const bedAKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_A`;
        const bedBKey = `${selectedBlock}_${selectedFloor}_${roomNumber}_B`;
        const isBedAOccupied = occupiedBeds[bedAKey] || false;
        const isBedBOccupied = occupiedBeds[bedBKey] || false;
        
        const rect = roomElement.querySelector('rect');
        if (rect) {
          if (isBedAOccupied && isBedBOccupied) {
            // Fully occupied
            rect.setAttribute('fill', '#fecaca'); // Red-200
            rect.setAttribute('stroke', '#ef4444'); // Red-500
          } else if (isBedAOccupied || isBedBOccupied) {
            // Partially occupied
            rect.setAttribute('fill', '#fef08a'); // Yellow-200
            rect.setAttribute('stroke', '#eab308'); // Yellow-500
          } else {
            // Available
            rect.setAttribute('fill', '#bbf7d0'); // Green-200
            rect.setAttribute('stroke', '#22c55e'); // Green-500
          }
        }
      });
      
      // Event handler using delegation
      const handleClick = (event: MouseEvent) => {
        const targetGroup = (event.target as Element).closest('g[data-room-number]');
        if (targetGroup) {
          const roomNumber = targetGroup.getAttribute('data-room-number');
          if (roomNumber) {
            onRoomClick(roomNumber);
          }
        }
      };
      
      container.addEventListener('click', handleClick);
      
      return () => {
        container.removeEventListener('click', handleClick);
      };
    }, [onRoomClick, occupiedBeds, selectedBlock, selectedFloor]);
    
    return (
      <div
        ref={svgRef}
        className="svg-container"
        dangerouslySetInnerHTML={{ __html: phase3NorthWingGroundFloorSvgString }}
      />
    );
  }
  
  // For other floors, use a simple list view
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

export default Phase3NorthWingFloorPlan;