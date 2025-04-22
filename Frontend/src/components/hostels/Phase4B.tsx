import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 4B configuration
export const phase4BConfig: Record<string, FloorConfig> = {
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

 // Add SVG String for Phase 4B 2nd Floor - updated structure
 export const phase4BSecondFloorSvgString = `
 <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
   <!-- Background with grid -->
   <defs>
     <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
       <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ccc" stroke-width="0.5"/>
     </pattern>
   </defs>
   <rect width="100%" height="100%" fill="url(#grid)" />
   <rect width="798" height="698" x="1" y="1" fill="none" stroke="#e2e8f0" strokeWidth="2"/>
   
   <!-- Title -->
   <rect x="230" y="400" width="200" height="60" rx="5" fill="#f0f0f0" stroke="black" strokeWidth="2"/>
   <text x="270" y="435" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 2nd Floor</text>
   
   <!-- SVG content continues... -->
 </svg>
`;

// SVG strings for other floors (3rd, 4th, 5th, etc.) would follow...
export const phase4B3rdFloorSvgString = `
  <!-- SVG content for 3rd floor -->
`;

export const phase4B4thFloorSvgString = `
  <!-- SVG content for 4th floor -->
`;

export const phase4B5thFloorSvgString = `
  <!-- SVG content for 5th floor -->
`;

export const phase4B6thFloorSvgString = `
  <!-- SVG content for 6th floor -->
`;

export const phase4B7thFloorSvgString = `
  <!-- SVG content for 7th floor -->
`;

export const phase4B8thFloorSvgString = `
  <!-- SVG content for 8th floor -->
`;

export const phase4B9thFloorSvgString = `
  <!-- SVG content for 9th floor -->
`;

export const phase4B10thFloorSvgString = `
  <!-- SVG content for 10th floor -->
`;

// Component for rendering Phase 4B floors
const Phase4BFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase4BConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For specific floors, use SVG rendering
  let svgString = '';
  switch(floor) {
    case '2nd Floor':
      svgString = phase4BSecondFloorSvgString;
      break;
    case '3rd Floor':
      svgString = phase4B3rdFloorSvgString;
      break;
    case '4th Floor':
      svgString = phase4B4thFloorSvgString;
      break;
    case '5th Floor':
      svgString = phase4B5thFloorSvgString;
      break;
    case '6th Floor':
      svgString = phase4B6thFloorSvgString;
      break;
    case '7th Floor':
      svgString = phase4B7thFloorSvgString;
      break;
    case '8th Floor':
      svgString = phase4B8thFloorSvgString;
      break;
    case '9th Floor':
      svgString = phase4B9thFloorSvgString;
      break;
    case '10th Floor':
      svgString = phase4B10thFloorSvgString;
      break;
  }
  
  if (svgString) {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
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
    }, [onRoomClick]);
    
    return (
      <div
        ref={svgRef}
        className="svg-container"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    );
  }
  
  // For floors without SVG, use a grid layout
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
  
  // Render Phase 4B as a grid of room buttons
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

export default Phase4BFloorPlan;