import React from 'react';
import { FloorConfig, FloorPlanProps } from './types';

// Phase 4B configuration
export const phase4BConfig: Record<string, FloorConfig> = {
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

// SVG string for Phase 4B 2nd Floor
export const phase4B2ndFloorSvgString = `
  <svg viewBox="0 0 360 320" xmlns="http://www.w3.org/2000/svg">
    <!-- Background with grid -->
    <defs>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ccc" stroke-width="0.3"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    <!-- Title -->
    <text x="180" y="310" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Phase-4B 2nd Floor</text>
    
    <!-- Rooms on the left -->
    <g data-room-number="221">
      <rect x="10" y="10" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="25" y="25" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">221</text>
    </g>
    
    <g data-room-number="220">
      <rect x="10" y="45" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="25" y="60" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">220</text>
    </g>
    
    <g>
      <rect x="10" y="80" width="30" height="40" rx="2" fill="#a0aec0" stroke="#718096" strokeWidth="1" />
      <text x="25" y="95" fontSize="8" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif" fill="white">Lift</text>
      <text x="25" y="105" fontSize="8" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif" fill="white">Area</text>
    </g>
    
    <g>
      <rect x="10" y="125" width="30" height="40" rx="2" fill="#a0aec0" stroke="#718096" strokeWidth="1" />
      <text x="25" y="145" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Stairs</text>
    </g>
    
    <g data-room-number="219">
      <rect x="10" y="170" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="25" y="185" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">219</text>
    </g>
    
    <g data-room-number="218">
      <rect x="10" y="205" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="25" y="220" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">218</text>
    </g>
    
    <g data-room-number="217">
      <rect x="10" y="240" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="25" y="255" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">217</text>
    </g>
    
    <g data-room-number="216">
      <rect x="10" y="275" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="25" y="290" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">216</text>
    </g>
    
    <!-- Rooms on the top right -->
    <g data-room-number="222">
      <rect x="80" y="45" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="95" y="60" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">222</text>
    </g>
    
    <g data-room-number="223">
      <rect x="80" y="80" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="95" y="95" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">223</text>
    </g>
    
    <g data-room-number="224">
      <rect x="80" y="115" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="95" y="130" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">224</text>
    </g>
    
    <g data-room-number="225">
      <rect x="80" y="150" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="95" y="165" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">225</text>
    </g>
    
    <!-- Rooms in the middle row -->
    <g data-room-number="226">
      <rect x="80" y="195" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="95" y="210" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">226</text>
    </g>
    
    <g data-room-number="227">
      <rect x="115" y="195" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="130" y="210" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">227</text>
    </g>
    
    <g data-room-number="228">
      <rect x="170" y="195" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="185" y="210" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">228</text>
    </g>
    
    <g data-room-number="229">
      <rect x="205" y="195" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="220" y="210" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">229</text>
    </g>
    
    <g data-room-number="230">
      <rect x="240" y="195" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="255" y="210" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">230</text>
    </g>
    
    <g data-room-number="231">
      <rect x="275" y="195" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="290" y="210" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">231</text>
    </g>
    
    <g data-room-number="232">
      <rect x="310" y="195" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="325" y="210" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">232</text>
    </g>
    
    <!-- Bottom elements -->
    <g>
      <rect x="60" y="235" width="90" height="70" rx="2" fill="#f56565" stroke="#c53030" strokeWidth="1" />
      <text x="105" y="270" fontSize="14" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">🚽</text>
    </g>
    
    <g>
      <rect x="180" y="235" width="45" height="30" rx="2" fill="#a0aec0" stroke="#718096" strokeWidth="1" />
      <text x="202" y="250" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Lift Area</text>
    </g>
    
    <g>
      <rect x="180" y="275" width="45" height="30" rx="2" fill="#a0aec0" stroke="#718096" strokeWidth="1" />
      <text x="202" y="290" fontSize="8" textAnchor="middle" fontFamily="Inter, sans-serif" fill="white">Stairs</text>
    </g>
    
    <g data-room-number="235">
      <rect x="240" y="235" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="255" y="250" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">235</text>
    </g>
    
    <g data-room-number="234">
      <rect x="275" y="235" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="290" y="250" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">234</text>
    </g>
    
    <g data-room-number="233">
      <rect x="310" y="235" width="30" height="30" rx="2" fill="#86efac" stroke="#1976d2" strokeWidth="1" />
      <text x="325" y="250" fontSize="9" fontWeight="bold" textAnchor="middle" dominant-baseline="middle" fontFamily="Inter, sans-serif">233</text>
    </g>
    
    <!-- Corridors & Balcony -->
    <g transform="translate(60, 110) rotate(-90)">
      <text x="0" y="0" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
    </g>
    
    <text x="220" y="225" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Corridor</text>
    
    <g transform="translate(350, 235) rotate(-90)">
      <text x="0" y="0" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif" fill="#6b7280">Balcony</text>
    </g>
  </svg>
`;

// Create a simple list view for Phase 4B floors
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
  
  // Get room occupancy status - moved up so it can be used for both SVG and grid layout
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
  
  // For 2nd Floor, use SVG rendering
  if (floor === '2nd Floor') {
    const svgRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      if (!svgRef.current) return;
      
      const container = svgRef.current;
      
      // Update room colors based on occupancy
      const updateRoomColors = () => {
        // Find all room groups in the SVG
        const roomGroups = container.querySelectorAll('g[data-room-number]');
        
        roomGroups.forEach(group => {
          const roomNumber = group.getAttribute('data-room-number');
          if (roomNumber) {
            const occupancyStatus = getRoomOccupancyStatus(roomNumber);
            const rect = group.querySelector('rect');
            
            if (rect) {
              // Update fill color and stroke based on occupancy status
              if (occupancyStatus === "fully-occupied") {
                rect.setAttribute('fill', '#fecaca'); // Red-200 for fully occupied
                rect.setAttribute('stroke', '#ef4444'); // Red-500
              } else if (occupancyStatus === "partially-occupied") {
                rect.setAttribute('fill', '#fef08a'); // Yellow-200 for partially occupied
                rect.setAttribute('stroke', '#eab308'); // Yellow-500
              } else {
                rect.setAttribute('fill', '#bbf7d0'); // Green-200 for available
                rect.setAttribute('stroke', '#22c55e'); // Green-500
              }
            }
          }
        });
      };
      
      // Update colors initially and when occupiedBeds changes
      updateRoomColors();
      
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
    }, [onRoomClick, occupiedBeds, selectedBlock, selectedFloor]); // Add deps to re-run when bookings change
    
    return (
      <div
        ref={svgRef}
        className="svg-container"
        dangerouslySetInnerHTML={{ __html: phase4B2ndFloorSvgString }}
      />
    );
  }
  
  // For other floors, use the grid layout
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