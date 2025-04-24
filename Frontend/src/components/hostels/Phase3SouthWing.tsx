import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';
import { phase3SouthWingConfig as lowerFloorsConfig, 
  phase3SouthWingGroundFloorSvgString,
  phase3SouthWing1stFloorSvgString,
  phase3SouthWing2ndFloorSvgString,
  phase3SouthWing3rdFloorSvgString,
  phase3SouthWing4thFloorSvgString 
} from './Phase3SouthWingLowerFloors';
import { phase3SouthWingConfig as upperFloorsConfig,
  phase3SouthWing5thFloorSvgString,
  phase3SouthWing6thFloorSvgString,
  phase3SouthWing7thFloorSvgString,
  phase3SouthWing8thFloorSvgString,
  phase3SouthWing9thFloorSvgString 
} from './Phase3SouthWingUpperFloors';

// Combined Phase 3 South Wing configuration
export const phase3SouthWingConfig: Record<string, FloorConfig> = {
  ...lowerFloorsConfig,
  ...upperFloorsConfig
};

// Export all SVG strings
export {
  phase3SouthWingGroundFloorSvgString,
  phase3SouthWing1stFloorSvgString,
  phase3SouthWing2ndFloorSvgString,
  phase3SouthWing3rdFloorSvgString,
  phase3SouthWing4thFloorSvgString,
  phase3SouthWing5thFloorSvgString,
  phase3SouthWing6thFloorSvgString,
  phase3SouthWing7thFloorSvgString,
  phase3SouthWing8thFloorSvgString,
  phase3SouthWing9thFloorSvgString
};

// Create a simple list view for Phase 3 South Wing floors
const Phase3SouthWingFloorPlan: React.FC<FloorPlanProps> = ({ 
  floor, 
  onRoomClick, 
  occupiedBeds, 
  selectedBlock, 
  selectedFloor 
}) => {
  if (!floor || !selectedBlock) return null;
  
  const floorInfo = phase3SouthWingConfig[floor];
  if (!floorInfo) return <p>Floor data not available</p>;
  
  // For all floors, use SVG rendering
  if (floor === 'Ground Floor' || floor === '1st Floor' || 
      floor === '2nd Floor' || floor === '3rd Floor' || 
      floor === '4th Floor' || floor === '5th Floor' || 
      floor === '6th Floor' || floor === '7th Floor' ||
      floor === '8th Floor' || floor === '9th Floor') {
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
    
    // Select the correct SVG string based on the floor
    let svgString = ""; // Default to empty string to avoid undefined
    if (floor === 'Ground Floor') {
      svgString = phase3SouthWingGroundFloorSvgString;
    } else if (floor === '1st Floor') {
      svgString = phase3SouthWing1stFloorSvgString;
    } else if (floor === '2nd Floor') {
      svgString = phase3SouthWing2ndFloorSvgString;
    } else if (floor === '3rd Floor') {
      svgString = phase3SouthWing3rdFloorSvgString;
    } else if (floor === '4th Floor') {
      svgString = phase3SouthWing4thFloorSvgString;
    } else if (floor === '5th Floor') {
      svgString = phase3SouthWing5thFloorSvgString;
    } else if (floor === '6th Floor') {
      svgString = phase3SouthWing6thFloorSvgString;
    } else if (floor === '7th Floor') {
      svgString = phase3SouthWing7thFloorSvgString;
    } else if (floor === '8th Floor') {
      svgString = phase3SouthWing8thFloorSvgString;
    } else if (floor === '9th Floor') {
      svgString = phase3SouthWing9thFloorSvgString;
    }
    
    return (
      <div
        ref={svgRef}
        className="svg-container"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    );
  }
  
  // For other floors, use the grid layout
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
  
  // Render Phase 3 South Wing as a grid of room buttons
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

export default Phase3SouthWingFloorPlan;