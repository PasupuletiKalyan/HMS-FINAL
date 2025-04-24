import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 4A configuration
export const phase4AConfig: Record<string, FloorConfig> = {
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
  "10th Floor": { start: 1001, end: 1030, exceptions: [] }
};

// Sample SVG string for Phase 4A Ground Floor
export const phase4AGroundFloorSvgString = `
  <svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
    <!-- Background with grid -->
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ccc" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    <rect width="998" height="698" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
    
    <!-- Title -->
    <rect x="350" y="320" width="300" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
    <text x="500" y="360" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase 4A - Ground Floor</text>
    
    <!-- Main building layout -->
    <path d="M200,100 L800,100 L800,500 L200,500 Z" fill="none" stroke="#718096" strokeWidth="2" />
    
    <!-- Corridor area -->
    <rect x="300" y="250" width="400" height="100" rx="2" fill="#f0f4f8" stroke="#e2e8f0" strokeWidth="1"/>
    <text x="500" y="300" fontSize="16" textAnchor="middle" fontFamily="Inter, sans-serif">Main Corridor</text>
    
    <!-- Left block rooms -->
    <g data-room-number="1"><rect x="220" y="120" width="70" height="50" rx="4" fill="#bbdefb" stroke="#1976d2" strokeWidth="1.5"/><text x="255" y="150" fontSize="16" textAnchor="middle" fontFamily="Inter, sans-serif">01</text></g>
    <!-- ...other rooms... -->
  </svg>
`;

// Component for rendering Phase 4A floors
const Phase4AFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase4AConfig[floor];
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
        dangerouslySetInnerHTML={{ __html: phase4AGroundFloorSvgString }}
      />
    );
  }
  
  // For other floors, use a grid layout
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
  
  // Create rows of rooms for grid layout
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

export default Phase4AFloorPlan;